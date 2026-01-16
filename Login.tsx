/**
 * Login Page - Authentication page with Auth0
 */

import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/Login.css";

interface LoginPageProps {
  onLoginSuccess?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && onLoginSuccess) {
      onLoginSuccess();
    }
  }, [isAuthenticated, onLoginSuccess]);

  if (isLoading) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-success">
            <h2>Welcome!</h2>
            <p>You are now authenticated. Redirecting...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-content">
          <h1>Task Management Application</h1>
          <p className="subtitle">Sign in to manage your tasks</p>

          <div className="login-features">
            <h2>Features</h2>
            <ul>
              <li>✓ Create and manage tasks</li>
              <li>✓ Track task progress</li>
              <li>✓ Organize with priorities and tags</li>
              <li>✓ Secure authentication with Auth0</li>
              <li>✓ Real-time synchronization</li>
            </ul>
          </div>

          <button
            className="btn btn-primary btn-lg btn-login"
            onClick={() => loginWithRedirect()}
            aria-label="Login with Auth0"
          >
            Login with Auth0
          </button>

          <p className="login-info">
            Don't have an account? Auth0 will guide you through the registration
            process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
