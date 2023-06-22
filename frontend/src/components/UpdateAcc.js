import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function UpdateAcc({ user, setUser, setLoggedIn }) {
  
    const navigate = useNavigate();
    const [ updatedName, setUpdatedName ] = useState({})
    const [ updated, setUpdated ] = useState(false);
    const [ toEdit, setToEdit ] = useState({});

    async function handleUpdate(userUp) {
        try {
          const response = await fetch(`http://localhost:3000/v1/api/${userUp}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: updatedName[userUp],
            }),
          });
          if (response.ok) {
            setUpdatedName({});
            setLoggedIn(false);
            alert("Successed");
          } else {
            // Todo update failed
            console.error('Todo update failed');
          }
        } catch (error) {
          // Error occurred during the request
          console.error('Error:', error);
        }
      }

    function handleEdit(userName) {
        setToEdit((prevToEdit) => ({
            ...prevToEdit,
            [userName]: true,
        }));
        setUpdatedName((prevUpdatedName) => ({
            ...prevUpdatedName,
            [userName]: user,
        }));
    }

  return (
    <div>
        {!toEdit[user] ? user : <input type="text" value={updatedName[user] || ''} onChange={(e) => setUpdatedName((prevUpdatedName) => ({ ...prevUpdatedName, [user]: e.target.value }))} />}
        <button onClick={() => handleEdit(user)}>Edit</button> <button onClick={() => handleUpdate(user)}>Update</button><Link to='/delete'><button>Delete Account</button></Link></div>
  )
}

/*
const [ reg, setReg ] = useState({
    name: '',
    date_of_birth: '',
    gender: 'Male',
    country: '',
    city: '',
    street: '',
    user_name: '',
    password: '',
    confirm_password: '',
    e_mail_address: '',
    tel_number: '',
    credit_card: '',
    cvc: '',
    expiration_date: '',
    created_at: date
  });
  */