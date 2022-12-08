import Button from "../Button"
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
 

function subscribe(subscription_plan_id) {

}



function SubscriptionPlansList() {
    const [subscriptionPlans, setSubscriptionPlans] = useState([]);

    useEffect(() => {
        fetch(`https://marvel0usx-sturdy-sniffle-qv9r6x95q9f9xxv-8000.preview.app.github.dev/payment/subscription/plans/all/`,
        {
            method: "GET", 
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
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
                        <div>
                            <div className="subscription_plans_title"> {plan.name} </div>
                            <details className="subscription_plans_description"> {plan.description} </details>
                            <div className="subscription_plans_price"> {plan.price} </div>
                            <div className="subscription_plans_duration"> Monthly Plan: element.is_monthly </div>
                            <Button label="Subscribe!" onClick={(plan) => subscribe(plan.id)} />
                        </div>
                    )
                }
            </div>
        </>
    );
}


function SubscriptionHistory() {

}


export default SubscriptionPlansList;