import { useAppSelector } from "../redux/hooks";
import { Permission } from "../redux/role.slice";

const usePermission = () => {

    const permissions = useAppSelector((state) => {
        return state.applicationUser.user?.role.permissions;
    });

    const hasPermission = (requestedPermissions: Permission[]) => {
        return requestedPermissions?.some((item) => permissions?.includes(item));
    }

    return {
        hasPermission : hasPermission
    };
}

export default usePermission;