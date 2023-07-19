import React, { useState } from 'react';
import DogElements from './DogElements';

import './design/Main.css';

export default function Main({ loggedIn, id, loginUser }) {
  const [inputChange, setInputChange] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmitButton = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/v1/api/data?name=${inputChange}`);
      const jsonData = await response.json();
      setResult(jsonData);
    } catch (error) {
      console.log('Error fetching Data:', error);
    }
  };

  return (
    <div className="Main">
      <form className="search-form" onSubmit={handleSubmitButton}>
        <input
          className="search-input"
          onChange={(e) => setInputChange(e.target.value)}
          placeholder="Doggi name"
        />
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
      <div>
        <DogElements loggedIn = { loggedIn } result = { result } id = { id } loginUser = { loginUser }/>
      </div>
    </div>
  );
}
