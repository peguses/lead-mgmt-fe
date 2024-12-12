import { Outlet, useNavigate } from "react-router-dom";

export const RequireAuth = () => {
    const navigate = useNavigate();
    window.location.assign("/login");
    return null;
}