import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function DeleteAcc({ user, setUser, setLoggedIn }) {
  const navigate = useNavigate();
  const [ deleted, setDeleted ] = useState(false);

  const handleDeleteButton = async (event) => {
    event.preventDefault();
    try {
      const username = user;
      const response = await fetch(`http://localhost:3000/v1/api/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      if (response.ok) {
        //Delete request successful
        setUser(null);
        setDeleted(true);
        setLoggedIn(false);
        setTimeout(() => {navigate('/main'); setDeleted(false)}, 5000);
      } else {
        //Delete request failed
        alert("Couldn't Delete anything...");
      }
    } catch (error) {
      console.log('Error fetching Data:', error);
    }
  };

  return (
    <div>
        {!deleted ? (<div>Are you sure?
      <Link to="/main"><button>Not sure!</button></Link> <button onClick = { handleDeleteButton }>Yep!!!</button></div>
        ) : (
          <div>
            <h2>We will miss you!!!</h2>
            <p>You will be redirected to your account page in 5 seconds...</p>
          </div>
        )}
    </div>
  );
}
