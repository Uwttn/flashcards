import { Navigate } from "react-router-dom";
import Auth from "./auth";

const PrivateRoute = ({ children }) => {
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
