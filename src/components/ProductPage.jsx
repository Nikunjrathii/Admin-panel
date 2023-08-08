import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: '',
  });

  const tString = (str, wcount) => {
    const wordsArray = str.split(' ');
    if (wordsArray.length > wcount) {
      const truncatedArray = wordsArray.slice(0, wcount);
      return truncatedArray.join(' ') + '...';
    }
    return str;
  }

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
        setEditedProduct({
          title: data.title,
          price: data.price,
          description: data.description,
          image: data.image,
          category: data.category,
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setProduct(null);
      });
  }, [productId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setEditedProduct(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    fetch(`https://fakestoreapi.com/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedProduct),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Product edited:', data);
        setIsEditing(false);
        setProduct(data);
      })
      .catch(error => {
        console.error('Error editing product:', error);
      });
  };

  const handleDelete = () => {
    fetch(`https://fakestoreapi.com/products/${productId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.status === 200) {
          setIsDeleted(true);
        } else {
          throw new Error('Product deletion failed');
        }
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  if (!product) {
    return <div>Enter Product details again</div>;
  }

  return (
    <div className="product-details w-96 flex justify-center flex-col content-center mx-96">
      <div className="cimg w-64">
      {isDeleted ? null : (
    <img src={product.image} alt={product.title} className="product-image" />
  )}
      </div>
      {isDeleted ? (
        <p>Product deleted successfully</p>
      ) : isEditing ? (
        <div>
          <h2>Edit Product</h2>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={editedProduct.title}
            onChange={handleInputChange}
          />
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={editedProduct.price}
            onChange={handleInputChange}
          />
          <label>Description:</label>
          <textarea
            name="description"
            value={editedProduct.description}
            onChange={handleInputChange}
          />
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={editedProduct.image}
            onChange={handleInputChange}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <div>
          <h2 className="font-bold">{product.title}</h2>
          <p>{tString((product.description), 15)}</p>
          <p className="price font-bold">Price: ${product.price}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
