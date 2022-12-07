import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const auth = { token: localStorage.getItem("token") };

  return auth.token ? <Outlet /> : <Navigate to="/Login" />;
};

export default PrivateRoutes;
