import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "./Context";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-lvv55a4h.us.auth0.com"
      clientId="Udll6vUoVYgiK70V8jClqHwmHAH796rx"
      redirectUri={window.location.origin}
      audience="http://localhost:8000"
      scope="read:current_user update:current_user_metadata"
    >
      <Provider>
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
