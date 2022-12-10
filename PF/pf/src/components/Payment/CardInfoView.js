import { useState, useEffect, useContext } from 'react'
import {Link} from 'react-router-dom'
import { SubscriptionContext } from "../../contexts/SubscriptionContext";
import { TokenContext } from '../../contexts/TokenContext';

function ViewCardInfo() {
    const [cardInfo, setCardInfo] = useState([]);
    const { subCxt } = useContext(SubscriptionContext)
    const { token, setToken } = useContext(TokenContext)

    useEffect(() => {
        if (token !== null) {
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
        }
        }, []
    );

    let page = null;
    console.log(cardInfo)
    if (token === null) {
        page = <>
        <h2>Please Login</h2>
        <Link to={"/login"}>Login</Link>
        </>
    } else if (cardInfo === undefined) {
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