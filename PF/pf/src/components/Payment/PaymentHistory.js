import { useState, useEffect, useContext } from 'react'
import {Link} from 'react-router-dom'
import { SubscriptionContext } from "../../contexts/SubscriptionContext";
import { TokenContext } from '../../contexts/TokenContext';

function PaymentHistory() {
    const [histData, setHistData] = useState([])
    const [futData, setFutData] = useState([])
    const [names, setNames] = useState({})
    const { subCxt } = useContext(SubscriptionContext)
    const { token, setToken } = useContext(TokenContext)

    useEffect(() => {
        if (token !== null) {
            fetch(`http://localhost:8000/payment/history/`,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                setHistData(data.data.lst);
                setNames(data.data.names)
            })            
        }
    }, [])

    useEffect(() => {
        if (token !== null) {
            fetch(`http://localhost:8000/payment/upcoming/`,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => setFutData(data.data))                
        }
    }, [])

    console.log(histData)


    let page = null;
    if (token === null) {
        page = <>
        <h2>Please Login</h2>
        <Link to={"/login"}>Login</Link>
        </>
    } else {
        page = <>
            <h2>My Payment</h2>
            <>
                <div>
                    <h3>Upcoming Payment</h3>
                    {futData.id === undefined ? 
                    <>
                        <p>You have no upcoming payment.</p>
                    </>:
                    <><table>
                        <tbody>
                            <tr><th>Amount</th><td>${futData.amount}</td></tr>
                            <tr><th>Upcoming Payment Date</th><td>{futData.date_time.substring(0,10)}</td></tr>
                            <tr><th>Card Number</th><td>{futData.card_number}</td></tr>
                        </tbody>
                    </table>
                    </>
                    }
                </div>
                <div>
                    <h3>Payment History</h3>
                    {
                        histData.map((pay) =>
                                <div key={pay.id} style={{marginBottom: "1em"}}>
                                    <tbody>
                                        <tr><th>Amount</th><td>${pay.amount}</td></tr>
                                        <tr><th>Payment Date</th><td>{pay.date_time.substring(0,10)}</td></tr>
                                        <tr><th>Card Number</th><td>{pay.card_number}</td></tr>
                                        <tr><th>Item/Plan</th><td>{names[pay.subscription_plan_id]}</td></tr>
                                    </tbody>
                                </div>
                            )
                    }
                </div>        
            </>
        </>        
    }

    return(page)
}

export default PaymentHistory;