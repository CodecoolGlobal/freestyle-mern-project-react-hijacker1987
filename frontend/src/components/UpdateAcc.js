import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function UpdateAcc({ user, setUser, setLoggedIn }) {
  
    const navigate = useNavigate();
    const [ updatedName, setUpdatedName ] = useState({})
    const [ updatedPassword, setUpdatedPassword] = useState({
      password: ``, 
      confirm_password: ``
    });
    const [ updated, setUpdated ] = useState(false);
    const [ toEdit, setToEdit ] = useState({});

    async function handleUpdate(userUp) {
      if (
        updatedPassword.password === updatedPassword.confirm_password &&
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])(?=.*[A-Z])[A-Za-z\d@$!%*#?&]{8,}$/.test(updatedPassword.password)
      ) {
        try {
          const response = await fetch(`http://localhost:3000/v1/api/${userUp}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_name: updatedName[userUp],
              password: updatedPassword.password,
            }),
          });
          if (response.ok) {
            setUpdatedName({});
            setLoggedIn(false);
            alert("Successed");
          } else {
            // User update failed
            console.error('User update failed');
          }
        } catch (error) {
          // Error occurred during the request
          console.error('Error:', error);
        }
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

    const handleChange = (prop, event) => {
      const { value } = event.target;
      setUpdatedPassword((prevReg) => ({ ...prevReg, [prop]: value }));
    }

    console.log(updatedPassword);

  return (
    <div>
        {!toEdit[user] ? (
          user
          ) : (
            <div>
              <div>Username change: </div><input type="text" value={updatedName[user] || ''} onChange={(e) => setUpdatedName((prevUpdatedName) => ({ ...prevUpdatedName, [user]: e.target.value }))} />
              <div>Password change: </div><input type="password" onChange={(event) => handleChange("password", event)}/>
              <div>Confirm password: </div><input type="password" onChange={(event) => handleChange("confirm_password", event)}/> <br/> <br/>
              <button onClick={() => handleUpdate(user)}>Update username: </button> <br/> <br/>
            </div>
          )}
          <div>
            <button onClick={() => handleEdit(user)}>Edit</button> <br/> <br/>
            <Link to='/delete'><button>Delete Account</button></Link>
          </div>
    </div>
  )
}

// Hahahehehihi123&
