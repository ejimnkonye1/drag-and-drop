
import React, { useState } from 'react';
import '../Stylesheet/Login.css'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../Firebase';




function LoginPage(){
  
const [loginEmail, setLoginEmail] = useState("");
const [loginPassword, setLoginPassword] = useState("");

const login = async () => {
try {
const user = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
console.log(user)
} catch (error) {
  console.log(error.message);
}
};
return (
  <div className="app">
<form id="login-form">
  <div className="box">
        <h1>Login</h1>
        <div className="onyedika">
    <input
          
          placeholder="Email"
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }
        }
          
        />
        <input
        
          placeholder="Password"
          
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }
        }
        />
        </div>
        <button id="btn" onClick={login}>Login</button>
        {auth.currentUser}
      </div>
      </form>
      </div>
);
}

export default LoginPage;