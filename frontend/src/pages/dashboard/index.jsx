import React from 'react';
import Subscribe from "../subscribe/index.jsx";
import PageHeader from "@/components/shared/pageHeader/index.jsx";
import {FiAlertOctagon} from "react-icons/fi";
import {SubscriptionPlan} from "@/components/subscribe/subscription.jsx";

const Dashboard = () => {
    return (
        <>
            <PageHeader/>
            <div className='main-content'>
                <div className='row'>
                    <div className="col-xxl-12 col-xl-12">
                        <div className="card border-top-0">
                            <div className="alert alert-dismissible m-4 p-4 d-flex alert-soft-danger-message"
                                 role="alert">
                                <div className="me-4 d-none d-md-block">
                                    <FiAlertOctagon className='fs-1'/>
                                </div>
                                <div>
                                    <p className="fw-bold mb-1 text-truncate-1-line">
                                        We need your attention!
                                    </p>
                                    <p className="fs-12 fw-medium text-truncate-1-line">
                                        Your payment was declined. To start using tools, please{" "}
                                        <strong>Add Payment Method</strong>
                                    </p>
                                    <a
                                        href="#"
                                        className="btn btn-sm bg-soft-danger text-danger d-inline-block"
                                    >
                                        Add Payment Method
                                    </a>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="alert"
                                        aria-label="Close"
                                    />
                                </div>
                            </div>
                            <div className="subscription-plan px-4 pt-4">
                                <div className="mb-4 d-flex align-items-center justify-content-between">
                                    <h5 className="fw-bold mb-0">Subscription &amp; Plan:</h5>
                                    <a href="#" className="btn btn-sm btn-light-brand">
                                        4 days remaining
                                    </a>
                                </div>
                                <SubscriptionPlan
                                    planName="Team Plan"
                                    description="A simple start for everyone"
                                    price="$29.99"
                                    billingCycle="Month"
                                    nextPayment="12/10/2023"
                                    onCancel={() => alert('Cancel Plan clicked')}
                                    onUpdate={() => alert('Update Plan clicked')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;