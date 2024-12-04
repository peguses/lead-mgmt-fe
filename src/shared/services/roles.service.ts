import { AxiosResponse } from "axios"
import apiKit from '../helpers/axios-http-kit';
import { Role } from "../redux/role.slice";

export const fetchRoles = async(): Promise<AxiosResponse<Role[]>> => {
    return apiKit.get("/roles")
}