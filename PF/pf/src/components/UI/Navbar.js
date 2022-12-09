<<<<<<< HEAD
import { Outlet, Link } from "react-router-dom"


const Navbar = () => {
    return (<>
    <nav>
        <div><Link to="/home">Home</Link> </div>
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

=======
import { Outlet, Link } from "react-router-dom"


const Navbar = () => {
    return (<>
    <nav>
        <div><Link to="/studios">Studios</Link></div>
        <div><Link to="/studios/class">Classes</Link></div>
        <div><Link to="/accounts/register">Accounts</Link></div>
    </nav>
    <Outlet/ >
    </>)
}

>>>>>>> refs/rewritten/onto
export default Navbar