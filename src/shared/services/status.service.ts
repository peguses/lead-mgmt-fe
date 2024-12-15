import { AxiosResponse } from "axios"
import apiKit from '../helpers/axios-http-kit';

export const fetchStatuses = async(): Promise<AxiosResponse<any>> => {
    return apiKit.get("/application-status")
}