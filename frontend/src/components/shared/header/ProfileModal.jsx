import React, { Fragment } from 'react'
import { FiActivity, FiBell, FiChevronRight, FiDollarSign, FiLogOut, FiSettings, FiUser } from "react-icons/fi"
import avatar1 from "../../../assets/images/avatar/1.png"
import {APICore} from "@/utils/api/APICore.jsx";
import {logout} from '@/utils//api/auth.jsx'
import {topTost} from "@/utils/topTost.jsx";
import {useNavigate} from "react-router-dom";

const activePosition = ["Active", "Always", "Busy", "Inactive", "Disabled", "Customization"]
const subscriptionsList = ["Plan", "Billings", "Referrals", "Payments", "Statements", "Subscriptions"]

const ProfileModal = () => {
    const api = new APICore();
    const {user} = api.getLoggedInUser();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout(user).then(() => {
            api.setLoggedInUser(null);
            api.setAuthorization();
            navigate('/auth/masuk');
        }).catch((error) => {
            topTost('error', error)
        })
    }
    return (
        <div className="dropdown nxl-h-item">
            <a href="#" data-bs-toggle="dropdown" role="button" data-bs-auto-close="outside">
                <img src={avatar1} alt="user-image" className="img-fluid user-avtar me-0" />
            </a>
            <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-user-dropdown">
                <div className="dropdown-header">
                    <div className="d-flex align-items-center">
                        <img src={avatar1} alt="user-image" className="img-fluid user-avtar" />
                        <div>
                            <h6 className="text-dark mb-0">{user.fullName} </h6>
                            <span className="fs-12 fw-medium text-muted">{user.email}</span>
                        </div>
                    </div>
                </div>
                <div className="dropdown">
                    <a href="#" className="dropdown-item" data-bs-toggle="dropdown">
                        <span className="hstack">
                            <i className=" me-2"><FiDollarSign /></i>
                            <span>Subscriptions</span> <span className="badge bg-soft-success text-success ms-1">PRO</span>
                        </span>
                        <i className="ms-auto me-0"><FiChevronRight /></i>
                    </a>
                    <div className="dropdown-menu">
                        {
                            subscriptionsList.map((item, index) => {
                                return (
                                    <Fragment key={index}>
                                        {index === activePosition.length - 1 && <div className="dropdown-divider"></div>}
                                        <a href="#" className="dropdown-item">
                                            <span className="hstack">
                                                <i className="wd-5 ht-5 bg-gray-500 rounded-circle me-3"></i>
                                                <span>{item}</span>
                                            </span>
                                        </a>
                                    </Fragment>
                                )
                            })
                        }

                    </div>
                </div>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">
                    <i ><FiUser /></i>
                    <span>Profile Details</span>
                </a>
                <a href="#" className="dropdown-item">
                    <i ><FiActivity /></i>
                    <span>Activity Feed</span>
                </a>
                <a href="#" className="dropdown-item">
                    <i ><FiDollarSign /></i>
                    <span>Billing Details</span>
                </a>
                <a href="#" className="dropdown-item">
                    <i><FiBell /></i>
                    <span>Notifications</span>
                </a>
                <a href="#" className="dropdown-item">
                    <i><FiSettings /></i>
                    <span>Account Settings</span>
                </a>
                <div className="dropdown-divider"></div>
                <a href={"#"} className="dropdown-item" onClick={() => handleLogout()}>
                    <i> <FiLogOut /></i>
                    <span>Keluar</span>
                </a>
            </div>
        </div>
    )
}

export default ProfileModal;