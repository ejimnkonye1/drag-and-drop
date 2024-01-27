import React, { useState } from 'react';
import '../Stylesheet/Login.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import LoginPage from './Login';
function SignPage() {
  const [signEmail, setSignEmail] = useState("");
  const [signPassword, setSignPassword] = useState("");
  const [error, setError] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const emailValue = signEmail.trim();
    const passwordValue = signPassword.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
    const isEmailValid = emailPattern.test(emailValue);
    const isPasswordValid = passwordValue.length >= 8;
    setIsFormValid(isEmailValid && isPasswordValid );
    
    return isEmailValid && isPasswordValid;
  }
const handlesignup = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid){

    
    createUserWithEmailAndPassword(auth,signEmail, signPassword)
    .then((userCredential)=>{
        const user = userCredential
        console.log('Login successful:', user)
        setSignupSuccess(true);

    })
    .catch((signupError)=> {
        console.error('Sign-up error:', signupError);
        setError(signupError.message);
        setSignupSuccess(false);



    })

    
}
}
if (signupSuccess) {
    // Render the Login component directly
    return <LoginPage/>;
  }
  return (
    <div className="app">
      <form id="login-form" onSubmit={handlesignup}>
        <div className="box">
          <h1>Register</h1>
          <div className="onyedika">
            <input
              placeholder="email"
             
              onChange={(event) => {
                setSignEmail(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              className='mt-3'
              
              onChange={(event) => {
                setSignPassword(event.target.value);
              }}
            />
            <button id="btn" type='submit' className='btn btn-primary ' >Register</button>
           

          </div>
        </div>
      </form>
    </div>
  );
}

export default SignPage;
