import { Status } from "../redux/application.slice";

export const findLatestStatus = (status: Status[] | undefined): any => {
    return status && status.length === 1 ? status[0].status : "";
}

export const findLatestStatusNote = (status: Status[] | undefined): string => {
    return status && status.length === 1 ? status[0].note : "";
}

export const findStatus = (status: Status[] | undefined): Status | undefined => {

    if (status && Array.isArray(status)) {
        return [...status]?.sort((a, b) => new Date(b.createDateTime).getTime() - new Date(a.createDateTime).getTime())[0]
    }

    if (status && !Array.isArray(status)) {
        return status;
    }
}

