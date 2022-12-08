import { Outlet, Link } from "react-router-dom"


const Navbar = () => {
    return (<>
    <nav>
        <div><Link to="/studios">Studios</Link></div>
        <div><Link to="/studios/class">Classes</Link></div>
        <div><Link to="/subscription/plans/all">Subscription Plans</Link></div>
        <div><Link to="/subscription/plans/current">Current Subscription</Link></div>
        <div><Link to="/payment/history">Payment History</Link></div>
        <div><Link to="/payment/future">Incoming Payment</Link></div>
        <div><Link to="/payment/cardinfo">Credit Card</Link></div>
    </nav>
    <Outlet/ >
    </>)
}

export default Navbar