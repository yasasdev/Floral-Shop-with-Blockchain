import React from 'react';
import './components/Navbar/Navbar'
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import Product from './pages/Product';
import ShopCategory from './pages/ShopCategory';
import LoginSignUp from './pages/LoginSignUp';
import Cart from './pages/Cart';
import Footer from './components/Footer/Footer';

function App() {

  return (
    <div>
      <BrowserRouter>

      <Navbar />
      <Routes>
        <Route path="/" element={<Shop/>} />
        <Route path="/men" element={<ShopCategory category="men"/>} />
        <Route path="/women" element={<ShopCategory category="women"/>} />
        <Route path="/kids" element={<ShopCategory category="kid"/>} />
        <Route path="/product" element={<Product/>}>
          <Route path=":productId" element={<Product/>} />
        </Route>
        <Route path="/cart" element={<Cart/>} />
        <Route path="/login" element={<LoginSignUp/>} />
      </Routes>
      <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;
