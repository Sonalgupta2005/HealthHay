import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress } from '@mui/material';



function Create() {

    const [product, setProduct] = useState({ pname:"",pdesc:"",image:null,price:"",category:"",product_link:""});
    const [loading, setLoading] = useState(false);

    const userData = JSON.parse(localStorage.getItem("userData"));
    // console.log("Data from LocalStorage : ", userData);
    const navigate = useNavigate();
    if (!userData) {
      console.log("User not Authenticated");
      navigate("/user/login");}

    const changeHandler = (e) => {
        const { name, value, files } = e.target;
        
        if (name === 'image') {
          setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: files[0], // Set the first selected file
          }));
        } else {
          setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
          }));
        }};

        const createProduct=async(e)=>{
            setLoading(true);
            e.preventDefault();
            const formData = new FormData();
            formData.append('image', product.image);
            try {
                const config = {
                  headers: {
                    Authorization: `Bearer ${userData.token}`,
                    'Content-Type': 'multipart/form-data',
                  },
                };
          
                const response = await axios.post(
                  "http://localhost:5000/products",
                  product,config
                );navigate("/products");
                setLoading(false);
              }
                catch (error) {
                    console.log(error);
                }

        }
    return (
        <>
        <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
        <h2 style={{marginTop:"3rem",marginBottom:"2rem"}}>Sell your Product</h2>
        <Form className='form'onSubmit={createProduct}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Product Name</Form.Label>
        <Form.Control type="text" placeholder="Product name" required name='pname' onChange={changeHandler} value={product.pname}/>
      </Form.Group>
        
        <FloatingLabel label="Product Description">
        <Form.Control
          as="textarea"
          placeholder="Give a detailed description of your product"
          style={{ height: '100px' }}
          name='pdesc'
          onChange={changeHandler}
          value={product.pdesc}
          required
        />
      </FloatingLabel>
      <div className="mb-3">
                <Form.Label >Upload Listing Image</Form.Label>
                <Form.Control type="file" name="image" onChange={changeHandler}></Form.Control>
            </div>
      <Form.Group className="mb-3 group">
        <div>
        <Form.Label>Price</Form.Label>
        <Form.Control type="text" placeholder="Price" className='price2' required name='price' value={product.price} onChange={changeHandler} />
        </div>
        
        <div className="mb-3 category">
                <Form.Label>Select Product Category</Form.Label>
                <select className="form-select form-control" name="category" value={product.category.toString()} onChange={changeHandler} required >
                    <option >Category</option>
                    <option value="Seeds">Seeds</option>
                    <option value="Fertilizers">Fertilizers</option>
                    <option value="Equipments">Equipments</option>
                    <option value="Pesticides">Pesticides</option>
                    <option value="Herbicides">Herbicides</option>
                    <option value="PGR">PGR</option>
                    <option value="Others">Others</option>
                  </select>
            </div>
      </Form.Group>
      <Form.Group className="mb-3" >
      <Form.Label>Product link</Form.Label>
      <Form.Control type="text" placeholder="Any external link you want to provide for the product" name='product_link' value={product.product_link} onChange={changeHandler}/>
      </Form.Group>
      
      <button className='submit' type='submit'>Create</button>
      </Form>
      </>
    )
}

export default Create
