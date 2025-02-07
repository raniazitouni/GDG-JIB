import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  // console.log("RequireAuth - auth:", auth);
  // console.log("RequireAuth - allowedRoles:", allowedRoles);

  const roles = [ auth?.roles];

  return roles.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
