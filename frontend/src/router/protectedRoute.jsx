import React from "react";
import {APICore} from "@/utils/api/APICore";
import {Navigate, Outlet} from "react-router-dom";

const protectedRoute = () => {
    const api = new APICore()
    return api.isUserAuthenticated() === false ? <Navigate to={"/auth/masuk"}/> : <Outlet/>
}

export default protectedRoute;