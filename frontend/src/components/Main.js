import React, { useState } from 'react';
import './Main.css';
import DogElements from './DogElements';
import Favourite from './Favourite';

const { API_key } = require("./tokenFile");

export default function Main() {
  const [inputChange, setInputChange] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmitButton = (event) => {
    event.preventDefault();
    fetchData(`https://api.api-ninjas.com/v1/dogs?name=${inputChange}`);
  };

  const fetchData = async (api) => {
    try {
      const response = await fetch(api, {
        headers: {
          'X-Api-Key': API_key,
          'Content-Type': 'application/json',
        },
      });
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
        <DogElements result={result} />
      </div>
    </div>
  );
}
