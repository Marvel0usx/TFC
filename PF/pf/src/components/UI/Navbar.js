import { useContext, Component, useState } from "react"
import { Outlet, Link } from "react-router-dom"
import { TokenContext } from "../../contexts/TokenContext"
import M from 'materialize-css'
import { useEffect, useRef } from "react"


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

    const dropDownTriggerRef1 = useRef();
    const dropDownTriggerRef2 = useRef();

    useEffect(() => {
      M.Dropdown.init(dropDownTriggerRef1.current);
    }, [])

    useEffect(() => {
      M.Dropdown.init(dropDownTriggerRef2.current);
    }, [])

    if (token) {
        return (<>
            <nav>
                <div className={"nav-wrapper"}>
                    <ul className={"right hide-on-med-and-down"}>
                        <li><Link to="/home"> Home</Link></li>
                        <li><a id="nav1" className={"dropdown-trigger"} href="#!" data-target="dropdown1" ref={dropDownTriggerRef1}>Account & Credit Card<i className={"material-icons right"}>arrow_drop_down</i></a>
                            <ul id="dropdown1" className={"dropdown-content"} style={{position: "sticky", top: 0, zIndex:100}}>
                                <li><Link to="/account"> My Account</Link></li>
                                <li><Link to="/payment/cardinfo/view">Credit Card</Link></li>
                            </ul>
                        </li>
                        <li><a id="nav2" className={"dropdown-trigger"} href="#!" data-target="dropdown2" ref={dropDownTriggerRef2}>Studios & Classes<i className={"material-icons right"}>arrow_drop_down</i></a>
                            <ul id="dropdown2" className={"dropdown-content"} style={{position: "sticky", top: 0, zIndex:100}}>
                                <li><Link to="/studios"> Studios</Link></li>
                                <li><Link to="/studios/class"> Classes</Link></li>
                                <li><Link to="/schedule"> Schedule</Link></li>
                                <li className={"divider"}></li>
                                <li><Link to="/history"> History</Link></li>
                            </ul>                                                      
                        </li>
                        <li><Link to="/subscription/plans/current">My Subscription</Link></li>
                        <li><Link to="/payment/history">My Payment</Link></li>
                        <li><Link to="/logout"> Log out</Link></li>
                    </ul>
                </div>
            </nav>
            <Outlet/ >
        </>)
    }
    else {
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
            </nav>
        </div>
        <Outlet/ >
        </>)
    }
}

export default Navbar