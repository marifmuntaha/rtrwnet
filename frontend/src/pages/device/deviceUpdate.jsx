import React, {useEffect} from 'react'
import PageHeader from '@/components/shared/pageHeader'
import {HeaderUpdate} from '@/components/device/deviceHeader.jsx'
import {useForm} from "react-hook-form";
import DeviceForm from "@/components/device/deviceForm.jsx";
import {useParams} from "react-router-dom";
import {show as showDevice} from "@/utils/api/device.jsx"
import {topTost} from "@/utils/topTost.jsx";

const DeviceUpdate = () => {
    const {id} = useParams();
    const {register, handleSubmit, setValue, getValues} = useForm({});

    useEffect(() => {
        showDevice({id}).then((resp) => {
            const device = resp.data.result;
            setValue('id', device.id);
            setValue('userId', device.userId);
            setValue('name', device.name);
            setValue('host', device.host);
            setValue('port', device.port);
            setValue('user', device.user);
            setValue('password', device.password);
        }).catch(async (error) => {
            await topTost('error', error)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <PageHeader>
                <HeaderUpdate handleSubmit={handleSubmit} getValues={getValues} />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <DeviceForm register={register}/>
                </div>
            </div>
        </>
    )
}

export default DeviceUpdate