import React, {useState} from 'react'
import {FiPlus, FiSave, FiSend} from 'react-icons/fi'
import { Link } from 'react-router-dom';
import {topTost} from "@/utils/topTost.jsx";
import {store as storeDevice, update as updateDevice} from "@/utils/api/device.jsx"

export const HeaderList = () => {
    return (
        <>
            <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                <Link to="/perangkat/tambah" className="btn btn-primary">
                    <FiPlus size={16} className='me-2' />
                    <span>Tambah</span>
                </Link>
            </div>
        </>
    )
}

export const HeaderUpdate = ({handleSubmit, getValues}) => {
    const [loading, setLoading] = useState(false)
    const onSubmit = async (data) => {
        data.id = getValues('id')
        setLoading(true);
        await updateDevice(data).then(async (resp) => {
            await topTost('success', resp.data.message)
            setLoading(false);
        }).catch(async (error) => {
            await topTost('error', error)
            setLoading(false);
        })
    };
    return (
        <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
            <button className="btn btn-primary" onClick={handleSubmit(onSubmit)} disabled={loading}>
                <FiSave size={16} className='me-2'/>
                <span>PERBARUI</span>
            </button>
        </div>
    )
}

export const HeaderCreate = ({handleSubmit, reset}) => {
    const [loading, setLoading] = useState(false)
    const onSubmit = async (data) => {
        setLoading(true);
        await storeDevice(data).then(async (resp) => {
            await topTost('success', resp.data.message)
            await reset()
            setLoading(false);
        }).catch(async (error) => {
            await topTost('error', error)
            setLoading(false);
        })
    };
    const onCheck = async (data) => {
        console.log(data)
    }
    return (
        <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
            <a href="#" className="btn btn-light-brand" onClick={handleSubmit(onCheck)}>
                <FiSend size={16} className='me-2'/>
                <span>Tes Koneksi</span>
            </a>
            <button className="btn btn-primary" onClick={handleSubmit(onSubmit)} disabled={loading}>
                <FiSave size={16} className='me-2'/>
                <span>simpan</span>
            </button>
        </div>
    )
}