import React from "react";
import { useSelector } from "react-redux";
import { getRoles, getLoginStatus } from "./authSlice";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const isAuth = useSelector(getLoginStatus);
  const roles = useSelector(getRoles);
  const location = useLocation();

  return isAuth ? (
    roles.find((role) => allowedRoles.includes(role)) ? (
      <Outlet />
    ) : (
      <Navigate to={"/unauthorized"} state={{ from: location }} replace />
    )
  ) : (
    <Navigate to={"/user/login"} state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
