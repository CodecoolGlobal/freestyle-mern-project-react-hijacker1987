import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegistrationForm() {
  const navigate = useNavigate();
  const nowDate = Date.now();
  const date = new Date(nowDate);

  const [ properAge, setProperAge ] = useState(null);
  const [ showPass, setShowPass ] = useState("password");
  const [ error, setError ] = useState(null);
  const [ submitted, setSubmitted ] = useState(false);

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
    // cvc: '',
    expiration_date: '',
    created_at: date
  });

  const handleChange = (name, event) => {
    const { value } = event.target;
    setError(null);

    if (name === "e_mail_address") {
      if (!/\S+@\S+\.\S{2,}/.test(value)) {
        setError("Invalid email address.");
        return;
      }
    }

    if (name === "tel_number") {
      const formattedTelNumber = formatPhoneNumber(value);
  
      setReg((prevReg) => ({
        ...prevReg,
        tel_number: formattedTelNumber,
      }));
    } else if (name === "credit_card") {
      const formattedValue = value
        .replace(/\D/g, '')                //Remove all non-digit characters
        .slice(0, 16)                      //Limit the input to 16 digits
        .replace(/(\d{4})(?=\d)/g, '$1-'); //Add a hyphen after every 4 digits

      setReg((prevReg) => ({
        ...prevReg,
        credit_card: formattedValue,
      }));
    } else if (name === "expiration_date") {
      if (value.length === 4) {
        const month = Number(value.slice(0, 2));
        const year = Number(value.slice(2, 4));
  
        if (month < 0 || month > 12) {
          setError("Invalid month in expiration date.");
          return;
        }
  
        //Get the current month and year
        const currentMonth = date.getMonth() + 1;                    //Adding 1 because getMonth() returns zero-based index
        const currentYear = date.getFullYear().toString().slice(-2); //Get the last two digits of the current year
  
        //Convert the expiration date to a number for comparison
        const expirationDate = year * 100 + month;
  
        if (expirationDate < currentYear * 100 + currentMonth) {
          setError("Credit card expired.");
          return;
        }
  
        setReg((prevReg) => ({
          ...prevReg,
          expiration_date: `${month}-${year}`,
        }));
      } else {
        setReg((prevReg) => ({ ...prevReg, [name]: value }));
      }
    } else {
      setReg((prevReg) => ({ ...prevReg, [name]: value }));
    }
  
    if (!properAge) {
      setError("Cannot register under 18!!!");
      return;
    }
    
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])(?=.*[A-Z])[A-Za-z\d@$!%*#?&]{8,}$/.test(reg.password)) {
      setError("Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 special character, and 1 number.");
      return;
    }

    if (reg.password !== reg.confirm_password) {
      setError("Passwords do not match.");
      return;
    }
  
    // if (reg.cvc.length !== 3 || !/^\d+$/.test(reg.cvc)) {
    //   setError("CVC has improper type or length.");
    //   return;
    // }
  
    if (reg.expiration_date.length !== 5 || !/^\d{2}-\d{2}$/.test(reg.expiration_date)) {
      setError("Expiration date has improper type or length");
      return;
    }

    if (reg.credit_card.length !== 19 || !/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(reg.credit_card)) {
      setError("Credit card has improper type or length");
      return;
    }
      
    if (
      reg.name.length === 0 ||
      reg.date_of_birth === '' ||
      reg.country.length === 0 ||
      reg.city.length === 0 ||
      reg.street.length === 0 ||
      reg.user_name.length === 0
    ) {
      setError("All input fields must be filled.");
      return;
    }
  };
  
const formatPhoneNumber = (phoneNumber) => {
  const cleaned = phoneNumber.replace(/\D/g, ""); //Remove all non-digit characters

  //Format the telephone number
  const countryCode = cleaned.substring(0, 2);
  const areaCode = cleaned.substring(2, 4);
  const firstPart = cleaned.substring(4, 7);
  const secondPart = cleaned.substring(7, 11);

  return `+${countryCode}-(${areaCode})-${firstPart}-${secondPart}`;
};

  const handleChangeDOB = (event) => {
    const { name, value } = event.target;
    setReg((prevReg) => ({ ...prevReg, [name]: value }));
    setProperAge(underAgeValidate(value));
  };

  const handleSubmitButton = async (event) => {
    event.preventDefault();
    
    if (error) {
      return;
    }
    
    try {
      await fetch('http://127.0.0.1:3000/v1/api/userRegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reg),
      });
      setSubmitted(true);
    } catch (err) {
      console.log(err);
    }
    
    //Redirect to /account after a delay of 5 seconds
    setTimeout(() => {navigate('/account')}, 5000);
  };

  const passHandler = (e) => {
    e.preventDefault();
    setShowPass((prevState) => prevState === "password" ? "text" : "password");
  }

  return (
    <div>
      {!submitted ? (
                  <form>
                    Please give your details below { error }<br/>
                    Name: <input onChange={(event) => handleChange("name", event)} placeholder="Your Name" /> <br/>
                    Date of birth: <input type="date" name="date_of_birth" value={reg.date_of_birth} onChange = { handleChangeDOB }/> <br/>
                    Gender: <select onChange={(event) => handleChange("gender", event)}>
                                <option>Male</option>
                                <option>Female</option>
                            </select> <br/>
                    Country: <input onChange={(event) => handleChange("country", event)} placeholder="In which country you live"/> <br/>
                    City: <input onChange={(event) => handleChange("city", event)} placeholder='In which city you live'/> <br/>
                    Street: <input onChange={(event) => handleChange("street", event)} placeholder='Add street and houseno'/> <br/>
                    Username: <input onChange={(event) => handleChange("user_name", event)} placeholder='Your username to make login easier'/> <br/>
                    Password: <input type={showPass} onChange={(event) => handleChange("password", event)} placeholder='Password'/> <br/>
                    Confirm password: <input type={showPass} onChange={(event) => handleChange("confirm_password", event)} placeholder='Password again'/> <button onClick={passHandler}>Show</button> <br/>
                    E-mail: <input type="email" onChange={(event) => handleChange("e_mail_address", event)} placeholder='username@provider.co'/> <br/>
                    Tel: <input name="tel_number" value={reg.tel_number} onChange={(event) => handleChange("tel_number", event)} placeholder='+00-(00)-000-0000'/> <br/>
                    Credit card number: <input value={reg.credit_card} onChange={(event) => handleChange("credit_card", event)} placeholder='0000-0000-0000-0000'/> <br/>
                    {/* Cvc: <input type="password" onChange={(event) => handleChange("cvc", event)} placeholder='000'/> <br/> */}
                    Expiration date: <input name="expiration_date" value={reg.expiration_date} onChange={(event) => handleChange("expiration_date", event)} placeholder="01-26"/> <br/>
                    <button type="Submit" onClick = { handleSubmitButton }>Submit</button>
                  </form>
                ) : (
                  <div>
                    <h2>Thank you for Your registration!</h2>
                    <p>You will be redirected to your account page in 5 seconds...</p>
                  </div>
                )}
              </div>
            );
}

function underAgeValidate(birthday){
	//it will accept two types of format yyyy-mm-dd and yyyy/mm/dd
	let optimizedBirthday = birthday.replace(/-/g, "/");

	//set date based on birthday at 01:00:00 hours GMT+0100 (CET)
	let myBirthday = new Date(optimizedBirthday);

	//set current day on 01:00:00 hours GMT+0100 (CET)
	let currentDate = new Date().toJSON().slice(0,10) + ' 01:00:00';

	//calculate age comparing current date and borthday
	let myAge = ~~((Date.now(currentDate) - myBirthday) / (31557600000));

	if (myAge < 18) {
    return false;
  } else {
    return true;
  }
} 
