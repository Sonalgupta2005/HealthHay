import React, { useEffect, useState } from 'react'
import "./styles/Signup.css"
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Toaster from "./Toaster"
import { Backdrop, CircularProgress } from '@mui/material';
import axios from 'axios';


function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const [logInStatus, setLogInStatus] =useState("");
  
  const navigate = useNavigate();


  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(data);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:5000/user/login",
        data,
        config
      );
      console.log("Login : ", response);
      setLogInStatus({ msg: "Success", key: Math.random() });
      localStorage.setItem("userData", JSON.stringify(response.data));
      navigate("/products");
      setLoading(false);
    } catch (error) {
      e.preventDefault();
      setLogInStatus({
        msg: "Invalid User name or Password",
        key: Math.random(),
      });
      console.log(error);
    }
    setLoading(false);
  };

  

    return (
        <>
        <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
        <h2>Login</h2>
        <Form className='form' onSubmit={loginHandler}>
        
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" required onChange={changeHandler} name='email'/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" required onChange={changeHandler} name='password'/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Text>Don't have an account? <a className='link' onClick={()=>navigate("/user/signup")}>Signup</a></Form.Text>
      </Form.Group>
      <button className='submit' type='submit'>Submit</button>
      {logInStatus ? (
              <Toaster key={logInStatus.key} message={logInStatus.msg} />
            ) : null}
    </Form>
        </>
        
    )
}

export default Login;
