import { useState, useEffect, useContext } from 'react'
import {Link} from 'react-router-dom'
import { SubscriptionContext } from "../../contexts/SubscriptionContext";

function ViewCardInfo() {
    const [cardInfo, setCardInfo] = useState([]);
    const { subCxt } = useContext(SubscriptionContext)
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNzI0OTg2LCJpYXQiOjE2NzA2Mzg1ODYsImp0aSI6IjY5ZWJlNmRlNGEyNjQ3ODliYTg4MjA1MzAzYzcxYWE0IiwidXNlcl9pZCI6M30.PTTUFvx73vj0YuBXCYPht35V50Ta5f5nkKJqlD9gWtc"
    
    useEffect(() => {
        fetch(`http://localhost:8000/payment/card/view/`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => setCardInfo(data.data))
        }, []
    );

    let page = null;
    console.log(cardInfo)
    if (cardInfo === undefined) {
        page = <>
            <h2>Your Wallet</h2>
            <p><em>Your wallet is empty. Please add a credit card to continue.</em></p>
            <Link to={`/payment/cardinfo/create`}><button>Add Credit Card</button></Link>
        </>
    } else {
        page = <>
            <h2>Your Wallet</h2>
            <div className="wallet">
                {
                    <div>
                        <table>
                            <tbody>
                                <tr><th>Card Number</th><td>{cardInfo.card_number}</td></tr>
                                <tr><th>Expiration Date</th><td>{cardInfo.card_expiration_date}</td></tr>
                                <tr><th>Card Holder Firstname</th><td>{cardInfo.card_holder_firstname}</td></tr>
                                <tr><th>Card Holder Lastname</th><td>{cardInfo.card_holder_lastname}</td></tr>                                
                            </tbody>
                        </table>
                        <br></br>
                        <Link to={`/payment/cardinfo/update`}><button>Update Credit Card</button></Link>
                    </div>
                }
            </div>
        </>
    }

    return (page)
}

export default ViewCardInfo;