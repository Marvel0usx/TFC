import React, { useState } from 'react';
import axios from 'axios';

function MyComponent() {
  const [data, setData] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000', data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* input fields for data here */}
      <button type="submit">Send Request</button>
    </form>
  );
}
