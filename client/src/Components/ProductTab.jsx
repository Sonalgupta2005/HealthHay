import React, { useEffect, useState } from 'react'
import Product from './Product'
import "./styles/ProductTab.css"
import Navbar2 from './Navbar2'
import Navbar3 from './Navbar3'
import Footer from './Footer'
import axios from 'axios'


function ProductTab() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/products')
            .then(response => {
                setProducts(response.data);
                setFilteredProducts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
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
