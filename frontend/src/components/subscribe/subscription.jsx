import {FiCheck} from "react-icons/fi";
import moment from "moment";

export const SubscriptionPlan = ({ planName, description, price, billingCycle, nextPayment, onCancel, onUpdate }) => {
    return (
        <div className="p-4 mb-4 d-xxl-flex d-xl-block d-md-flex align-items-center justify-content-between gap-4 border border-dashed border-gray-5 rounded-1">
            <div>
                <div className="fs-14 fw-bold text-dark mb-1">
                    Paket anda saat ini <a href="#" className="badge bg-primary text-white ms-2">{planName}</a>
                </div>
                <div className="fs-12 text-muted">{description}</div>
            </div>
            <div className="my-3 my-xxl-0 my-md-3 my-md-0">
                <div className="fs-20 text-dark">
                    <span className="fw-bold">{price}</span> / <em className="fs-11 fw-medium">{billingCycle}</em>
                </div>
                <div className="fs-12 text-muted mt-1">
                    Pembayaran selanjutnya{moment(nextPayment).format('DD MM YYYY')} sebesar <strong className="text-dark">{price}</strong>
                </div>
            </div>
            <div className="hstack gap-3">
                <span className="text-danger" onClick={onCancel} style={{cursor: 'pointer'}}>Batal</span>
                <button className="btn btn-light-brand" onClick={onUpdate}>Perbarui</button>
            </div>
        </div>
    );
};

export const SubscriptionCard = ({ id, planName, description, details, price, billingCycle, isActive, setActive}) => {
    return (
        <div className="col-xxl-4 col-xl-12 col-lg-4">
            <div
                className={`p-4 mb-4 d-block ${isActive ? 'bg-soft-200' : 'bg-soft-100'} border border-dashed border-gray-5 rounded-1 position-relative`}
                onClick={() => setActive(id)}
                style={{cursor: 'pointer'}}
            >
                <h6 className="fs-13 fw-bold">{planName}</h6>
                <p className="fs-12 fw-normal text-muted">{description}</p>
                <p className="fs-12 fw-normal text-muted text-truncate-2-line">{details}</p>
                <div className="mt-4">
                    <span className="fs-16 fw-bold text-dark">{price}</span> / <em className="fs-11 fw-medium">{billingCycle}</em>
                </div>
                {isActive && (
                    <div className="position-absolute top-0 start-50 translate-middle">
                        <FiCheck size={20} className='bg-primary text-white p-1 rounded-circle' />
                    </div>
                )}
            </div>
        </div>
    );
};