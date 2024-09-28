import React from 'react'
import CropFreeRoundedIcon from '@mui/icons-material/CropFreeRounded';
import Button from '@mui/material/Button';
import "./styles/Navbar.css"
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import GetAppIcon from '@mui/icons-material/GetApp';

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
          <GetAppIcon id='getappicon'/>
          </div>
          
        </div>
    )
}

export default Navbar
