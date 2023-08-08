import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const tString = (str, wcount) => {
    const wordsArray = str.split(' ');
    if (wordsArray.length > wcount) {
      const truncatedArray = wordsArray.slice(0, wcount);
      return truncatedArray.join(' ') + '...';
    }
    return str;
  }
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="container mx-auto p-4 w-96">
      <div className="gg grid">
      <ul>
        {products.map(product => (
          <li key={product.id} className="mb-4">
            <div className="border p-4 rounded shadow-md">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-600">${product.price}</p>
              <p className="mt-2">{tString((product.description),15)}</p>
              
            </div>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default ProductList;
