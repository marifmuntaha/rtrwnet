import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {login} from "@/utils/api/auth.jsx"
import {useForm} from "react-hook-form";
import {APICore} from "@/utils/api/APICore.jsx";
import {topTost} from "@/utils/topTost.jsx";

const LoginForm = ({ registerPath, resetPath }) => {
    const api = new APICore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit} = useForm();
    const onSubmit = async (data) => {
        setLoading(true);
        await login(data).then(async (resp) => {
            const result = resp.data.result;
            await topTost('success', resp.data.message);
            await api.setLoggedInUser(result);
            await api.setAuthorization(result.token);
            setLoading(false);
            navigate('/');
        }).catch(async (error) => {
            await topTost('error', error)
            setLoading(false);
        })
    }
    return (
        <>
            <h2 className="fs-20 fw-bolder mb-4">RTRW-NET</h2>
            <h4 className="fs-13 fw-bold mb-2">Masuk ke akun anda.</h4>
            <p className="fs-12 fw-medium text-muted">Terima kasih telah kembali <strong>RTRW-NET</strong> App, masuk dan nikmati kemudahan dari kami.</p>
            <form className="w-100 mt-4 pt-2" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nama Pengguna"
                        {...register('username', {required: true})}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Kata Sandi"
                        {...register('password', {required: true})}
                    />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="remember" />
                            <label className="custom-control-label c-pointer" htmlFor="remember">Ingat Saya?</label>
                        </div>
                    </div>
                    <div>
                        <Link to={resetPath} className="fs-11 text-primary">Lupa Sandi?</Link>
                    </div>
                </div>
                <div className="mt-5">
                    <button type="submit" className="btn btn-lg btn-primary w-100" disabled={loading}>MASUK</button>
                </div>
            </form>
            <div className="mt-5 text-muted">
                <span> tidak punya akun?</span>
                <Link to={registerPath} className="fw-bold"> Buat akun</Link>
            </div>
        </>
    )
}

export default LoginForm