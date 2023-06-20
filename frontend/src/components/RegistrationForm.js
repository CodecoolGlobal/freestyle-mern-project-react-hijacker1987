import { React, useState } from 'react';

export default function RegistrationForm() {
    const [reg, setReg] = useState({
        name: '',
        dateOfBirth: '',
        gender: 'Male',
        country: '',
        city: '',
        street: '',
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        tel: '',
        creditCardNumber: '',
        cvc: '',
        expirationDate: '',
      });

    const handleChange = (event) => {
    const { name, value } = event.target;
    setReg((prevReg) => ({ ...prevReg, [name]: value }));
    };

  return (
    <div>
        Registration <br/>
        name: <input placeholder="Your Name"></input> <br/>
        date of birth: <input type="date" name="dateOfBirth" value={reg.dateOfBirth} onChange={handleChange}/> <br/>
        gender: <select>
                    <option>Male</option>
                    <option>Female</option>
                </select> <br/>
        country: <input placeholder="In which country you live"/> <br/>
        city: <input placeholder='In which city you live'/> <br/>
        street: <input placeholder='In which street you are living'/> <br/>
        username: <input placeholder='Your username to make login easier'/> <br/>
        password: <input placeholder='Password'/> <br/>
        confirm password: <input placeholder='Confirm password'/> <br/>
        e-mail: <input placeholder='user@gmail.com'/> <br/>
        tel: <input placeholder='+00-00-000-0000'/> <br/>
        credit card number: <input placeholder='0000-0000-0000-0000'/> <br/>
        cvc: <input placeholder='000'/> <br/>
        expiration date: <input placeholder='01-26'/> <br/>
    </div>
  )
}
