import { AxiosResponse } from "axios"
import apiKit from '../helpers/axios-http-kit';
import { User } from "../interfaces/user.interface";

export const fetchUsers = async({page, limit, key, value, role}): Promise<AxiosResponse<any>> => {
    if (key && value) {
        return apiKit.get(`/users?page=${page}&limit=${limit}&filterKey=${key}&filterValue=${value}`);
    }
    if (role) {
        return apiKit.get(`/users?page=${page}&limit=${limit}&role=${role}`);
    }
    return apiKit.get(`/users?page=${page}&limit=${limit}`);
    
}

export const fetchUser = async(userId: number): Promise<AxiosResponse<any>> => {
    return apiKit.get(`/users/${userId}`)
}

export const createUser = async(data: User): Promise<AxiosResponse<User>> => {
    return apiKit.post(`/users`, data);
}

export const dropUser = async(userId: number): Promise<AxiosResponse<any>> => {
    return apiKit.patch(`/users/${userId}`);
}

export const updateUser = async(userId: number, data: User): Promise<AxiosResponse<User>> => {
    return apiKit.put(`/users/${userId}`, {...data});
}

export const login = async(data: User): Promise<AxiosResponse<User>> => {
    return apiKit.post(`/auth/login`, {...data});
}

export const logout = async(): Promise<AxiosResponse<any>> => {
    return apiKit.post(`/logout`);
}   