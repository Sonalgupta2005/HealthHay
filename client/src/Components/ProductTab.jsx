import React, { useEffect, useState } from 'react'
import Product from './Product'
import "./styles/ProductTab.css"
import Navbar2 from './Navbar2'
import Navbar3 from './Navbar3'
import Footer from './Footer'
import axios from 'axios'
import { Backdrop, CircularProgress } from '@mui/material'


function ProductTab() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('https://healthhay-server.onrender.com/products')
            .then(response => {
                setProducts(response.data);
                setFilteredProducts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
        setLoading(false);
    }, []);

    useEffect(() => {
        filterProducts();
    }, [selectedCategory, searchQuery]);
    
    const filterProducts = () => {
        let filtered = products;
        if(selectedCategory==='All'){
            filtered=products;
        }

        if (selectedCategory !== 'All') {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        if (searchQuery) {
            filtered = filtered.filter(product => product.pname.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        setFilteredProducts(filtered);};

    return (
        <>
        <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
        <div className='body'>
        <Navbar2 onSearch={setSearchQuery} onCategoryChange={setSelectedCategory}/>
        <Navbar3 onCategoryChange={setSelectedCategory} />
        <div className="protab">
                {filteredProducts.map(product => (
                    <Product key={product._id} product={product} />
                ))}
            </div>
        </div>
        <Footer/>
        
        </>
        
       
    )
}

export default ProductTab
