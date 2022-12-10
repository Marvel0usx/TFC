import { useState, useEffect, useContext } from 'react'
import {Link} from 'react-router-dom'
import { SubscriptionContext } from '../../contexts/SubscriptionContext' 


function CancelledSubscription() {
    const { subCxt } = useContext(SubscriptionContext)
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNzI0MzYwLCJpYXQiOjE2NzA2Mzc5NjAsImp0aSI6Ijk4NzBmOGZlYWUyNDRmMDI5YjQ4MjRkZWEzZmFkOWNjIiwidXNlcl9pZCI6M30.TiV7L1SFE3rvrVRCS-Llj0HL5FctB2NEP2gq1R104pE"

    useEffect(() => {
        if (subCxt.subid !== undefined) {
            fetch(`http://localhost:8000/payment/subscription/cancel/`,
            {
                method: "DELETE", 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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