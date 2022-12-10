import { useContext } from "react"
import { Outlet, Link } from "react-router-dom"
import { TokenContext } from "../../contexts/TokenContext"

const Navbar = () => {
    const { token } = useContext(TokenContext)
    
    if (!token) {
    return (<>
        <nav>
            <Link to="/home"> Home</Link> |
            <Link to="/register"> Register</Link> |
            <Link to="/studios"> Studios</Link> |
            <Link to="/studios/class"> Classes</Link> |
            <Link to="/login"> Log in</Link>
        </nav>
        <Outlet/ >
        </>)
    }
    return (<>
    <nav>
        <Link to="/home"> Home</Link> |
        <Link to="/account"> My Account</Link> |
        <Link to="/studios"> Studios</Link> |
        <Link to="/studios/class"> Classes</Link> |
        <Link to="/schedule"> Schedule</Link> |
        <Link to="/history"> History</Link> |
        <Link to="/subscription/plans/all">Subscription Plans</Link> |
        <Link to="/subscription/plans/current">My Subscription</Link> |
        <Link to="/payment/history">My Payment</Link> |
        <Link to="/payment/cardinfo/view">Credit Card</Link> |
        <Link to="/logout"> Log out</Link>
    </nav>
    <Outlet/ >
    </>)
}

export default Navbar