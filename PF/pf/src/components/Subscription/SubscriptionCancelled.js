import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'


function CancelledSubscription() {
    useEffect(() => {
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

    )

    return (
        <>
            <h2>Cancelled</h2>
            <p> We are looking forward to your return! </p>
            <Link to={"/"}><button>Go to Home</button></Link>
        </>
    )
}

export default CancelledSubscription;