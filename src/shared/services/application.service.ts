import { AxiosResponse } from 'axios';
import apiKit from '../helpers/axios-http-kit';
import { Application } from '../redux/application.slice';

export interface Filer {
    applicationId?: number;
    filterBy?: string;
    filter?: string;
}

export const fetchApplication = async ({applicationId, filterBy , filter}: Filer): Promise <AxiosResponse<Application>> => {
    if (filterBy && filter) {
        return apiKit.get(`/applications?${filterBy}=${filter}`);
    }
    return apiKit.get(`/applications/${applicationId}`);
}

export const fetchApplications = async(): Promise<AxiosResponse<Application[]>> => {
    return apiKit.get("/applications")
}

export const dropApplication = async(applicationId: number): Promise<AxiosResponse<any>> => {
    return apiKit.delete(`/applications/${applicationId}`)
}

export const updateApplication = async(applicationId: number, data: Application):Promise<AxiosResponse<Application>> => {
    return apiKit.patch(`/applications/${applicationId}`, {...data})
}