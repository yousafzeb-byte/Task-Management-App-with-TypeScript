/**
 * AuthStatus Component - Displays authentication status and user info
 */

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/AuthStatus.css";

interface AuthStatusProps {
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
}

const AuthStatus: React.FC<AuthStatusProps> = ({
  onLoginClick,
  onLogoutClick,
}) => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0();

  if (isLoading) {
    return (
      <div className="auth-status loading">
        <span>Loading authentication...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="auth-status not-authenticated">
        <button
          className="btn btn-primary"
          onClick={() => {
            onLoginClick?.();
            loginWithRedirect();
          }}
          aria-label="Login with Auth0"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="auth-status authenticated">
      <div className="user-info">
        {user?.picture && (
          <img
            src={user.picture}
            alt={user?.name || "User"}
            className="user-avatar"
          />
        )}
        <div className="user-details">
          <span className="user-name">{user?.name || "User"}</span>
          <span className="user-email">{user?.email}</span>
        </div>
      </div>
      <button
        className="btn btn-secondary"
        onClick={() => {
          onLogoutClick?.();
          logout({ logoutParams: { returnTo: window.location.origin } });
        }}
        aria-label="Logout"
      >
        Logout
      </button>
    </div>
  );
};

export default AuthStatus;
