import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function DeleteProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate a delete request
    fetch(`http://localhost:5000/products/${id}`, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          navigate('/products');
        } else {
          console.error('Failed to delete the product');
        }
      })
      .catch(error => console.error('Error:', error));
  }, [id, navigate]);

  return <div>Deleting product...</div>;
}

export default DeleteProduct;
