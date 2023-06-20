import { React, useState, useEffect } from 'react';
import './App.css';

function App() {

  const [inputChange, setInputChange] = useState(``);
  const [result, setResult] = useState(``);

  const apiUrl = `http://localhost:3000/v1/api/animals?name=${inputChange}`;

  console.log(inputChange);

  const handleSubmitButton = async () => {
    try {
      const fetchData = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!fetchData) {
        alert(`ERROR!!!!!!!!!!!FOUR!`);
      }
      const data = await fetchData.json();
      setResult(data);
    } catch (err) {
      console.log(err);
      alert(`fjnsaijhfbsao`)
    }
  }

  console.log(result);

  return (
    <div className="App">
      <form onSubmit={handleSubmitButton}>
        <input onChange={e => setInputChange(e.target.value)} placeholder='Doggi name'></input>
        <button type="submit">Submit</button>
      </form>
      <div>
        { result? (
          <h1>
            { result.name }
          </h1>
          ) : (
            `nincs`
            )}
      </div>
    </div>
  );
}

export default App;