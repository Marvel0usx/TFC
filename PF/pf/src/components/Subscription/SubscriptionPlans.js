import Button from "../Button"
import { useState, useEffect, useContext } from 'react'
import {Link} from 'react-router-dom'
import CreateSubscription from "./SubscriptionCreate";
import { SubscriptionContext } from "../../contexts/SubscriptionContext";

function SubscriptionPlansList() {
    const [subscriptionPlans, setSubscriptionPlans] = useState([]);
    const { subCxt } = useContext(SubscriptionContext)

    useEffect(() => {
        fetch(`http://localhost:8000/payment/subscription/plans/all/`,
        {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => setSubscriptionPlans(data.data))
            .then(console.log(subscriptionPlans));
        }, []
    );

    return (
        <>
            <h2>Subscription Plans</h2>
            <div className="subscription_plans">
                {
                    subscriptionPlans.map((plan) =>
                        <div key={plan.id}>
                            <div className="subscription_plans_title"> {plan.name} </div>
                            <details className="subscription_plans_description"> {plan.description} </details>
                            <div className="subscription_plans_price"> ${plan.price} </div>
                            <div className="subscription_plans_duration"> Monthly Plan: element.is_monthly </div>
                            <Button label="Subscribe!" onClick={(plan) => {
                                    subCxt.intend_subid = plan.id
                                    CreateSubscription()
                                }} />
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default SubscriptionPlansList;