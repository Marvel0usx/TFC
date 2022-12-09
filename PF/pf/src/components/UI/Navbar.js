<<<<<<< HEAD
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
        <Link to="/logout"> Log out</Link>
        
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