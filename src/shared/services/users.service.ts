import { AxiosResponse } from "axios"
import apiKit from '../helpers/axios-http-kit';
import { User } from "../interfaces/user.interface";

export const fetchUsers = async(): Promise<AxiosResponse<any>> => {
    return apiKit.get("/users")
}

export const fetchUser = async(userId: number): Promise<AxiosResponse<any>> => {
    return apiKit.get(`/users/${userId}`)
}

export const createUser = async(data: User): Promise<AxiosResponse<User>> => {
    return apiKit.post(`/users`, {data});
}

export const dropUser = async(userId: number): Promise<AxiosResponse<any>> => {
    return apiKit.delete(`/users/${userId}`);
}

export const updateUser = async(userId: number, data: User): Promise<AxiosResponse<User>> => {
    return apiKit.patch(`/users/${userId}`, {...data});
}

export const login = async(data: User): Promise<AxiosResponse<User>> => {
    return apiKit.post(`/login`, {...data});
}