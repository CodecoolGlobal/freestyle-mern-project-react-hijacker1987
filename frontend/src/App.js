import { React, useState } from 'react';
import './App.css';
import DogElements from './components/DogElements';
const { API_key } = require("./tokenFile");

function App() {
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

  console.log(result);

  return (
    <div className="App">
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
  );
}

export default App;