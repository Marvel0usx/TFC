import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams} from 'react-router-dom';
import Button from '../Button';
import Input from "../Input/Input"
import { TokenContext } from '../../contexts/TokenContext';
import PasswordInput from '../Input/PasswordInput';


const EditProfile = () => {
    const [selectedImageURL, setSelectedImageURL] = useState(null);
    const [selectedImage, setSelectedImage] = useState();
    const { username } = useParams();
    const { navigate } = useNavigate()
    const {token, setToken} = useContext(TokenContext)
    const [query, setQuery] = useState({
        password: "",
        password2: "",
        email: "",
        first_name: "",
        last_name: "",
        phone_number: ""})
    const [validate, setValidate] = useState(0)
    


    useEffect( () => {
        if (validate > 0){
            let tempForm = new FormData();
            tempForm.append("avatar", selectedImage);
            tempForm.append("password", query.password);
            tempForm.append("password2", query.password2);
            tempForm.append("email", query.email);
            tempForm.append("first_name", query.first_name);
            tempForm.append("last_name", query.last_name);
            tempForm.append("phone_number", query.phone_number);


            const requestOptions = {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${token}` },
                body: tempForm
            };
            fetch(`http://localhost:8000/accounts/update_profile/${username}/`, requestOptions)
                .then(response=> {
                    if (response.status < 400) throw new Error(response.status)
                    else return response.json();
                    })                    
                .then(data => {
                    console.log(data)
                    var msg = JSON.stringify(data, null, 6);
                    // console.log(msg);
                    alert('Action failed' + msg)                  
                    })
                .catch((error) => {
                    console.log(error)
                    alert('Edit Successful')
                    navigate('/home')              
                })
        }
    }, [validate])

    const editprofile = () => setValidate(validate + 1)

    return (<div className='container horizontal-center'>
        <h2>Edit Profile</h2>
        <div>
            <PasswordInput title="Password" value={query.password} update={(value)=>setQuery({...query, password: value})} />
        </div>
        <div>
            <PasswordInput title="Confirm Password" value={query.password2} update={(value)=>setQuery({...query, password2: value})} />
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
                if (event.target.files[0]){
                    setSelectedImage(event.target.files[0]);
                    var imageurl = URL.createObjectURL(event.target.files[0])
                }
                setSelectedImageURL(imageurl);
                }}
            />
        </div>
        <div>
            <Input title="Phone Number" value={query.phone_number} update={(value)=>setQuery({...query, phone_number: value})} />
        </div>
        <div>
            <Button label='Edit Profile' onClick={editprofile}/>
        </div>

        </div>)

}

export default EditProfile