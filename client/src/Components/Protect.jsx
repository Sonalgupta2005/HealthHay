import React from 'react'
import "./styles/Signup.css"
import { useNavigate } from 'react-router-dom'

function Protect() {
    const navigate=useNavigate();
    return (
        <div className='protect'>
        <p style={{fontSize:"2rem"}}>You are not logged in! Please Login.</p>
        <button onClick={()=>navigate("/user/login")} className='login'>Login</button>
        </div>
        
    )
}

export default Protect
