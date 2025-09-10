import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  const location = useLocation();
  
  if (!isLoggedIn) {
    return <Navigate to="/sign" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;