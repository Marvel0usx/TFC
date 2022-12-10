import { useState, useEffect, useContext } from 'react'
import {Link} from 'react-router-dom'
import { SubscriptionContext } from '../../contexts/SubscriptionContext' 
import { TokenContext } from '../../contexts/TokenContext';
    
function CancelledSubscription() {
    const { subCxt } = useContext(SubscriptionContext)
    const { token, setToken } = useContext(TokenContext)
    
    useEffect(() => {
        if (subCxt.subid !== undefined || token !== null) {
            fetch(`http://localhost:8000/payment/subscription/cancel/`,
            {
                method: "DELETE", 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.ok) {
                    subCxt.subid = undefined;
                    return response.json()
                } else {
                    return <>404</>
                }
                })
            .then(data => console.log(data))
            .catch((reason) => {
                console.log(`error at cancallation: ${reason}`)
            })
            }            
        }
    )
    let page = null
    if (token === null) {
        page = <>
         <div className="container">
            <h2>Please Login</h2>
            <Link to={"/login"}>Login</Link></div>
        </>
    } else
    if (subCxt.subid === undefined) {
        page = <>
         <div className="container">
            <h2>You are not subscribed yet!</h2>
            <Link to={"/subscription/plans/all"}>Check out our subscription plans</Link></div>
        </>
        return (page)
    } else {
        page = <>
         <div className="container">
            <h2>Cancelled</h2>
            <p> We are looking forward to your return! </p>
            <Link to={"/"}><button>Go to Home</button></Link></div>
        </>
    }
    return (page)
}

export default CancelledSubscription;