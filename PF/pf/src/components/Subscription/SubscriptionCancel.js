import Button from "../Button"
import { useState, useEffect, useContext } from 'react'
import {Link, renderMatches} from 'react-router-dom'
import { SubscriptionContext } from "../../contexts/SubscriptionContext"

function CancelSubscription() {
    const [subscription, setSubscription] = useState({});
    const { subCxt } = useContext(SubscriptionContext);

    let page;
    if (subCxt.subid === undefined) {
        page = <>
            <h2>Cancel Subscription</h2>
            <p>You are not yet subscribed.</p>
            <Link to={"/subscription/plans/all"}> View All Subscription Plans </Link>
        </>
    } else {
        page = <>
            <h2>Achieve 54% More PRs</h2>
            <p>Using top training features, subscribers average 54% More 
                Personal Records than athletes who don't subscribe!
            </p>
            <Link to={"/subscription/plans/all"}> Plans You Might Like </Link>
            <Link to={"/subscription/plans/cancelled"}><button>Continue to Cancel</button></Link>
        </>        
    }

    return (page)
}


export default CancelSubscription;