import React from "react";

const DeviceForm = ({register}) => {
    return (
        <>
            <div className="col-xl-4">
            </div>
            <div className="col-xl-4">
                <div className="card stretch stretch-full">
                    <div className="card-body">
                        <div className="mb-4">
                            <label className="form-label">Nama Perangkat <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ex. MikroTik-1"
                                {...register('name', {required: true})}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Host <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ex. 192.168.88.1"
                                {...register('host', {required: true})}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Port <span className="text-danger">*</span></label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="8289"
                                {...register('port', {required: true})}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Nama Pengguna <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ex. admin"
                                {...register('user', {required: true})}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Kata Sandi <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ex. ********"
                                {...register('password', {required: true})}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeviceForm;