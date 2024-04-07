import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'


function GoogleAuth() {
  const navigate = useNavigate()

  const [userProfile, setUserProfile] = useState(null);

  // Function to clear user session
  const logout = () => {
    // Clear user session data (e.g., authentication tokens)
    sessionStorage.removeItem('existingUser');
    sessionStorage.removeItem('token');

    // Redirect to login page
    window.location.href = '/login'; // Change '/login' to the actual URL of your login page
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
    console.log(credentialResponseDecoded);

    // Assuming credentialResponseDecoded contains necessary user information
    const { name, email, picture } = credentialResponseDecoded;

    // Store user details in sessionStorage
    sessionStorage.setItem("existingUser", JSON.stringify({ username: name, email, picture }));

    // Set userProfile state
    setUserProfile({ name, email, picture });

    setTimeout(() => {
      navigate('/profile')
    }, 2000);

    // Display welcome toast
    toast.success(`Welcome ${name} ...`);
  };

  const handleGoogleLoginError = () => {
    console.log('Login Failed');
  };

  return (
    <div className='ms-4'>
      
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginError}
        />
    </div>
  );
}

export default GoogleAuth;
