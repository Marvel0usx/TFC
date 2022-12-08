import Button from "../Button"
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
 

function Subscribe(subscription_plan_id) {

}



function SubscriptionPlansList() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('https://marvel0usx-sturdy-sniffle-qv9r6x95q9f9xxv-8000.preview.app.github.dev/payment/subscription/plans/all/',
        {
            method: "POST", 
            body: JSON.stringify(data),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => setData(data))
            .then(console.log(data));
        }, []
    );

    return (
        <>
            <h2>Subscription Plans</h2>
            <div className="subscription_plans">
                {
                    data.data.array.forEach((element) => {
                        <div>
                            <div className="subscription_plans_title"> element.name </div>
                            <details className="subscription_plans_description"> element.description </details>
                            <div className="subscription_plans_price"> element.price </div>
                            <div className="subscription_plans_duration"> Monthly Plan: element.is_monthly </div>
                            <Button label="Subscribe!" onClick={(element) => Subscribe(element.id)} />
                        </div>
                    })
                }
            </div>
        </>
    );
}


export default SubscriptionPlansList;