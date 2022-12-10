import Button from "../Button"
import { useState, useEffect, useContext } from 'react'
import {Link, renderMatches} from 'react-router-dom'
import { SubscriptionContext } from "../../contexts/SubscriptionContext";
import { TokenContext } from '../../contexts/TokenContext';

function CurrentSubscription() {
    const [subscription, setSubscription] = useState({})
    const {subCxt} = useContext(SubscriptionContext)
    const { token, setToken } = useContext(TokenContext)

    const fetchCurrentSubscription = () => {
        if (token !== null) {
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
        }
    }
    
    useEffect(() => {
            if (token !== null) {
                fetchCurrentSubscription()                
            }
        }, []
    );
    
    let page;
    if (token === null) {
        page = <>
            <h2>Please Login</h2>
            <Link to={"/login"} className='waves-effect waves-light btn'>Login</Link>
        </>
    } else
    if (subscription.id === undefined) {
        subCxt.subid = undefined
        page = <> <div className="container">
            <h2>Current Subscription</h2>
            <p>You are not yet subscribed.</p>
            <Link to={"/subscription/plans/all"} className='waves-effect waves-light btn'> View All Subscription Plans </Link></div>
        </>
    } else {
        subCxt.subid = subscription.id
        page = <>
         <div className="container">
            <h2>Current Subscription</h2>
            {subscription.is_monthly ? <p>You are billed monthly</p> : <p>You are billed yearly for</p>}
            <h1><strong>${subscription.price}</strong></h1>
            <p>Your membership will automatically renew on <strong>{subscription.date_time.substring(0,10)}</strong> unless changed or cancelled. </p>
            <details>
                <summary>Plan details for {subscription.name} Plan</summary>
                <p>{subscription.description}</p>
            </details>
            <Link to={"/subscription/plans/all"} className='waves-effect waves-light btn' style={{margin:"2em 2em 2em 0"}}> Change Subscription </Link>
            <Link to={"/subscription/plans/cancel"} className='waves-effect waves-light btn'> Cancel Subscription </Link></div>
        </>
    }

    return (page)
}

export default CurrentSubscription;