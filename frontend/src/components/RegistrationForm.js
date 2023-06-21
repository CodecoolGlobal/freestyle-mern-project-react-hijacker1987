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

    const handleChange = (name, event) => {
      const { value } = event.target;
      setReg((prevReg) => ({ ...prevReg, [name]: value }));
    }

    const handleChangeDOB = (event) => {
      const { name, value } = event.target;
    setReg((prevReg) => ({ ...prevReg, [name]: value }));
    };

    console.log(reg);

  return (
    <div>
        Registration <br/>
        name: <input onChange={(event) => handleChange("name", event)} placeholder="Your Name" />
        date of birth: <input type="date" name="dateOfBirth" value={reg.dateOfBirth} onChange = { handleChangeDOB }/> <br/>
        gender: <select>
                    <option>Male</option>
                    <option>Female</option>
                </select> <br/>
        country: <input onChange={(event) => handleChange("country", event)} placeholder="In which country you live"/> <br/>
        city: <input onChange={(event) => handleChange("ciry", event)} placeholder='In which city you live'/> <br/>
        street: <input onChange={(event) => handleChange("street", event)} placeholder='In which street you are living'/> <br/>
        username: <input onChange={(event) => handleChange("username", event)} placeholder='Your username to make login easier'/> <br/>
        password: <input onChange={(event) => handleChange("password", event)} placeholder='Password'/> <br/>
        confirm password: <input onChange={(event) => handleChange("confirmPassword", event)} placeholder='Confirm password'/> <br/>
        e-mail: <input onChange={(event) => handleChange("email", event)} placeholder='user@gmail.com'/> <br/>
        tel: <input onChange={(event) => handleChange("tel", event)} placeholder='+00-00-000-0000'/> <br/>
        credit card number: <input onChange={(event) => handleChange("creditCardNumber", event)} placeholder='0000-0000-0000-0000'/> <br/>
        cvc: <input onChange={(event) => handleChange("cvc", event)} placeholder='000'/> <br/>
        expiration date: <input onChange={(event) => handleChange("expirationDate", event)} placeholder='01-26'/> <br/>
    </div>
  )
}
