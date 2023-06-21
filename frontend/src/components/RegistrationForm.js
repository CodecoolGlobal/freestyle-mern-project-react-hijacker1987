import { React, useState } from 'react';

export default function RegistrationForm() {

  const nowDate = Date.now();
  const date = new Date(nowDate);

    const [ properAge, setProperAge ] = useState(null);
    const [ showPass, setShowPass ] = useState("password");
    const [ reg, setReg ] = useState({
        name: '',
        date_of_birth: '',
        gender: '',
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

    const handleChange = (name, event) => {
      const { value } = event.target;
      setReg((prevReg) => ({ ...prevReg, [name]: value }));
    }

    const handleChangeDOB = (event) => {
      const { name, value } = event.target;
      setReg((prevReg) => ({ ...prevReg, [name]: value }));
      setProperAge(underAgeValidate(value));
    };

    const handleSubmitButton = async () => {
      if (properAge) {
        if (reg.password !== reg.confirm_password) {
          alert("Passwords do not match.");
          return;
        }

        try {
          await fetch('http://127.0.0.1:3000/v1/api/userRegister', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(reg)
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        alert("Cannot register under 18!!!")
      }
    }

  const passHandler = (e) => {
    e.preventDefault();
    setShowPass((prevState) => prevState === "password" ? "text" : "password");
  }

  return (
    <div>
      <form>
        Please give your details below <br/>
        Name: <input onChange={(event) => handleChange("name", event)} placeholder="Your Name" /> <br/>
        Date of birth: <input type="date" name="date_of_birth" value={reg.date_of_birth} onChange = { handleChangeDOB }/> <br/>
        Gender: <select onChange={(event) => handleChange("gender", event)}>
                    <option>Male</option>
                    <option>Female</option>
                </select> <br/>
        Country: <input onChange={(event) => handleChange("country", event)} placeholder="In which country you live"/> <br/>
        City: <input onChange={(event) => handleChange("city", event)} placeholder='In which city you live'/> <br/>
        Street: <input onChange={(event) => handleChange("street", event)} placeholder='In which street you are living'/> <br/>
        Username: <input onChange={(event) => handleChange("user_name", event)} placeholder='Your username to make login easier'/> <br/>
        Password: <input type={showPass} onChange={(event) => handleChange("password", event)} placeholder='Password'/><button onClick={passHandler}>Show</button> <br/>
        Confirm password: <input type={showPass} onChange={(event) => handleChange("confirm_password", event)} placeholder='Password again'/> <br/>
        E-mail: <input type="email" onChange={(event) => handleChange("e_mail_address", event)} placeholder='user@gmail.com'/> <br/>
        Tel: <input onChange={(event) => handleChange("tel_number", event)} placeholder='+00-00-000-0000'/> <br/>
        Credit card number: <input onChange={(event) => handleChange("credit_card", event)} placeholder='0000-0000-0000-0000'/> <br/>
        Cvc: <input type="password" onChange={(event) => handleChange("cvc", event)} placeholder='000'/> <br/>
        Expiration date: <input onChange={(event) => handleChange("expiration_date", event)} placeholder='01-26'/> <br/>
        <button type="Submit" onClick = { handleSubmitButton }>Submit</button>
      </form>
    </div>
  )
}

function underAgeValidate(birthday){
	// it will accept two types of format yyyy-mm-dd and yyyy/mm/dd
	let optimizedBirthday = birthday.replace(/-/g, "/");

	//set date based on birthday at 01:00:00 hours GMT+0100 (CET)
	let myBirthday = new Date(optimizedBirthday);

	// set current day on 01:00:00 hours GMT+0100 (CET)
	let currentDate = new Date().toJSON().slice(0,10) + ' 01:00:00';

	// calculate age comparing current date and borthday
	let myAge = ~~((Date.now(currentDate) - myBirthday) / (31557600000));

	if (myAge < 18) {
    return false;
  } else {
    return true;
  }
} 
