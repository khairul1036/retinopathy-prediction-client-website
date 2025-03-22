import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hook/useAuth";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  const location = useLocation();

  if (user && user?.email) {
    return children;
  }
  return <Navigate to="/" state={location.pathname} />;
};

export default PrivateRoute;
