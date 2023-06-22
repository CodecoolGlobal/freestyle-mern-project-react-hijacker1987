import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function UpdateAcc({ user, setUser, setLoggedIn }) {
  
    const navigate = useNavigate();
    const [ updatedName, setUpdatedName ] = useState({})
    const [ updatedPassword, setUpdatedPassword] = useState({
      password: ``, 
      confirm_password: ``
    });
    const [ showPass, setShowPass ] = useState("password");
    const [ updated, setUpdated ] = useState(false);
    const [ edited, setEdited ] = useState(false);
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
            setUpdated(true);
            setTimeout(() => {navigate('/main'); setUpdated(false); setEdited(false)}, 5000);
          } else {
            //User update failed
            console.error('User update failed');
          }
        } catch (error) {
          //Error occurred during the request
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
        setEdited(true);
    }

    const handleChange = (prop, event) => {
      const { value } = event.target;
      setUpdatedPassword((prevReg) => ({ ...prevReg, [prop]: value }));
    }

    const passHandler = (e) => {
      e.preventDefault();
      setShowPass((prevState) => prevState === "password" ? "text" : "password");
    }

  return (
    <div>
        {!toEdit[user] ? (
            void 0
          ) : (
            <div>
              {!updated ? (
                        <div>Change Username: <input type="text" value={updatedName[user] || ''} onChange={(e) => setUpdatedName((prevUpdatedName) => ({ ...prevUpdatedName, [user]: e.target.value }))} />
                        <div>Change Password: </div><input type={showPass} onChange={(event) => handleChange("password", event)}/>
                        <div>Confirm password: </div><input type={showPass} onChange={(event) => handleChange("confirm_password", event)}/> <br/><br/> <button onClick={passHandler}>Show Password</button> <br/><br/>
                        <button onClick={() => handleUpdate(user)}>Update</button> <br/> <br/></div>
                      ) : (
                        <div>
                          <h2>Your data has been changed, please hang on!</h2>
                          <p>You will be redirected to your account page in 5 seconds...</p>
                        </div>
                      )}
            </div>
          )}
          <div>
            {!edited ? (<div><button onClick={() => handleEdit(user)}>Edit</button> <br/> <br/>
                        <Link to='/delete'><button>Delete Account</button></Link></div>
                   ) : (
                    void 0
                   )}
          </div>
    </div>
  )
}
