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
<<<<<<< HEAD
        <div><Link to="/accounts/register">Accounts</Link></div>
=======
>>>>>>> c9c0b7f (rebase from main)
    </nav>
    <Outlet/ >
    </>)
}

<<<<<<< HEAD
>>>>>>> refs/rewritten/onto
=======
>>>>>>> 9ac344e (rebase from main)
>>>>>>> c9c0b7f (rebase from main)
export default Navbar