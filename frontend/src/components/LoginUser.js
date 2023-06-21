import { React, useState } from 'react'

export default function LoginUser() {

    const [loginUser, setLoginUser] = useState({ userName: ``, password: ``});
    const [logIn, setLogIn] = useState(``);
    const [loggedIn, setLoggedIn] = useState(false);

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
          if (loginSuccess) {
              setLoggedIn(true);
              setLogIn(`Login success!`);
          } else if (!loginSuccess) {
              setLogIn(`Wrong details!`);
          }
        } catch (err) {
          console.log(err);
        }
      }

    const handleLogOut = () => {
        setLoggedIn(false);
    }

    return (
        <div>
            <p>{ logIn }</p>
            {loggedIn? (
                <div>
                    <button onClick = { handleLogOut }>Log out</button>
                </div>
            ) : (
                <div>
                    <form>
                        Username: <input onChange={(event) => handleChange("userName", event)} placeholder='Username'></input>
                        Password: <input onChange={(event) => handleChange("password", event)} placeholder='password'></input>
                    </form>
                    <button onClick = { handleSubmitButton }>Login</button>
                </div>

            )}
        </div>
    )
}