import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './customer/component/navigation/Navbar';
import { ThemeProvider } from '@emotion/react';
import customTheme from './Theme/customTheme';
import Home from './customer/pages/Home/Home';
import Product from 'customer/pages/Product/Product';
import ProductDetails from 'customer/pages/PageDetails/ProductDetails';
import Review from 'customer/pages/Review/Review';
import Cart from 'customer/pages/Cart/Cart';
import Checkout from 'customer/pages/Checkout/Checkout';
import Account from 'customer/pages/Account/Account';
import { Route, Routes, useNavigate } from 'react-router-dom';
import BecomeSeller from 'customer/pages/Become Seller/BecomeSeller';
import SellerDashBoard from 'seller/pages/SellerDashBoard/SellerDashBoard';
import AdminDashboard from 'admin/pages/Dashboard/AdminDashboard';
import { fetchProducts } from 'State/fetchProduct';
import store, { useAppDispatch, useAppSelector } from 'State/Store';
import { fetchSellerProfile } from 'State/seller/sellerSlice';
import Auth from 'customer/pages/Auth/Auth';

function App() {
  const dispatch =  useAppDispatch();
  const {seller} = useAppSelector(store => store);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSellerProfile(localStorage.getItem("sellerJwt") || ""))
  }, [])

  useEffect(() => {
    if(seller.profile){
      navigate("/seller")
    }
  }, [seller.profile]);

  return (
      <ThemeProvider theme={customTheme}>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Auth/>} />
            <Route path="/products/:category" element={<Product/>} />
            <Route path="/reviews/:productId" element={<Review/>} />
            <Route path="/product-details/:categoryId/:name/:productId" element={<ProductDetails/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/account/*" element={<Account/>} />
            <Route path="/become-seller" element={<BecomeSeller/>} />
            <Route path="/seller/*" element={<SellerDashBoard/>} />
            <Route path="/admin/*" element={<AdminDashboard/>} />
          </Routes>
        </div>
        
      </ThemeProvider>
  );
}

export default App;
