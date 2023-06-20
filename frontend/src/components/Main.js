import { React, useState } from 'react';
import DogElements from './DogElements';

const { API_key } = require("./tokenFile");

export default function Main() {
    const [inputChange, setInputChange] = useState(``);
    const [result, setResult] = useState(null);
  
    const handleSubmitButton = ( element ) => {
      element.preventDefault();
      fetchData(`https://api.api-ninjas.com/v1/dogs?name=${inputChange}`);
    }
  
    const fetchData = async ( api ) => {
      try {
        const response = await fetch(api, {
          headers: {
            'X-Api-Key': `${API_key}`,
            'Content-Type': 'application/json'
          },
        });
        const jsonData = await response.json();
        setResult(jsonData);
      } catch (error) {
        console.log(`Error fetching Data:`, error);
      }
    };

  return (
    <div className="Main">
        <form onSubmit = { handleSubmitButton }>
            <input onChange={ e => setInputChange( e.target.value )} placeholder='Doggi name'></input>
            <button type="submit">Submit</button>
        </form>
        <div>
            <DogElements
            result = { result }
            />
        </div>
    </div>
  )
}
