import { AxiosResponse } from "axios"
import apiKit from '../helpers/axios-http-kit';
import { User } from "../../interfaces/user.interface";

export const fetchUsers = async(): Promise<AxiosResponse<User[]>> => {
    return apiKit.get("/users")
}

export const fetchUser = async(userId: number): Promise<AxiosResponse<User>> => {
    return apiKit.get(`/users/${userId}`)
}

export const createUser = async(data: User): Promise<AxiosResponse<User>> => {
    console.log(data)
    return apiKit.post(`/users`, {data});
}