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
  // if( projectAuth.currentUser.email === 'musharraf@1.com'){
  //   return <Outlet />
  // }
  // if ( projectAuth.currentUser) {
  //   return <Navigate to="/users" state={{ from: location }} />
  // } else {
  //   return <Navigate to="/login" state={{ from: location }} replace />
  // }
};

export default PrivateRoute;
