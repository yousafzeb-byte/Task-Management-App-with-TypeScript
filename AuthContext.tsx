/**
 * AuthContext - Provides authentication state and Auth0 integration
 */

import React, { createContext, useContext, type ReactNode } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import type { User } from "../types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
  login: () => Promise<void>;
  logout: () => void;
  getAccessToken: () => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const {
    user: auth0User,
    isAuthenticated,
    isLoading,
    error,
    loginWithRedirect,
    logout: auth0Logout,
    getAccessTokenSilently,
  } = useAuth0();

  const user: User | null = auth0User
    ? {
        sub: auth0User.sub || "",
        email: auth0User.email || "",
        name: auth0User.name || "",
        picture: auth0User.picture,
        email_verified: auth0User.email_verified || false,
      }
    : null;

  const login = async () => {
    try {
      await loginWithRedirect();
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const logout = () => {
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const getAccessToken = async (): Promise<string> => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE || "",
        },
      });
      return token;
    } catch (err) {
      console.error("Error getting access token:", err);
      throw err;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    error: error || null,
    login,
    logout,
    getAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
