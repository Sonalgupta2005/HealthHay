import React, { useEffect, useState } from 'react'
import "./styles/Show.css"
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import DeleteIcon from '@mui/icons-material/Delete';
function Show() {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(response.data);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const isLoggedin=localStorage.getItem("userData");
  
  const isOwner=isLoggedin && ((product.owner)==(userData._id));
  // const deletehandler = async (e) => {
  //   try {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${userData.token}`,
  //       },
  //     };
  //     const response = await axios.delete(`http://localhost:5000/products/${id}`,config);
  //     window.location.href = '/products';
  //     navigate("/products");
  //   } catch (err) {
  //     e.preventDefault();
  //     console.log(err);
  //   }
  // };
    return (
        <>
        <Navbar/>
        <div className='show'>
            <img className='pimg' src={product.image?.url}></img>
            <div className='pinfo'>
            <h4>{product.pname}&nbsp;{isOwner?<DeleteIcon className='delete' onClick={()=>navigate(`/delete/${product._id}`)} />:<></>}</h4>
            <p className='pdesc'>{product.pdesc}</p>
            <h6>&#8377;{product.price}</h6>
            <button className='addbtn'>Add to cart</button>
            <button className='paybtn'>Buy now</button>
            </div>
            
        </div>
        </>
    )
}

export default Show
