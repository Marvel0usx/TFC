<<<<<<< HEAD
import { Outlet, Link } from "react-router-dom"


const Navbar = () => {
    return (<>
    <nav>
        <div><Link to="/studios">Studios</Link></div>
        <div><Link to="/studios/class">Classes</Link></div>
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