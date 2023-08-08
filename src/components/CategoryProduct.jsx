import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CategoryProduct = () => {
  const tString = (str, wcount) => {
    const wordsArray = str.split(' ');
    if (wordsArray.length > wcount) {
      const truncatedArray = wordsArray.slice(0, wcount);
      return truncatedArray.join(' ') + '...';
    }
    return str;
  }
  const {selectedCategory}=useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
      .then(response => response.json())
      .then(data => setCategoryProducts(data));
  }, [selectedCategory]);

  return (
    <div className="maincontainer ">
    <div className="container grid-cols-2 gap-4 ">
      <h2 className="text-2xl font-semibold mb-4">Products in {selectedCategory}</h2>
      <ul>
        {categoryProducts.map(product => (
          <li key={product.id} className="mb-4 bg-gray-200 p-4">
            <div className="border p-4 rounded shadow-md">
            <div className="cimg w-32">
      <img src={product.image} alt={product.title} className="product-image" />
      </div>
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-600">${product.price}</p>
              <p>{tString((product.description),15)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default CategoryProduct;
