import { useContext } from "react"
import { Outlet, Link } from "react-router-dom"
import { TokenContext } from "../../contexts/TokenContext"
import { useEffect } from "react"

const Navbar = () => {
    const { token, setToken } = useContext(TokenContext)
    
    useEffect(() => {
        if (window.localStorage.getItem('token') === "null") {
            setToken(JSON.parse(window.localStorage.getItem('token')))
        }
        else {
            setToken(window.localStorage.getItem('token'))
        }
    }, [])
    
    useEffect(() => { 
        window.localStorage.setItem('token', token)
    }, [token])

    if (token) {
        return (<>
        <nav>
            <Link to="/home"> Home</Link> |
            <Link to="/account"> My Account</Link> |
            <Link to="/studios"> Studios</Link> |
            <Link to="/studios/class"> Classes</Link> |
            <Link to="/schedule"> Schedule</Link> |
            <Link to="/history"> History</Link> |
            <Link to="/subscription/plans/current">My Subscription</Link> |
            <Link to="/payment/history">My Payment</Link> |
            <Link to="/payment/cardinfo/view">Credit Card</Link> |
            <Link to="/logout"> Log out</Link>
        </nav>
        <Outlet/ >
        </>)
    }
    else {
    return (<>
        <nav>
            <Link to="/home"> Home</Link> |
            <Link to="/register"> Register</Link> |
            <Link to="/studios"> Studios</Link> |
            <Link to="/studios/class"> Classes</Link> |
            <Link to="/subscription/plans/all">Subscription Plans</Link> |
            <Link to="/login"> Log in</Link>
        </nav>
        <Outlet/ >
        </>)
    }
}

export default Navbar