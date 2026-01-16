import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import "./styles/globals.css";
import App from "./App.tsx";

// Auth0 Configuration
// Replace these with your actual Auth0 credentials
const auth0Domain =
  import.meta.env.VITE_AUTH0_DOMAIN || "dev-example.us.auth0.com";
const auth0ClientId =
  import.meta.env.VITE_AUTH0_CLIENT_ID || "your-client-id-here";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <StrictMode>
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
