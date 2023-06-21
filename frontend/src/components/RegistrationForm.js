import { React, useState } from 'react';

export default function RegistrationForm() {
    const [ isUnderAge, setIsUnderAge ] = useState(null);
    const [ reg, setReg ] = useState({
        name: '',
        dateOfBirth: '',
        gender: 'Male',
        country: '',
        city: '',
        street: '',
        userName: '',
        password: '',
        confirmPassword: '',
        email: '',
        tel: '',
        creditCardNumber: '',
        cvc: '',
        expirationDate: '',
      });

    const handleChange = (name, event) => {
      const { value } = event.target;
      setReg((prevReg) => ({ ...prevReg, [name]: value }));
    }

    const handleChangeDOB = (event) => {
      const { name, value } = event.target;
      setReg((prevReg) => ({ ...prevReg, [name]: value }));
      setIsUnderAge(underAgeValidate(value));
    };

    const handleSubmitButton = async () => {
      if (isUnderAge) {
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

  return (
    <div>
      <form>
        Registration <br/>
        name: <input onChange={(event) => handleChange("name", event)} placeholder="Your Name" />
        date of birth: <input type="date" name="dateOfBirth" value={reg.dateOfBirth} onChange = { handleChangeDOB }/> <br/>
        gender: <select onChange={(event) => handleChange("gender", event)}>
                    <option>Male</option>
                    <option>Female</option>
                </select> <br/>
        country: <input onChange={(event) => handleChange("country", event)} placeholder="In which country you live"/> <br/>
        city: <input onChange={(event) => handleChange("city", event)} placeholder='In which city you live'/> <br/>
        street: <input onChange={(event) => handleChange("street", event)} placeholder='In which street you are living'/> <br/>
        username: <input onChange={(event) => handleChange("userName", event)} placeholder='Your username to make login easier'/> <br/>
        password: <input onChange={(event) => handleChange("password", event)} placeholder='Password'/> <br/>
        confirm password: <input onChange={(event) => handleChange("confirmPassword", event)} placeholder='Confirm password'/> <br/>
        e-mail: <input onChange={(event) => handleChange("email", event)} placeholder='user@gmail.com'/> <br/>
        tel: <input onChange={(event) => handleChange("tel", event)} placeholder='+00-00-000-0000'/> <br/>
        credit card number: <input onChange={(event) => handleChange("creditCardNumber", event)} placeholder='0000-0000-0000-0000'/> <br/>
        cvc: <input onChange={(event) => handleChange("cvc", event)} placeholder='000'/> <br/>
        expiration date: <input onChange={(event) => handleChange("expirationDate", event)} placeholder='01-26'/> <br/>
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
