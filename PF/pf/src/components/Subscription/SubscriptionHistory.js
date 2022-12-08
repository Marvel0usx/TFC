import Button from "../Button"
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'


function cancelSubscription() {

}


function updateSubscriprion() {
    
}


function CurrentSubscription() {
    const [subscription, setSubscription] = useState({});
    useEffect(() => {
        fetch(`https://marvel0usx-sturdy-sniffle-qv9r6x95q9f9xxv-8000.preview.app.github.dev/payment/subscription/view/`,
        {
            method: "GET", 
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => setSubscription(data.data))
            .then(console.log(subscription));
        }, []
    );

    return (
        <>
            <h2>Current Subscription</h2>
            <h3>{subscription.name}</h3>
            {subscription.is_monthly ? <p>You are billed monthly</p> : <p>You are billed yearly</p>}
            <p><strong>{subscription.price}</strong></p>
            <p>Your membership will automatically renew on {subscription.date} unless changed or cancelled. </p>
            <Button label="Change Subscription Plan" onClick={(element) => updateSubscriprion(element.id)} />
            <Button label="Cancel Subscription" onClick={cancelSubscription} />
        </>
    )
}

export default CurrentSubscription;
