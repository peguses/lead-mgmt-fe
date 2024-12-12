import { Role } from "../redux/role.slice";

export interface User {

    id: number
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    referrerToken?: string;
    role: Role;

}