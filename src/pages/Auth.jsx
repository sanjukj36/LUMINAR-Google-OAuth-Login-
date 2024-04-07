import React, { useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import GoogleAuth from '../Components/GoogleAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../services/allAPI';

function Auth({ insideRegister }) {
  const navigate = useNavigate();
  const [userInputs, setUserInputs] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const result = await registerAPI(userInputs);
        console.log(result);
        if (result.status === 200) {
          toast.success(`Welcome ${result.data.username}... Please Login to Explore Our Website!!!`);
          setUserInputs({ username: "", email: "", password: "" });
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else {
          toast.error(result.response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault()
    if (userInputs.email && userInputs.password) {
      try {
        const result = await loginAPI(userInputs)
        console.log(result);
        if (result.status == 200) {
           
          //store existingUser and token
          sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
          sessionStorage.setItem("token", result.data.token)

          toast.success(`Welcome ${result.data.existingUser.username} ...`)
          setUserInputs({ username: "", email: "", password: "" })
          setTimeout(() => {
            navigate('/profile')
          }, 2000);
        } else {
          toast.error(result.response.data);
        }

      }
      catch (err) {
        console.log(err);
      }
    } else {
      toast.warning("Please Fill The Form Completely")
    }
  }

  const validateForm = () => {
    const { username, email, password } = userInputs;
    if (!username || !email || !password) {
      toast.warning("Please fill all fields.");
      return false;
    }

    if (username.length < 5 || password.length < 5) {
      toast.warning("Username and password must be at least 5 characters long.");
      return false;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.warning("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  return (
    <>
      <div style={{ width: '100%', height: '100vh' }} className="d-flex justify-content-center align-items-center">
        <div className="container w-75">
          <div className="card shadow">
            <div className="row align-items-center">
              <h1 className='d-flex align-text-center'><strong><span style={{ color: "red" }}>Google</span> <span style={{ color: "yellow" }}>Login</span> <span style={{ color: "green" }}>SignUp</span> <span style={{ color: "blue" }}>Project</span> </strong></h1>
              <div className="col-lg-6">
                <img className='w-100' src="https://img.freepik.com/free-vector/login-concept-illustration_114360-4525.jpg" alt="Auth" />
              </div>
              <div className="col-lg-6 mt-2">
                <h5 className='fw-bolder mt-2'>Sign{insideRegister ? "Up" : "In"} To Your Account</h5>
                <Form>
                  {insideRegister &&
                    <FloatingLabel
                      controlId="floatingInputName"
                      label="Username"
                      className="mb-3"
                    >
                      <Form.Control value={userInputs.username} onChange={e => setUserInputs({ ...userInputs, username: e.target.value })} type="text" placeholder="username" />
                    </FloatingLabel>
                  }
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                  >
                    <Form.Control value={userInputs.email} onChange={e => setUserInputs({ ...userInputs, email: e.target.value })} type="email" placeholder="name@example.com" />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control value={userInputs.password} onChange={e => setUserInputs({ ...userInputs, password: e.target.value })} type="password" placeholder="Password" />
                  </FloatingLabel>
                  {
                    insideRegister ?
                      <div className='mt-3'>
                        <button onClick={handleRegister} className='btn btn-primary mb-2'>Register</button>
                        <p>Already Have an Account? Click Here to <Link className='text-info' to={'/login'}>Login</Link></p>
                        <p>Or</p>
                        <div className='ms-5 mb-3'>
                          <GoogleAuth />
                        </div>
                      </div>
                      :
                      <div className='mt-3'>
                        <button onClick={handleLogin} className='btn btn-primary mb-3'>Login</button>
                        <p>Or</p>
                        <div className='ms-5 mb-3'>
                          <GoogleAuth />
                        </div>
                        <p>New User? Click Here to <Link className='text-info' to={'/register'}>Register</Link></p>
                      </div>
                  }
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </>
  );
}

export default Auth;
