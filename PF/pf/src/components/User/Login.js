import React, { useState, useEffect, useContext } from 'react'
import Button from '../Button';
import Input from "../Input/Input"
import { TokenContext } from '../../contexts/TokenContext';
import { SubscriptionContext } from '../../contexts/SubscriptionContext';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../Input/PasswordInput';

const Login = () => {
    const [query, setQuery] = useState({
        username: "",
        password: "",})
    const [validate, setValidate] = useState(0)
    const { token, setToken } = useContext(TokenContext)
    const { subCxt } = useContext(SubscriptionContext)
    const [subscription, setSubscription] = useState({})

    const checkSubs = () => {
        fetch(`http://localhost:8000/payment/subscription/view/`,
        {
            method: "GET", 
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            }
        })
        .then(response => {
            if (response.ok) {
                let data = response.json();
                subCxt.subid = data.data.id;
                return data;
            }
        })
        .then(data => setSubscription(data.data))
        .then(console.log(subscription));
    }
    const navigate = useNavigate();

    useEffect( () => {
        if (validate > 0){
            let tempForm = new FormData();
            tempForm.append("username", query.username);
            tempForm.append("password", query.password);


            const requestOptions = {
                method: 'POST',
                headers: { },
                body: tempForm
            };
            fetch(`http://localhost:8000/accounts/api/token/`, requestOptions)
                .then(response=> {
                    if (response.status >= 400) throw new Error(response.status)
                    else {
                        return response.json();
                    }
                    })                    
                .then(data => {
                    console.log(data)
                    // console.log(msg);
                    //localStorage.setItem("token", JSON.stringify(data.token));              
                    setToken(data.access)
                    if (token !== null) {
                        checkSubs()                        
                    }
                    navigate('/home')                     
                    })
                .catch((error) => {
                    console.log(error)
                    alert('Login failed')         
                })
        }
    }, [validate])

    const login = () => setValidate(validate + 1)

    return (<>
        <h2>Login</h2>
        <div>
            <Input title="Username" value={query.username} update={(value)=>setQuery({...query, username: value})} />
        </div>
        <div>
            <PasswordInput title="Password" value={query.password} update={(value)=>setQuery({...query, password: value})} />
        </div>
        <div>
            <Button label='login' onClick={login}/>
        </div>

        </>)

}

export default Login