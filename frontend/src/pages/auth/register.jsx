import React from 'react'
import RegisterForm from '@/components/authentication/RegisterForm'
import logoAbbr from "../../assets/images/logo-abbr.png"
import authUser from "../../assets/images/auth/auth-user.png"

const Register = () => {
    return (
        <main className="auth-creative-wrapper">
            <div className="auth-creative-inner">
                <div className="creative-card-wrapper">
                    <div className="card my-4 overflow-hidden" style={{ zIndex: 1 }}>
                        <div className="row flex-1 g-0">
                            <div className="col-lg-6 h-100 my-auto">
                                <div className="wd-50 bg-white p-2 rounded-circle shadow-lg position-absolute translate-middle top-50 start-50">
                                    <img src={logoAbbr} alt="img" className="img-fluid" />
                                </div>
                                <div className="creative-card-body card-body p-sm-5">
                                    <RegisterForm path={"/auth/masuk"} />
                                </div>
                            </div>
                            <div className="col-lg-6 bg-primary">
                                <div className="h-100 d-flex align-items-center justify-content-center">
                                    <img src={authUser} alt="img" className="img-fluid" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    )
}

export default Register