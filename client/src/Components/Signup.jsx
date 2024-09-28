import React, { useState,useEffect } from 'react'
import "./styles/Signup.css"
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Backdrop, CircularProgress } from '@mui/material';
import Toaster from './Toaster.jsx'

function Signup() {
  const [signInStatus, setSignInStatus] = useState("");
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      console.log("Sending data",data)
        const response = await axios.post(
          "http://localhost:5000/user/signup",
          data,config
        );
        console.log(response);
     
      setSignInStatus({ msg: "Success", key: Math.random() });
      
      localStorage.setItem("userData", JSON.stringify(response.data));
      setLoading(false);
      navigate("/products");
    } catch (error) {
      console.log(error);
      if (error.response.status === 405) {
        setSignInStatus({
          msg: "User with this email ID already Exists",
          key: Math.random(),
        });
      }
      if (error.response.status === 406) {
        setSignInStatus({
          msg: "User Name already Taken, Please take another one",
          key: Math.random(),
        });
      }
      setLoading(false);
      
    }
  };
    return (
      
        <>
        <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
        <h2>Create your Account</h2>
        <Form className='form' onSubmit={signUpHandler}>
        
      <Form.Group className="mb-3" controlId="formBasicUsername" >
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Username" required onChange={changeHandler} name='username'/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" required onChange={changeHandler} name='email' />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" required onChange={changeHandler} name='password'/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Text>Already have an account. <a className='link' onClick={()=>navigate("/user/login")}>Login</a></Form.Text>
      </Form.Group>
      <button className='submit' type='submit'>Submit</button>
      {signInStatus ? (
              <Toaster key={signInStatus.key} message={signInStatus.msg} />
            ) : null}
    </Form>
        </>
        
    );
}

export default Signup;
