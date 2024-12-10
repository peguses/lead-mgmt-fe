import { Role } from "../redux/role.slice";

export const findApplicationRole = (role: string, roles: Role[] | undefined): Role | undefined => {
    return roles?.find((r) => r.role === role);
}