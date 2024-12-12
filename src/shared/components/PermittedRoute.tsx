import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { Permission } from "../redux/role.slice";

function PermittedRoute({
  requestedPermissions,
  children,
}: {
  requestedPermissions: Permission[];
  children: any;
}) {

  const permissions = useAppSelector((state) => {
    return state.applicationUser.user?.role.permissions;
  });

  const isFound = requestedPermissions?.some((item) => {
    return permissions?.includes(item);
  });

  if (!isFound) {
    return <Navigate replace to="/" />;
  }
  return children;

}

export default PermittedRoute;
