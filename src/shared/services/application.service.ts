import { AxiosResponse } from 'axios';
import apiKit from '../helpers/axios-http-kit';
import { Application } from '../redux/application.slice';

export const fetchApplication = async (applicationId: string): Promise <AxiosResponse<Application>> => {
    return apiKit.get(`/applications/${applicationId}`);
}

export const fetchApplications = async(): Promise<AxiosResponse<Application[]>> => {
    return apiKit.get("/applications")
}