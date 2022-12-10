import Button from "../Button"
import { useState, useEffect, useContext } from 'react'
import {Link, renderMatches} from 'react-router-dom'
import { SubscriptionContext } from "../../contexts/SubscriptionContext";


function CurrentSubscription() {
    const [subscription, setSubscription] = useState({})
    const {subCxt} = useContext(SubscriptionContext)
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNzI0MzYwLCJpYXQiOjE2NzA2Mzc5NjAsImp0aSI6Ijk4NzBmOGZlYWUyNDRmMDI5YjQ4MjRkZWEzZmFkOWNjIiwidXNlcl9pZCI6M30.TiV7L1SFE3rvrVRCS-Llj0HL5FctB2NEP2gq1R104pE"
    useEffect(() => {
        fetch(`http://localhost:8000/payment/subscription/view/`,
        {
            method: "GET", 
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            }
        })
            .then(response => response.json())
            .then(data => setSubscription(data.data))
            .then(console.log(subscription));
        }, []
    );
    if (subCxt.subid !== undefined) {
        return <>test failed</>
    }
    
    let page;
    if (subscription.id === undefined) {
        page = <>
            <h2>Current Subscription</h2>
            <p>You are not yet subscribed.</p>
            <Link to={"/subscription/plans/all"}> View All Subscription Plans </Link>
        </>
    } else {
        subCxt.subid = subscription.id
        page = <>
            <h2>Current Subscription</h2>
            {subscription.is_monthly ? <p>You are billed monthly</p> : <p>You are billed yearly</p>}
            <p><strong>{subscription.price}</strong></p>
            <p>Your membership will automatically renew on {subscription.date} unless changed or cancelled. </p>
            <Link to={"/subscription/plans/all"}> Change Subscription </Link>
            <Link to={"/subscription/plans/cancel"}> Cancel Subscription </Link>
        </>
    }

    return (page)
}

export default CurrentSubscription;