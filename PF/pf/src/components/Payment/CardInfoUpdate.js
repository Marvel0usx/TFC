import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { SubscriptionContext } from '../../contexts/SubscriptionContext' 
import { useParams } from 'react-router-dom'

function UpdateCardInfo() {
  const [inputs, setInputs] = useState({});
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNzI0OTg2LCJpYXQiOjE2NzA2Mzg1ODYsImp0aSI6IjY5ZWJlNmRlNGEyNjQ3ODliYTg4MjA1MzAzYzcxYWE0IiwidXNlcl9pZCI6M30.PTTUFvx73vj0YuBXCYPht35V50Ta5f5nkKJqlD9gWtc"
  const [ res, setRes ] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);

    fetch(`http://localhost:8000/payment/card/edit/`,
    {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({'data':inputs})
    })
    .then((response) => response.json())
    .then((data) => {
        setRes(data)
    })
    .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        
    })
  }

  console.log(res)

  let page = null;
  if (res.success === undefined) {
    page = <>
        <form onSubmit={handleSubmit}>
        <h2>My Wallet</h2>
        <h3>Update Credit Card Information</h3>
        <label>Card Number
      <input 
        type="text" 
        name="card_number" 
        value={inputs.card_number || ""} 
        onChange={handleChange}
        required
      /><p style={{color:"red", fontSize:"0.8em"}}>{res.card_number}</p><br></br>
      </label>
      <label>Expiration Date
        <input 
          type="date" 
          name="card_expiration_date" 
          value={inputs.card_expiration_date || ""} 
          onChange={handleChange}
          required
        />
        </label><p style={{color:"red", fontSize:"0.8em"}}>{res.card_expiration_date}</p><br></br>
      <label>First Name
        <input 
          type="text" 
          name="card_holder_firstname" 
          value={inputs.card_holder_firstname || ""} 
          onChange={handleChange}
          required
        />
        </label><p style={{color:"red", fontSize:"0.8em"}}>{res.card_holder_firstname}</p><br></br>
      <label>Last Name
        <input 
          type="text" 
          name="card_holder_lastname" 
          value={inputs.card_holder_lastname || ""} 
          onChange={handleChange}
          required
        />
        </label><p style={{color:"red", fontSize:"0.8em"}}>{res.card_holder_lastname}</p><br></br>
        <input type="submit" />
    </form>
    </>
  } else {
    page = <>
        <h2>My Wallet</h2>
        <h3>{res.success}</h3>
        <quote>At TFC, we are committed to protecting your privacy. We collect and use your personal information only for the purposes of providing you with the services and products you have requested. We will not share your personal information with any third parties without your consent, except as required by law. We have implemented appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. If you have any questions about our privacy practices, please contact us at admin@TFC.com</quote>
    </>
  }

  return (page)
}

export default UpdateCardInfo;