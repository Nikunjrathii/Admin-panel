import React, { useState } from 'react';

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');

  const handleAddProduct = () => {
    const newProduct = {
      title,
      price: parseFloat(price),
      description,
      image, 
      category
    };

    fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('New product added:', data);
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });
  };
  const handleClose = () => {

    setTitle('');
    setPrice('');
    setDescription('');
    setImage('');
    setCategory('');
  };
  return (
    <div className="border p-4 rounded shadow-md">
        
      <h2 className="text-lg font-semibold mb-2">Add Product</h2>
      <label className="block mb-2">Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded px-2 py-1 mb-2 w-full"
        required
      />
      <label className="block mb-2">Price:</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border rounded px-2 py-1 mb-2 w-full"
        required
      />
      <label className="block mb-2">Description:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border rounded px-2 py-1 mb-4 w-full"
        rows="4"
        required
      />
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="border rounded px-2 py-1 mb-4 w-full"
        required
        placeholder='image link here'
      />
      <label className="block mb-2">Category:</label>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded px-2 py-1 mb-2 w-full"
        required
      />
      <div className="but flex flex-row">
      <button
        type="button"
        onClick={handleAddProduct}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Product
      </button>
      <button
        className=" text-gray-500 hover:text-red-500 flex flex-col mx-6 font-bold my-2"
        onClick={handleClose}
      >
        Clear
      </button>
      </div>
    </div>
  );
};

export default AddProduct;
