import { useContext } from "react"
import { Outlet, Link } from "react-router-dom"
import { TokenContext } from "../../contexts/TokenContext"
import M from 'materialize-css'

const Navbar = () => {
    const { token } = useContext(TokenContext)
    
    if (!token) {
    return (<>
        <div className={"nav-wrapper"}>
        <nav>
            <ul className={"left hide-on-med-and-down"}>
                <li><Link to="/home"> Home</Link></li>
                <li><Link to="/register"> Register</Link></li>
                <li><Link to="/studios"> Studios</Link></li>
                <li><Link to="/studios/class"> Classes</Link></li>
                <li><Link to="/subscription/plans/all">Subscription Plans</Link></li>
                <li><Link to="/login"> Log in</Link></li>
            </ul>
        </nav></div>
        <Outlet/ >
        </>)
    }
    return (<>      
    <ul id="dropdown1" className={"dropdown-content"}>
        <li><Link to="/account"> My Account</Link></li>
        <li><Link to="/payment/cardinfo/view">Credit Card</Link></li>
    </ul>
    <ul id="dropdown2" className={"dropdown-content"}>
        <li><Link to="/studios"> Studios</Link></li>
        <li><Link to="/studios/class"> Classes</Link></li>
        <li><Link to="/schedule"> Schedule</Link></li>
        <li class="divider"></li>
        <li><Link to="/history"> History</Link></li>
    </ul>       
    <nav>
        <div className={"nav-wrapper"}>
            <ul className={"left hide-on-med-and-down"}>
                <li><Link to="/home"> Home</Link></li>
                <li><a className={"dropdown-trigger"} href="#!" dataTarget={"dropdown1"}>Account & Credit Card<i  className={"material-icons right"}>arrow_drop_down</i></a></li>
                <li><a className={"dropdown-trigger"} href="#!" dataTarget={"dropdown2"}>Studios & Classes<i className={"material-icons right"}>arrow_drop_down</i></a></li>
                <li><Link to="/subscription/plans/current">My Subscription</Link></li>
                <li><Link to="/payment/history">My Payment</Link></li>
                <li><Link to="/logout"> Log out</Link></li>
            </ul>
        </div>
    </nav>
    <Outlet/ >
    </>)
}

export default Navbar