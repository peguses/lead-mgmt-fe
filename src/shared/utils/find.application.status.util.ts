import { Status } from "../redux/application.slice";

export const findLatestStatus = (status: Status[] | undefined): any => {
    return status && status.length === 1 ? status[0].status : "";
}

export const findLatestStatusNote = (status: Status[] | undefined): string => {
    return status && status.length === 1 ? status[0].note : "";
}
