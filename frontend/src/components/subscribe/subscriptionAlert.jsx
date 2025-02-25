import React from "react";
import {FiAlertOctagon, FiAlertTriangle, FiCheckCircle} from "react-icons/fi";

const SubscriptionAlert = ({subscription}) => {
    const notification = () => {
        switch (subscription?.status) {
            case "1":
                return {
                    class: 'success',
                    icon: <FiCheckCircle className="fs-1"/>,
                    title: "Status langganan aktif",
                    text: "Terima kasih telah berlangganan aplikasi kami.",
                    button: "Ubah Langganan"
                }
            case "2":
                return {
                    class: 'warning',
                    icon: <FiAlertTriangle className="fs-1"/>,
                    title: "Status langganan dibekukan",
                    text: "Silahkan menyelesaikan pembayaran untuk menggunakan aplikasi kami.",
                    button: "Ubah Langganan"
                }
            default:
                return {
                    class: 'danger',
                    icon: <FiAlertOctagon className="fs-1"/>,
                    title: "Anda belum berlangganan",
                    text: "Silahkan berlangganan untuk memulai menggunakan aplikasi.",
                    button: "Pilih Langganan"
                }
        }
    }
    return (
        <div className={`alert alert-dismissible m-4 p-4 d-flex alert-soft-${notification().class}-message`} role="alert">
            <div className="me-4 d-none d-md-block">
                {notification().icon}
            </div>
            <div>
                <p className="fw-bold mb-1 text-truncate-1-line">
                    {notification().title}
                </p>
                <p className="fs-12 fw-medium text-truncate-1-line">
                    {notification().text}{" "}
                </p>
                <a href="#" className={`btn btn-sm bg-soft-${notification().class} text-${notification().class} d-inline-block`}>
                    {notification().button}
                </a>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                />
            </div>
        </div>
    )
}

export default SubscriptionAlert;