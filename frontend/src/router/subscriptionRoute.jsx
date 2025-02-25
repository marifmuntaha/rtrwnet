import React, {Suspense} from "react";
import {APICore} from "@/utils/api/APICore";
import {Navigate, Outlet} from "react-router-dom";

const SubscriptionRoute = () => {
    const api = new APICore();
    const {subscription} = api.getLoggedInUser();

    return (
        <Suspense fallback={<div>Loading</div>}>
            {subscription?.status === '1' ? <Outlet/> : <Navigate to={"/berlangganan"}/>}
        </Suspense>
    )
}

export default SubscriptionRoute;