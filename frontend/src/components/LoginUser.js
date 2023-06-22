import { React, useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginUser({ loggedIn, setLoggedIn, user, setUser }) {

    const [loginUser, setLoginUser] = useState({ userName: ``, password: ``});
    const [logIn, setLogIn] = useState(``);

    const handleChange = (prop, event) => {
        const { value } = event.target;
        setLoginUser((prevReg) => ({ ...prevReg, [prop]: value }));
      }

      const handleSubmitButton = async () => {
        try {
          const query = encodeURIComponent(JSON.stringify(loginUser));
          const response = await fetch(`http://127.0.0.1:3000/v1/api/login?query=${query}`);
          const data = await response.json();
          const loginSuccess = data.success;
          
          setUser(data.user_name);
          
          if (loginSuccess) {
                setLoggedIn(true);
                localStorage.setItem('isLoggedIn', true);
                setLogIn(`Login success! Welcome back ${data.user_name}! :)`);
          } else if (!loginSuccess) {
              setLogIn(`Wrong details!`);
          }
        } catch (err) {
          console.log(err);
        }
      }

    const handleLogOut = () => {
        setLoggedIn(false);
        localStorage.setItem('isLoggedIn', false);
    }

    return (
        <div>
            <p>{ logIn }</p>
            {loggedIn ? (
                <div>
                    <Link to='/update'><button>Manage Account</button></Link><br/><br/>
                    <button onClick = { handleLogOut }>Log out</button>
                </div>
            ) : (
                <div>
                    <h4>Please type in Your</h4>
                    <form>
                        <input onChange={(event) => handleChange("userName", event)} placeholder='Username'></input> and <input onChange={(event) => handleChange("password", event)} placeholder='password' type="password"></input><h4>than press</h4>
                    </form>
                    <button onClick={handleSubmitButton}>Login</button><br/>
                    <h4>if You don't have an account</h4>
                    <h4>please advance to</h4>
                    <Link to="/register"><button>Register</button></Link>
                </div>
                )}
        </div>
    )
}
