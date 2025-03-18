// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = () => {
//   const isAuthenticated = !!sessionStorage.getItem("authToken");
//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated }) => {
  console.log("Protected Route Auth:", isAuthenticated); // Debugging
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

