import { Outlet, Link } from "react-router-dom"


const Navbar = () => {
    return (<>
    <nav>
        <div><Link to="/account">My Account</Link></div>
        <div><Link to="/studios">Studios</Link></div>
        <div><Link to="/studios/class">Classes</Link></div>
        <div><Link to="/schedule">Schedule</Link></div>
        <div><Link to="/history">History</Link></div>
        <div><Link to="/logout">Log out</Link></div>
        
    </nav>
    <Outlet/ >
    </>)
}

export default Navbar