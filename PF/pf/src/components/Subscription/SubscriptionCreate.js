import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { SubscriptionContext } from '../../contexts/SubscriptionContext' 


function CreateSubscription() {
    const { subCxt } = useContext(SubscriptionContext)
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNzE0MjAxLCJpYXQiOjE2NzA2Mjc4MDEsImp0aSI6IjVjNjc4MGZjNjhjNzQ1MzU5NjAzMDRiMjA4NjI5ZGI0IiwidXNlcl9pZCI6M30.c9KUQ8shQq5O_H_402jeSAMDQ4pgmOyFOmPu-T1GNJ8"
    const [data, setData] = useState({})
    
    let page = null;

    useEffect(() => {
        console.log(subCxt.subid)
        if (subCxt.subid === undefined) {
            fetch(`http://localhost:8000/payment/subscription/subscribe/`,
                {
                    method: "POST", 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        "subscription_plan_id": `${subCxt.intend_subid}`
                    }
                })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.log('Network response was not ok.');
                    }
                    })
                .then((data) => {
                    console.log(data.data);
                    setData(data.data);
                })
                .catch(function(error) {
                    console.log('There has been a problem with your fetch operation: ' + error.message);
                })
            } else {
                return <>
                    <h2> You Are Already Subscribed </h2>
                    <Link to={"subscription/plans/current"}>View Your Subscription Plan</Link>
                </>
            }
        }
    )

    if (data.success === undefined) {
        page = <>
            <h2>404 Not Found</h2>
            <p>There has been a problem with your fetch operation</p>
            <Link to={"/"}><button>Go to Home</button></Link>
        </>
    } else {
        subCxt.subid = subCxt.intend_subid
        page = <>
            <h2> You Are Subscribed! </h2>
            <p> We are looking forward to seeing you in the studios 😊 </p>
            <div>
                <h3>Subscription Details</h3>
                <ul>
                    <li>Subscription plan: {data.name}</li>
                    <li>Payment has been successfully made to your credit card <em>{data.card_number}</em></li>
                    <li>Amount: ${data.price}</li>
                    <li>Your incoming payment will be at {data.next_payment}</li>
                </ul>
            </div>
        </>
    }
    return (page)
}

export default CreateSubscription;