import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import LoginButton from './components/LoginButton.js';
import LogoutButton from './components/LogoutButton.js';
import Profile from './components/Profile.js';
import MyFavoriteBooks from './myFavoriteBooks'
import Login from './Login'


ReactDOM.render(
  <Auth0Provider
  domain={process.env.REACT_APP_DOMAIN}
  clientId={process.env.REACT_APP_CLIENT_ID}
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);