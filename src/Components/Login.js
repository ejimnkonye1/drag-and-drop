import React, { useState } from 'react';
import '../Stylesheet/Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signInError, setSignInError] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [register, setRegister] = useState('')
  const navigate = useNavigate();

  const validateForm = () => {
    const emailValue = loginEmail.trim();
    const passwordValue = loginPassword.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
    const isEmailValid = emailPattern.test(emailValue);
    const isPasswordValid = passwordValue.length >= 8;
    setIsFormValid(isEmailValid && isPasswordValid );
    
    return isEmailValid && isPasswordValid;
  }
const handlesignin = (e) => {

    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid){

    
    signInWithEmailAndPassword(auth,loginEmail, loginPassword)
    .then((userCredential)=>{
        const user = userCredential
        console.log('Sign in suceess:', user)
       navigate('/image-gallery');

    })
    .catch((signInError)=> {
        console.error('Sign-up error:', signInError);
        setSignInError(signInError.message);
        



    })

    
}
}

const handleRegister = () => {
  navigate('/sign');
}

  return (
    <div className="app">
      <form id="login-form" onSubmit={handlesignin}>
        <div className="box">
          <h1>Login</h1>
          <div className="onyedika">
            <input
              placeholder="user@example.com"
              required
              onChange={(event) => {
                setLoginEmail(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              className='mt-3'
              required
              onChange={(event) => {
                setLoginPassword(event.target.value);
              }}
            />
            <button id="btn" className='btn btn-primary ' >Login</button>
            {signInError && <p className="error-message">{signInError}</p>}
            
            <button className='float-end btn btn-sm btn-danger'onClick={handleRegister} >Register</button>
         
         
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
