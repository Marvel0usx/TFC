import { useState, useEffect, useContext } from 'react'
import {Link} from 'react-router-dom'
import { SubscriptionContext } from '../../contexts/SubscriptionContext' 


function CancelledSubscription() {
    const { subCxt } = useContext(SubscriptionContext)
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNzE0MjAxLCJpYXQiOjE2NzA2Mjc4MDEsImp0aSI6IjVjNjc4MGZjNjhjNzQ1MzU5NjAzMDRiMjA4NjI5ZGI0IiwidXNlcl9pZCI6M30.c9KUQ8shQq5O_H_402jeSAMDQ4pgmOyFOmPu-T1GNJ8"

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