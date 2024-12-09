import { AxiosResponse } from "axios"
import apiKit from '../helpers/axios-http-kit';

export const fetchRoles = async(): Promise<AxiosResponse<any>> => {
    return apiKit.get("/roles")
}