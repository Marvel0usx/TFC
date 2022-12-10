import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { SubscriptionContext } from '../../contexts/SubscriptionContext' 
import { useParams } from 'react-router-dom'
import { TokenContext } from '../../contexts/TokenContext';
import M from 'materialize-css';

function UpdateSubscription() {
    const { subCxt } = useContext(SubscriptionContext)
    const [data, setData] = useState({})
    const { subsID } = useParams()
    const { token, setToken } = useContext(TokenContext)
 
    let page = null;

    useEffect(() => {
        if (subCxt.subid !== undefined && subCxt.subid !== subsID && token !== null) {
            fetch(`http://localhost:8000/payment/subscription/edit/`,
                {
                    method: "PUT", 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({'data':{
                        "subscription_plan_id": `${subsID}`
                    }})
                })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.log('Network response was not ok.');
                    }
                    })
                .then((data) => {
                    console.log(data);
                    setData(data);
                })
                .catch(function(error) {
                    console.log('There has been a problem with your fetch operation: ' + error.message);
                })
        }}
    )

    if (token === null) {
        page = <>
            <h2>Please Login</h2>
            <Link to={"/login"} className='waves-effect waves-light btn'>Login</Link>
        </>
    } else
    if (data.success === undefined) {
        page = <>
            <h2>404 Not Found</h2>
            <p>There has been a problem with your fetch operation</p>
            <Link to={"/"} className='waves-effect waves-light btn'>Go to Home</Link>
        </>
    } else {
        subCxt.subid = subsID
        page = <>
            <h2> You Are Updated! </h2>
            <p> {data.success} </p>
            <p> Life is always about changes! Have fun working out 🙌 </p>
            <div>
                <h3>New Subscription Details</h3>
                <ul>
                    <li>Subscription plan: {data.name}</li>
                    <li>Payment has been successfully made to your credit card <em>{data.card_number}</em></li>
                    <li>Amount: ${data.price}</li>
                    <li>Your incoming payment will be at {data.next_payment.substring(0,10)}</li>
                </ul>
            </div>
        </>
    }
    return (page)
}

export default UpdateSubscription;