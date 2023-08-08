import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";

import ProductDetails from "./ProductDetails";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const [isProductListVisible, setIsProductListVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
//   console.log(setSearchResult);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    navigate(`/category/${category}`);
  };
  const handleOnClick =()=>{
    navigate('/addproduct');
  }
  const handleOnClickAdd =()=>{
    navigate('/user');
  }
  const handleSearch = () => {
    const searchNumber = parseInt(searchQuery);
    if (!isNaN(searchNumber)) {
      navigate(`/product/${searchNumber}`);
    }
  };

  return (
    <nav className="p-5 bg-blue-300">
      <div className="flex items-center justify-between">
        <Link className="text-white font-bold text-xl" to={'/'}>Admin Panel</Link>
        <div className="flex items-center space-x-7">   
            <button className="text-white"onClick={handleOnClickAdd}>All Users</button>
            <button className="text-white"onClick={handleOnClick}>Add product</button>
          <div
            className="relative group"
            onMouseEnter={() => setIsProductListVisible(true)}
            onMouseLeave={() => setIsProductListVisible(false)}
          >
            <button className="text-white hover:text-neutral-950">
              Product List
            </button>
            
            {isProductListVisible && (
              <div className="absolute bg-white border rounded shadow-md mt-2 p-2">
                <ProductList />
              </div>
            )}
          </div>
          <div className="relative">
            <select
              className="border rounded px-2 py-1 focus:outline-none"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <input
              type="text"
              className="border rounded px-2 py-1 focus:outline-none"
              placeholder="Search products"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {searchResult && <ProductDetails product={searchResult} />}
          </div>
        </div>
      </div>
      <div className="ccontain bg-white">
        {/* {selectedCategory && (
          <CategoryProducts selectedCategory={selectedCategory} />
          )} */}
      </div>
    </nav>
  );
};

export default Navbar;
