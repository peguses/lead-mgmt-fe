import { Status } from "../redux/application.slice";

export const findLatestStatus = (status: Status[]) => {
    // console.log(new Date(status[0].createDateTime).getTime());
    return [...status].sort((a, b) => new Date(b.createDateTime).getTime() - new Date(a.createDateTime).getTime())[0];
    // console.log(sortedObjects);
    // return "";
}