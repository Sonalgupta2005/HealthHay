import React from 'react'
import './styles/Navbar3.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { motion } from "framer-motion"

function Navbar3({onCategoryChange}) {
    return (
        <div className='navlist2'>
            <ul>
                <li><a onClick={() => onCategoryChange('All')}>All</a></li>
                <li><a onClick={() => onCategoryChange('Seeds')}>Seeds</a></li>
                <li><a onClick={() => onCategoryChange('Fertilizers')}>Fertilizers</a></li>
                <li><a onClick={() => onCategoryChange('Pesticides')}>Pesticides</a></li>
                <li><a onClick={() => onCategoryChange('Equpiments')}>Equipments</a></li>
                <li><a>More <ArrowDropDownIcon/></a>
                <ul className='dropdown'>
                    <li><a onClick={() => onCategoryChange('Herbicides')}>Herbicides</a></li>
                    <li><a onClick={() => onCategoryChange('PGR')}>PGR</a></li>
                    <li><a onClick={() => onCategoryChange('Others')}>Others</a></li>

                </ul>
                </li>
            </ul>
            </div>
    )
}

export default Navbar3
