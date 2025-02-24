import React, {useState} from 'react'
import {FiEye} from 'react-icons/fi'
import {Link, useNavigate} from 'react-router-dom'
import {useForm} from "react-hook-form";
import {register as registerUser} from "@/utils/api/auth.jsx"
import {topTost} from "@/utils/topTost.jsx";
import {APICore} from "@/utils/api/APICore.jsx";

const RegisterForm = ({path}) => {
    const api = new APICore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [passState, setPassState] = useState(true);
    const [cpassState, setCpassState] = useState(true);
    const [remember, setRemember] = useState(true);
    const {register, handleSubmit} = useForm()
    const onSubmit = async (data) => {
        setLoading(true);
        await registerUser(data).then(async (resp) => {
            const result = resp.data.result;
            await api.setLoggedInUser(result);
            await api.setAuthorization(result.token);
            setLoading(false);
            await topTost('success', resp.data.message);
            navigate('/');
        }).catch(async (error) => {
            setLoading(false);
            await topTost('error', error)
        })
    }
    return (
        <>
            <h2 className="fs-20 fw-bolder mb-4">RTRW-NET</h2>
            <h4 className="fs-13 fw-bold mb-2">Kelola semua RTRW-NET anda dengan mudah.</h4>
            <p className="fs-12 fw-medium text-muted">Buat akun anda sekarang dan nikmati semua kemudahannya.</p>
            <form className="w-100 mt-4 pt-2" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nama Lengkap"
                        {...register('fullName', {required: 'Kolom nama lengkap tidak boleh kosong.'})}
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Alamat Email"
                        {...register('email', {required: 'Kolom email tidak boleh kosong.'})}
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Whatsapp"
                        {...register('phone', {required: 'Kolom whatsapp tidak boleh kosong.'})}
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nama Pengguna"
                        {...register('username', {required: 'Kolom nama pengguna tidak boleh kosong.'})}
                    />
                </div>
                <div className="mb-4 generate-pass">
                    <div className="input-group field">
                        <input
                            type={passState ? "password" : 'text'}
                            className="form-control password"
                            placeholder="Kata Sandi"
                            {...register('password', {required: 'Kolom kata sandi tidak boleh kosong.'})}
                        />
                        <div className="input-group-text border-start bg-gray-2 c-pointer" data-bs-toggle="tooltip"
                             title="Lihat/Sembuyikan">
                            <FiEye size={16} onClick={() => setPassState(!passState)}/>
                        </div>
                    </div>
                </div>
                <div className="mb-4 generate-pass">
                    <div className="input-group field">
                        <input
                            type={cpassState ? "password" : 'text'}
                            className="form-control password"
                            placeholder="Ulangi Sandi"
                            {...register('password_confirmation', {required: 'Kolom ulangi sandi tidak boleh kosong.'})}
                        />
                        <div className="input-group-text border-start bg-gray-2 c-pointer" data-bs-toggle="tooltip"
                             title="Lihat/Sembuyikan">
                            <FiEye size={16} onClick={() => setCpassState(!cpassState)}/>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" checked={remember} onChange={() => setRemember(!remember)} />
                        <label className="custom-control-label c-pointer text-muted" htmlFor="termsCondition"
                               style={{fontWeight: '400 !important'}}>
                            Saya menyetujui semua <a href="#">Syarat &amp; Kondisi</a>.</label>
                    </div>
                </div>
                <div className="mt-5">
                    <button type="submit" className="btn btn-lg btn-primary w-100" disabled={loading}>
                        Buat Akun
                    </button>
                </div>
            </form>
            <div className="mt-5 text-muted">
                <span>Sudah punya akun?</span>
                <Link to={path} className="fw-bold"> Masuk</Link>
            </div>
        </>
    )
}

export default RegisterForm