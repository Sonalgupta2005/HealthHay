import React, { useEffect, useState } from 'react'
import "./styles/Product.css"
// Import all of Bootstrap's CSS
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"



function Product({product}) {
   const navigate=useNavigate();

    return (
        <motion.div whileHover={{scale:1.006}} onClick={()=>navigate(`/products/${product._id}`)} className='product'>
         <Card className='card'>
        <Card.Img className='cardImg' variant="top" src={product.image.url} />
        <Card.Body className='cardbody'>
        <Card.Text className='cardText'>
        {product.pname}
        </Card.Text>
        <Card.Text className='cardText'>
        {product.pdesc}
        </Card.Text>
        <Card.Text className='price'>
            &#8377;{product.price}
        </Card.Text>
        <Button className='cardbtn' variant="primary">Add to cart</Button>
        </Card.Body>
        </Card>
        
        </motion.div>
       
    )
}

export default Product
