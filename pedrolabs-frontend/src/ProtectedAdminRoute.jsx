import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoute = () => {
  const role = sessionStorage.getItem("role"); // Retrieve the role from sessionStorage

  if (!role) {
    return <Navigate to="/unauthorized" replace />; // Redirect if the user is not logged in
  }

  // Check if the user is an admin
  if (role !== "admin") {
    return <Navigate to="/unauthorized" replace />; // Redirect if not an admin
  }

  return <Outlet />; // Allow access to the nested route if admin
};

export default ProtectedAdminRoute;
