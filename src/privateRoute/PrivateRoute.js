import React from "react";
import {Navigate } from "react-router-dom";

export function PrivateRoute({ children}) {
    let validToken = false;

    if (localStorage.getItem('usuario') !== null) {
       validToken = true;
    }

    return validToken ? children : <Navigate to="/" replace />;
}
