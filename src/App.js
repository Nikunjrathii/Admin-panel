// import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";

import ProductPage from "./components/ProductPage";
import CategoryProduct from "./components/CategoryProduct";
import AddProduct from "./components/AddProduct";
import UserList from "./components/UserList";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route
          path="/category/:selectedCategory"
          element={<CategoryProduct />}
        />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/user" element={<UserList />} />
      </Routes>
      ]
    </BrowserRouter>
  );
}

export default App;
