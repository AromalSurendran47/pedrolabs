import { Navigate, Outlet } from "react-router-dom";

const ProtectedUserRoute = () => {
  const token = sessionStorage.getItem("token"); // Check if the user is logged in

  if (!token) {
    return <Navigate to="/unauthorized" replace />; // Redirect if user is not logged in
  }

  return <Outlet />; // Allow access if user is logged in
};

export default ProtectedUserRoute;
