import { AxiosResponse } from 'axios';
import apiKit from '../helpers/axios-http-kit';
import { Application, UpdateStatusRequest } from '../redux/application.slice';

export interface Filer {
    applicationId?: number;
    filterBy?: string;
    filter?: string;
}

export const fetchApplication = async ({applicationId, filterBy , filter}: Filer): Promise <AxiosResponse<any>> => {
    if (filterBy && filter) {
        return apiKit.get(`/applications?${filterBy}=${filter}`);
    }
    return apiKit.get(`/applications/${applicationId}`);
}

export const fetchApplications = async({page, limit, key, value}): Promise<AxiosResponse<any>> => {
    if (key && value) {
        return apiKit.get(`/applications?page=${page}&limit=${limit}&filterKey=${key}&filterValue=${value}`);
    }
    return apiKit.get(`/applications?page=${page}&limit=${limit}`);
}

export const dropApplication = async(applicationId: number): Promise<AxiosResponse<any>> => {
    return apiKit.delete(`/applications/${applicationId}`)
}

export const updateApplication = async(applicationId: number, data: any):Promise<AxiosResponse<Application>> => {
    return apiKit.patch(`/applications/${applicationId}`, {...data})
}

export const createApplication = async(data: Application):Promise<AxiosResponse<any>> => {
    return apiKit.post(`/applications`, {...data})
}

export const createStatus = (statusRequest: UpdateStatusRequest): Promise<AxiosResponse<any>> => {
    return apiKit.post("/application-states", {...statusRequest})
}

export const uploadDocument = (document: FormData, onUploadProgress): Promise<AxiosResponse<any>> => {
    return apiKit.post("/documents", document, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress
    });
}