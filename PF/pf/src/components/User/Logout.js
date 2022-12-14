import React, { useState, useEffect, useContext } from 'react'
import Button from '../Button';
import { TokenContext } from '../../contexts/TokenContext'
import { useNavigate } from 'react-router-dom';
import { SubscriptionContext } from '../../contexts/SubscriptionContext';

const Logout = () => {
    const { token, setToken } = useContext(TokenContext)
    const [validate, setValidate] = useState(0)
    const navigate = useNavigate()
    const { subCxt } = useContext(SubscriptionContext)

    useEffect( () => {
        if (validate > 0){
            const requestOptions = {
                method: 'POST',
                headers: {  'Authorization': `Bearer ${token}` },
            };
            fetch(`http://localhost:8000/accounts/logout/`, requestOptions)
                .then(response=> {
                    if (response.status > 400) throw new Error(response.status)
                    else return response;
                    })                    
                .then(data => {
                    console.log(data)
                    // console.log(msg);
                    setToken(null)
                    subCxt.subid = undefined
                    navigate('/home')
                    window.localStorage.setItem('token', null)                     
                    })
                .catch((error) => {
                    console.log(token)
                    console.log(error)
                    alert('Logout Unauthorized')         
                })
        }
    }, [validate])

    const logout = () => setValidate(validate + 1)

    return (<>
        <h2>Logout</h2>
        <div>
            <Button label='logout' onClick={logout}/>
        </div>

        </>)
}

export default Logout