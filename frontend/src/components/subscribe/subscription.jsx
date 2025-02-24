import {FiCheck} from "react-icons/fi";

export const SubscriptionPlan = ({ planName, description, price, billingCycle, nextPayment, onCancel, onUpdate }) => {
    return (
        <div className="p-4 mb-4 d-xxl-flex d-xl-block d-md-flex align-items-center justify-content-between gap-4 border border-dashed border-gray-5 rounded-1">
            <div>
                <div className="fs-14 fw-bold text-dark mb-1">
                    Your current plan is <a href="#" className="badge bg-primary text-white ms-2">{planName}</a>
                </div>
                <div className="fs-12 text-muted">{description}</div>
            </div>
            <div className="my-3 my-xxl-0 my-md-3 my-md-0">
                <div className="fs-20 text-dark">
                    <span className="fw-bold">{price}</span> / <em className="fs-11 fw-medium">{billingCycle}</em>
                </div>
                <div className="fs-12 text-muted mt-1">
                    Billed Monthly / Next payment on {nextPayment} for <strong className="text-dark">$62.48</strong>
                </div>
            </div>
            <div className="hstack gap-3">
                <a href="#" className="text-danger" onClick={onCancel}>Cancel Plan</a>
                <a href="#" className="btn btn-light-brand" onClick={onUpdate}>Update Plan</a>
            </div>
        </div>
    );
};

export const SubscriptionCard = ({ planName, description, details, price, billingCycle, isActive }) => {
    return (
        <div className="col-xxl-4 col-xl-12 col-lg-4">
            <a href="#" className={`p-4 mb-4 d-block ${isActive ? 'bg-soft-200' : 'bg-soft-100'} border border-dashed border-gray-5 rounded-1 position-relative`}>
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
            </a>
        </div>
    );
};