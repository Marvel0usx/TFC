import { useState, useEffect, useContext } from 'react'
import {Link} from 'react-router-dom'
import { SubscriptionContext } from '../../contexts/SubscriptionContext' 


function CancelledSubscription() {
    const { subCxt } = useContext(SubscriptionContext)

    useEffect(() => {
        if (subCxt.subid !== undefined) {
            fetch(`http://localhost:8000/payment/subscription/cancel/`,
            {
                method: "DELETE", 
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(data => console.log(data))
            }            
        }
    )
    let page = null
    if (subCxt.subid === undefined) {
        page = <>
            <h2>You are not subscribed yet!</h2>
            <Link to={"/subscription/plans/all"}>Check out our subscription plans</Link>
        </>
        return (page)
    } else {
        page = <>
            <h2>Cancelled</h2>
            <p> We are looking forward to your return! </p>
            <Link to={"/"}><button>Go to Home</button></Link>
        </>
    }
    return (page)
}

export default CancelledSubscription;