import { Status } from "../redux/application.slice";

export const findLatestStatus = (status: Status[]) => {
    return [...status].sort((a, b) => new Date(b.createDateTime).getTime() - new Date(a.createDateTime).getTime())[0];
}