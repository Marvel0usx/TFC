import React, { useState, useEffect, useContext } from 'react'
import Button from '../Button';
import Input from "../Input/Input"
import { TokenContext } from '../../contexts/TokenContext';

const Login = () => {
    const [query, setQuery] = useState({
        username: "",
        password: "",})
    const [validate, setValidate] = useState(0)
    const { token, setToken } = useContext(TokenContext)




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
            fetch(`http://localhost:8000/accounts/api/token`, requestOptions)
                .then(response=> {
                    if (response.status >= 400) throw new Error(response.status)
                    else return response.data.token;
                    })                    
                .then(data => {
                    console.log(data)
                    // console.log(msg);
                    //localStorage.setItem("token", JSON.stringify(data.token));              
                    setToken(JSON.stringify(data.token))
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
            <Input title="Password" value={query.password} update={(value)=>setQuery({...query, password: value})} />
        </div>
        <div>
            <Button label='login' onClick={login}/>
        </div>

        </>)

}

export default Login