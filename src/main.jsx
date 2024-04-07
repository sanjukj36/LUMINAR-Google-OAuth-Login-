import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';



import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId="807328116476-hmlt891ali8mmecq6o7ehtrih2fju0qv.apps.googleusercontent.com">
      <App />  
    </GoogleOAuthProvider>
    
    </BrowserRouter>
   
    
  </React.StrictMode>,
)
