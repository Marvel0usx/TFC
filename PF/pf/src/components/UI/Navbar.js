import { Outlet, Link } from "react-router-dom"


const Navbar = () => {
    return (<>
    <nav>
        <Link to="/home"> Home</Link> |
        <Link to="/account"> My Account</Link> |
        <Link to="/studios"> Studios</Link> |
        <Link to="/studios/class"> Classes</Link> |
        <Link to="/schedule"> Schedule</Link> |
        <Link to="/history"> History</Link> |
        <Link to="/subscription/plans/all">Subscription Plans</Link> |
        <Link to="/subscription/plans/current">Current Subscription</Link> |
        <Link to="/payment/history">Payment History</Link> |
        <Link to="/payment/future">Incoming Payment</Link> |
        <Link to="/payment/cardinfo">Credit Card</Link> |
        <Link to="/logout"> Log out</Link>
    </nav>
    <Outlet/ >
    </>)
}

export default Navbar