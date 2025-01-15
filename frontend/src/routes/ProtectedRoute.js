import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const user = useSelector((state) => state.user.userInfo);
  let location = useLocation();

  if (user === undefined) {
    return <div>Loading...</div>; // or any loader component you prefer
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // if (!user.isAdmin) {
    return <Outlet />;
  // }

};

export default ProtectedRoute;

