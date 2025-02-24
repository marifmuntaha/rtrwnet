import React from "react";
import PageHeader from "@/components/shared/pageHeader/index.jsx";
import {HeaderList} from "@/components/device/deviceHeader.jsx";
import DeviceTable from "@/components/device/deviceTable.jsx";

const DeviceList = () => {
    return (
        <>
            <PageHeader>
                <HeaderList />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <DeviceTable />
                </div>
            </div>
        </>
    )
}

export default DeviceList;