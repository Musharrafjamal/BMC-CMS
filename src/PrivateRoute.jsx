import { Navigate, Outlet, useLocation } from "react-router-dom";
import { projectAuth } from "./firebaseconfig";

const PrivateRoute = () => {
  const location = useLocation();
  return projectAuth.currentUser ? (
    <Outlet />
  ) : (
    // keep the previous navigation stack
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
