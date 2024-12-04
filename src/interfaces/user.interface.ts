import { Role } from "../shared/redux/role.slice";

export interface User {

    id: number
    firstName: string;
    lastName: string;
    userName: string;
    password?: string | undefined;
    role: Role;

}