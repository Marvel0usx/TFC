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
        page = <> <div className="container">
        <h2>Please Login</h2>
        <Link to={"/login"} className='waves-effect waves-light btn'>Login</Link></div>
        </>
    } else if (cardInfo === undefined) {
        page = <> <div className="container">
            <h2>Your Wallet</h2>
            <p><em>Your wallet is empty. Please add a credit card to continue.</em></p>
            <Link to={`/payment/cardinfo/create`} className='waves-effect waves-light btn'>Add Credit Card</Link></div>
        </>
    } else {
        page = <> <div className="container">
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
                        <Link to={`/payment/cardinfo/update`} className='waves-effect waves-light btn'>Update Credit Card</Link>
                    </div>
                }
            </div></div>
        </>
    }

    return (page)
}

export default ViewCardInfo;