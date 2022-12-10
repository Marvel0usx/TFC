<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
=======
import React, { useState, useEffect, useContext } from 'react'
>>>>>>> bfff3e5 (signup)
import Button from '../Button';
import Input from "../Input/Input"


<<<<<<< HEAD
const Signup = () => {
    const [selectedImageURL, setSelectedImageURL] = useState(null);
    const [selectedImage, setSelectedImage] = useState();
=======

const Signup = () => {
    const [selectedImageURL, setSelectedImageURL] = useState(null);
>>>>>>> bfff3e5 (signup)
    const [query, setQuery] = useState({
        username: "",
        password: "",
        password2: "",
        email: "",
<<<<<<< HEAD
        first_name: "",
        last_name: "",
        phone_number: ""})
    const navigate = useNavigate();
    const [validate, setValidate] = useState(0)
=======
        // first_name: "",
        // last_name: "",
        avatar: "",
        phone_number: ""})
    const [validate, setValidate] = useState(false)
>>>>>>> bfff3e5 (signup)




    useEffect( () => {
<<<<<<< HEAD
        if (validate > 0){
            let tempForm = new FormData();
            tempForm.append("avatar", selectedImage);
            tempForm.append("username", query.username);
            tempForm.append("password", query.password);
            tempForm.append("password2", query.password2);
            tempForm.append("email", query.email);
            tempForm.append("first_name", query.first_name);
            tempForm.append("last_name", query.last_name);
            tempForm.append("phone_number", query.phone_number);


            const requestOptions = {
                method: 'POST',
                headers: { },
                body: tempForm
            };
            fetch(`http://localhost:8000/accounts/register/`, requestOptions)
                .then(response=> {
                    if (response.status === 201) throw new Error(response.status)
                    else return response.json();
                    })                    
                .then(data => {
                    console.log(data)
                    var msg = JSON.stringify(data, null, 6);
                    // console.log(msg);
                    alert('Signup failed' + msg)                  
                    })
                .catch((error) => {
                    console.log(error)
                    alert('Signup Successful')
                    navigate('/api/token')               
                })
        }
    }, [validate])
=======
        setValidate(false)
        console.log(query)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            content: JSON.stringify({ query })
        };
        fetch(`http://localhost:8000/accounts/register/`, requestOptions)
            .then(response=>response.json())
            .then(response => {
                if(response.status === 200){
                    alert('Signup Successful')
                    console.log('Success:', response);
                    this.props.history.push('/login')
                }
                else{
                    var msg = JSON.stringify(response, null, 6);
                    console.log(msg);
                    alert('Signup failed' + msg)
                }
            })
    }, [])
>>>>>>> bfff3e5 (signup)


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
        {/* <div>
            <Input title="First Name" value={query.first_name} update={(value)=>setQuery({...query, first_name: value})} />
        </div>
        <div>
            <Input title="Last Name" value={query.last_name} update={(value)=>setQuery({...query, last_name: value})} />
<<<<<<< HEAD
        </div>       
=======
        </div> */}       
>>>>>>> bfff3e5 (signup)
        <div>
            <label for="myImage">Avatar</label>
            {selectedImageURL && (
                <div>
                <img alt="not fount" width={"150px"} src={selectedImageURL} />
                <br />
                <button onClick={()=>setSelectedImageURL(null)}>Remove</button>
                </div>
            )}
            <br />
            
            <br /> 
            <input
                type="file"
                name="myImage"
                onChange={(event) => {
<<<<<<< HEAD
                if (event.target.files[0]){
                    setSelectedImage(event.target.files[0]);
                    var imageurl = URL.createObjectURL(event.target.files[0])
=======
                console.log(event.target.files[0]);
                if (event.target.files[0]){
                    var imageurl = URL.createObjectURL(event.target.files[0])
                    setQuery({...query, avatar: imageurl})
>>>>>>> bfff3e5 (signup)
                }
                setSelectedImageURL(imageurl);
                }}
            />
        </div>
        <div>
            <Input title="Phone Number" value={query.phone_number} update={(value)=>setQuery({...query, phone_number: value})} />
        </div>
        <div>
            <Button label='Register' onClick={setValidate(true)}/>
        </div>

        </>)

}

export default Signup