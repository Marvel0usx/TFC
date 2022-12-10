import { useState, useEffect, useContext } from 'react'
import {Link} from 'react-router-dom'
import { SubscriptionContext } from "../../contexts/SubscriptionContext";
import M from 'materialize-css';

function SubscriptionPlansList() {
    const [subscriptionPlans, setSubscriptionPlans] = useState([]);
    const { subCxt } = useContext(SubscriptionContext)

    useEffect(() => {
        fetch(`http://localhost:8000/payment/subscription/plans/all/`,
        {
            method: "GET",
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return <>404</>
                }  
            })
            .then(response => {
                setSubscriptionPlans(response.data)
            })
        }, []
    );

    return (
        <>
            <h2>Subscription Plans</h2>
            <div className="subscription_plans">
            {console.log(subscriptionPlans)}
                {subscriptionPlans.map((plan) =>
                    <div key={plan.id} style={{marginBottom: "1em", border: "1px solid orange"}}>
                        <h4 className="subscription_plans_title"> {plan.name} </h4>
                        <details className="subscription_plans_description"> {plan.description} </details>
                        <div className="subscription_plans_price"> ${plan.price} </div>
                        <div className="subscription_plans_duration"> {plan.is_monthly ? "Paid Monthly": "Paid Yearly"} </div>
                        <Link className='waves-effect waves-light btn' to={`/subscription/plans/${subCxt.subid === undefined ? "create":"update"}/${plan.id}`}>{subCxt.subid === undefined ? "Subscribe" : "Update To This"}</Link>
                    </div>
                )
            }
            </div>
        </>
    );
}

export default SubscriptionPlansList;