import React from "react";
import { Redirect, Route } from "react-router-dom";
import Auth from "./Auth";

// https://tylermcginnis.com/react-router-protected-routes-authentication/
const AuthRoute = ({ component: Component, ...attrs }) => (
  <Route // eslint-disable-next-line react/jsx-props-no-spreading
    {...attrs}
    render={props =>
      // eslint-disable-next-line react/jsx-props-no-spreading
      //  Auth.isAuthenticated() === true ? <Component {...props} /> : <Redirect to="/" />
      Auth.isMember() === true ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

export default AuthRoute;
