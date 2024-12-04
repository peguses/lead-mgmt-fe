import { AxiosResponse } from "axios"
import { User } from "../redux/users.slice"
import apiKit from '../helpers/axios-http-kit';

export const fetchUsers = async(): Promise<AxiosResponse<User[]>> => {
    return apiKit.get("/users")
}