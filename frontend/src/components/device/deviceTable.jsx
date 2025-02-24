import React, {useEffect, useState} from 'react'
import Table from '@/components/shared/table'
import {FiEdit2, FiSend, FiTrash2} from 'react-icons/fi'
import {Link} from 'react-router-dom';
import {get as getDevices, connect as connectDevice, destroy as destroyDevice} from "@/utils/api/device.jsx"
import {topTost} from "@/utils/topTost.jsx";

const DeviceTable = () => {
    const [devices, setDevices] = useState([]);
    const [status, setStatus] = useState([])
    const handleData = () => {
        getDevices().then((resp) => {
            setDevices(resp.data.result)
        }).catch(async (error) => {
            await topTost('error', error)
        })
    }
    const columns = [
        {
            accessorKey: 'id',
            header: () => '#',
        },
        {
            accessorKey: 'name',
            header: () => 'Nama Perangkat',
            cell: (info) => <a href='#' className='fw-bold'>{info.getValue()}</a>
        },
        {
            accessorKey: 'host',
            header: () => 'Host',
        },
        {
            accessorKey: 'port',
            header: () => 'Port',
            meta: {
                className: "fw-bold text-dark"
            }
        },
        {
            accessorKey: 'id',
            header: () => 'Status',
            cell: (info) => (
                status.includes(info.getValue())
                    ? <div className="badge bg-soft-success text-success">Online</div>
                    : <div className="badge bg-soft-danger text-danger">Offline</div>
            )
        },
        {
            accessorKey: 'id',
            header: () => "Actions",
            cell: info => (
                <div className="hstack gap-2">
                    <a href={"#"} className="avatar-text avatar-md">
                        <FiSend onClick={() => {
                            connectDevice({id: info.getValue(), query: {params: ['/ip/address/print']}}).then(() => {
                                setStatus([...status, info.getValue()])
                            })
                        }}/>
                    </a>
                    <Link to={`/perangkat/${info.getValue()}/ubah`} className="avatar-text avatar-md">
                        <FiEdit2/>
                    </Link>
                    <button className="avatar-text avatar-md">
                        <FiTrash2 onClick={async () => {
                            await destroyDevice({id: info.getValue()}).then(async (resp) => {
                                await topTost('success', resp.data.message)
                                handleData()
                            }).catch(async (error) => {
                                await topTost('error', error)
                            })
                        }}/>
                    </button>
                </div>
            ),
            meta: {
                headerClassName: 'text-end'
            }
        },
    ]

    useEffect(() => {
        handleData()
    }, [])

    return (
        <>
            <Table data={devices ? devices : []} columns={columns}/>
        </>
    )
}

export default DeviceTable