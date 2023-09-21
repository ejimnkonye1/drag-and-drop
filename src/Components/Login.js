import React, { useState } from 'react';
import '../Stylesheet/Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signInError, setSignInError] = useState(null);
  const navigate = useNavigate();

  const login = async () => {
    try {
      setSignInError(null); // Clear any previous sign-in errors
      
      // Check if the user provided the default credentials
      if (loginEmail === 'user@example.com' && loginPassword === '1Password') {
        // Simulate a successful login without Firebase Authentication
        // You can perform additional actions or redirect the user here
        console.log("Login successful using default credentials");
        window.alert("Login successful using default credentials");
        navigate('/image-gallery');
      } else {
        // If the provided credentials are not the default, attempt Firebase login
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        // Display a success message using alert
        window.alert("Login successful!");
        console.log("Logged in user:", userCredential.user);
        navigate('/image-gallery');
      }
    } catch (error) {
      console.log(error.code, error.message);
      // Display an error message using alert
      window.alert("Login unsuccessful. Please check your email and password.");
      setSignInError(error.message); // Set the error message for display in the UI
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
              }}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(event) => {
                setLoginPassword(event.target.value);
              }}
            />
            <button id="btn" onClick={login}>Login</button>
            {signInError && <p className="error-message">{signInError}</p>}
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
