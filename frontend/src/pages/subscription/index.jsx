import React, {useEffect, useState} from "react";
import PageHeader from "@/components/shared/pageHeader/index.jsx";
import {SubscriptionCard, SubscriptionPlan} from "@/components/subscribe/subscription.jsx";
import {APICore} from "@/utils/api/APICore.jsx";
import {show as showSubscriptions, store as storeSubscription} from "@/utils/api/subscription.jsx"
import SubscriptionAlert from "@/components/subscribe/subscriptionAlert.jsx";
import {SubscriptionOption} from "@/components/subscribe/subscriptionOption.jsx";
import moment from "moment";
import {topTost} from "@/utils/topTost.jsx";

const Subscription = () => {
    const api = new APICore();
    const {user, subscription} = api.getLoggedInUser();
    const [plan, setPlan] = useState({});
    const [active, setActive] = useState(0);
    const getSubscription = async () => {
        subscription && showSubscriptions(subscription.id).then((resp) => {
            const result = resp.data.result;
            const subs = SubscriptionOption.filter((subscription) => subscription.id === parseInt(result.plan)).pop()
            setPlan({...subs, result});
        }).catch((error) => {
            console.log(error);
        })
    }
    const onSubmit = async (data) => {
        const params = {
            id: data.id,
            userId: user.id,
            due: moment().add(1, 'months').format("YYYY-MM-DD"),
            plan: data.id
        }
        switch (data.id) {
            case 1:
                params.status = '1'
                break;
            case 2:
                params.status = '2'
                break;
            case 3:
                params.status = '2'
                break;
            default:
                break;
        }
        await storeSubscription(params).then(async (resp) => {
            const result = resp.data.result;
            api.setUserInSession(result)
            await topTost('success', resp.data.message);
            getSubscription().then()
        }).catch(async (error) => {
            await topTost('error', error);
        })

    }

    useEffect(() => {
        getSubscription().then()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <PageHeader/>
            <div className='main-content'>
                <div className='row'>
                    <div className="col-xxl-12 col-xl-12">
                        <div className="card border-top-0">
                            <SubscriptionAlert subscription={subscription} />
                            <div className="subscription-plan px-4 pt-4">
                                <div className="mb-4 d-flex align-items-center justify-content-between">
                                    <h5 className="fw-bold mb-0">Berlangganan &amp; Paket:</h5>
                                    {/*<a href="#" className="btn btn-sm btn-light-brand">*/}
                                    {/*    4 days remaining*/}
                                    {/*</a>*/}
                                </div>
                                {subscription && (
                                    <SubscriptionPlan
                                        planName={plan?.planName}
                                        description="A simple start for everyone"
                                        price={plan?.price}
                                        billingCycle={plan?.billingCycle}
                                        nextPayment={plan?.due}
                                        onCancel={() => {
                                            setActive(0)
                                        }}
                                        onUpdate={() => onSubmit(subscription)}
                                    />
                                )}
                                <div className="row">
                                    {SubscriptionOption.map((option, index) => (
                                        <SubscriptionCard
                                            key={index}
                                            id={option.id}
                                            planName={option.planName}
                                            description={option.description}
                                            details={option.details}
                                            price={option.price}
                                            billingCycle={option.billingCycle}
                                            setActive={setActive}
                                            isActive={active === option.id}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Subscription