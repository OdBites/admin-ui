import React from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "OdBitesMfUI/hooks";

const RestrictedToGuests = (Component) => {
  const Wrapped = (props) => {
    const { getCookie } = useCookies();
    const isAuthenticated = !!getCookie("auth_token");

    if (isAuthenticated) {
      return <Navigate to="/" replace />;
    }

    return <Component {...props} />;
  };

  return Wrapped;
};

export default RestrictedToGuests;
