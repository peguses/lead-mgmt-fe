import { AxiosResponse } from "axios"
import apiKit from '../helpers/axios-http-kit';
import { Role } from "../redux/role.slice";

export const fetchStatuses = async(): Promise<AxiosResponse<Role[]>> => {
    return apiKit.get("/statuses")
}