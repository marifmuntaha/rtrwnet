import React from 'react'
import PageHeader from '@/components/shared/pageHeader'
import {HeaderCreate} from '@/components/device/deviceHeader.jsx'
import DeviceForm from "@/components/device/deviceForm.jsx";
import {useForm} from "react-hook-form";

const DeviceCreate = () => {
    const {register, handleSubmit} = useForm({})
    return (
        <>
            <PageHeader>
                <HeaderCreate handleSubmit={handleSubmit} />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <DeviceForm register={register}/>
                </div>
            </div>
        </>
    )
}

export default DeviceCreate