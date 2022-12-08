import Button from "../Button"
import { useState, useEffect } from 'react'
import {Link, renderMatches} from 'react-router-dom'

function CancelSubscription() {
    return (
        <>
            <h2>Achieve 54% More PRs</h2>
            <p>Using top training features, subscribers average 54% More 
                Personal Records than athletes who don't subscribe!
            </p>
            <Link to={"/subscription/plans/all"}> Plans You Might Like </Link>
            <Link to={"/subscription/plans/cancelled"}><button>Continue to Cancel</button></Link>
        </>
    )
}


export default CancelSubscription;