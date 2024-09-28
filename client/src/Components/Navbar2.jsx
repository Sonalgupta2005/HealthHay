import React, { useState } from 'react'
import CropFreeRoundedIcon from '@mui/icons-material/CropFreeRounded';
import "./styles/Navbar.css"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"
import MenuIcon from '@mui/icons-material/Menu';
import Toaster from './Toaster';

function Navbar2({onSearch,onCategoryChange}) {
    const navigate=useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchClick = () => {
        onSearch(searchQuery);
    };

        const isLoggedIn = !!localStorage.getItem("userData");
      
        // Function to handle logout
        const handleLogout = () => {
          localStorage.removeItem("userData");
          // Optionally, you can add more logout logic here, like redirecting the user
          window.location.reload(); // Refresh the page to update the UI
        };
      
    return (
        <div className='navbar'>
            <div className='sidebar'>
            <div className='side'>
            <MenuIcon className='menu'/>
            <ul className='dropdown'>
                    <li><a onClick={() => onCategoryChange('All')}>All</a></li>
                    <li><a onClick={() => onCategoryChange('Seeds')}>Seeds</a></li>
                    <li><a onClick={() => onCategoryChange('Fertilizers')}>Fertilizers</a></li>
                    <li><a onClick={() => onCategoryChange('Pesticides')}>Pesticides</a></li>
                    <li><a onClick={() => onCategoryChange('Equipments')}>Equipments</a></li>
                    <li><a onClick={() => onCategoryChange('Herbicides')}>Herbicides</a></li>
                    <li><a onClick={() => onCategoryChange('PGR')}>PGR</a></li>
                    <li><a onClick={() => onCategoryChange('Others')}>Others</a></li>

                </ul>
                </div>
            <div className='appName' onClick={()=>navigate("/")}>
            <img src="/leaf.jpeg" className='icon' />
            <h1>HealthHay</h1>
        </div>
            </div>
            
        <div className='search'>
            <input type='text' placeholder=' Tap to search' className='searchinput' value={searchQuery}
                onChange={handleInputChange} ></input>
            <button className='searchbtn' onClick={handleSearchClick}><SearchIcon/></button>
        </div>
      
      <div>
        {isLoggedIn?<motion.button whileHover={{scale:1.02}} className='signin' onClick={handleLogout}>Logout</motion.button> :
        <motion.button whileHover={{scale:1.02}} className='signin' onClick={()=>navigate("/user/login")}>Sign in</motion.button> }
        
      <motion.button whileHover={{scale:1.02}} className='navbtn2' onClick={()=>isLoggedIn? navigate("/products/create"): navigate("/protect") 
            }>Sell Product</motion.button>
      </div>
      
    </div>
    )
}

export default Navbar2
