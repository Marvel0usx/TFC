import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom';
import { LocationContext } from '../../contexts/LocationContext';
import Button from '../Button';
import Input from "../Input/Input"

const Signup = () => {
    const URL = ''
    const [query, setQuery] = useState({
        username: "",
        password: "",
        password2: "",
        email: "",
        first_name: "",
        last_name: "",
        avatar: "",
        phone_number: ""})
        const [accounts, setAccounts] = useState([])
        const [validate, setValidate] = useState(0)

    useEffect( () => {
        fetch(`http://localhost:8000/accounts/register`)
            .then(response=>response.json())
            .then(data => setAccounts(data.results))
            .then(console.log(accounts))
    }, [validate])

    const register = () => setValidate(validate + 1)

    return (<>
        <h2>Sign Up</h2>
        <div>
            <Input title="Username" value={query.username} update={(value)=>setQuery({...query, username: value})} />
        </div>
        <div>
            <Input title="Password" value={query.password} update={(value)=>setQuery({...query, password: value})} />
        </div>
        <div>
            <Input title="Confirm Password" value={query.password2} update={(value)=>setQuery({...query, password2: value})} />
        </div>
        <div>
            <Input title="Email" value={query.email} update={(value)=>setQuery({...query, email: value})} />
        </div>
        <div>
            <Input title="First Name" value={query.first_name} update={(value)=>setQuery({...query, first_name: value})} />
        </div>
        <div>
            <Input title="Last Name" value={query.last_name} update={(value)=>setQuery({...query, last_name: value})} />
        </div>
        <div>
            <Input title="Avatar" type="file" value={query.avatar} update={(value)=>setQuery({...query, last_name: value})} />
        </div>
        <div>
            <Input title="Phone Number" value={query.phone_number} update={(value)=>setQuery({...query, phone_number: value})} />
        </div>
        <div>
            <Button label='Register' onClick={register}/>
        </div>

        </>)

}

export default Signup