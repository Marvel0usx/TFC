import { useState, useEffect, useContext } from 'react'
import {Link} from 'react-router-dom'
import { SubscriptionContext } from "../../contexts/SubscriptionContext";

function SubscriptionPlansList() {
    const [subscriptionPlans, setSubscriptionPlans] = useState([]);
    const { subCxt } = useContext(SubscriptionContext)

    useEffect(() => {
        fetch(`http://localhost:8000/payment/subscription/plans/all/`,
        {
            method: "GET"
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return <>404</>
                }  
            })
            .then(data => setSubscriptionPlans(data.data))
        }, []
    );

    return (
        <>
            <h2>Subscription Plans</h2>
            <div className="subscription_plans">
                {
                    subscriptionPlans.map((plan) =>
                        <div key={plan.id} style={{marginBottom: "1em", border: "1px solid orange"}}>
                            <div className="subscription_plans_title"> {plan.name} </div>
                            <details className="subscription_plans_description"> {plan.description} </details>
                            <div className="subscription_plans_price"> ${plan.price} </div>
                            <div className="subscription_plans_duration"> {plan.is_monthly ? "Paid Monthly": "Paid Yearly"} </div>
                            <Link to={`/subscription/plans/${subCxt.subid === undefined ? "create":"update"}/${plan.id}`}><button>{subCxt.subid === undefined ? "Subscribe" : "Update To This"}</button></Link>
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default SubscriptionPlansList;