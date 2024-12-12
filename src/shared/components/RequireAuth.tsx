import { Outlet } from "react-router-dom";
import useToken from "../hooks/useToken";

export const RequireAuth = () => {

    const { token } = useToken();
    
    if (token()) {
        return <Outlet/>;
    } else {
        window.location.assign("/login");
        return null;
    }
}