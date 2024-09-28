import React from 'react'
import CropFreeRoundedIcon from '@mui/icons-material/CropFreeRounded';
import Button from '@mui/material/Button';
import "./styles/Navbar.css"
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

function Navbar() {
    const navigate=useNavigate();
    return (
        <div className='navbar'>
            <div className='appName'>
            <img src="/leaf.jpeg" className='icon' />
            <h1>HealthHay</h1>
            </div>
          
          <div>
          <motion.button whileHover={{scale:1.02}} className='navbtn1' onClick={()=>navigate("/products")}>Find Products</motion.button>
          <motion.button whileHover={{scale:1.02}} className='navbtn2'>Download App</motion.button>
          </div>
          
        </div>
    )
}

export default Navbar
