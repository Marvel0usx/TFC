import React, { useState, useEffect, useContext } from 'react'
import Button from '../Button';
import Input from "../Input/Input"


const Login = () => {
    const [query, setQuery] = useState({
        username: "",
        password: "",})
    const [validate, setValidate] = useState(0)




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
            fetch(`http://localhost:8000/api/token`, requestOptions)
                .then(response=> {
                    if (response.status === 200) throw new Error(response.status)
                    else return response.json();
                    })                    
                .then(data => {
                    console.log(data)
                    var msg = JSON.stringify(data, null, 6);
                    // console.log(msg);
                    alert('Login failed' + msg)                  
                    })
                .catch((error) => {
                    console.log(error)
                    alert('Login Successful')
<<<<<<< HEAD
                    navigate('/home')            
=======
                    this.props.history.push('/api/token')               
>>>>>>> ccef999 (user comp)
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