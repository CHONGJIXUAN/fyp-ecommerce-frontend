import React from 'react';
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
import { Route, Routes } from 'react-router-dom';
import BecomeSeller from 'customer/pages/Become Seller/BecomeSeller';

function App() {
  return (
      <ThemeProvider theme={customTheme}>
        <div>
          {/*<Home />*/}
          {/* <Product /> */}
          {/* <ProductDetails /> */}
          {/* <Review /> */}
          {/* <Cart /> */}
          {/* <Checkout /> */}
          {/* <Account /> */}
          <Navbar />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/products/:category" element={<Product/>} />
            <Route path="/reviews/:productId" element={<Review/>} />
            <Route path="/product-details/:categoryId/:name/:productId" element={<ProductDetails/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/account/*" element={<Account/>} />
            <Route path="/become-seller" element={<BecomeSeller/>} />
          </Routes>
        </div>
        
      </ThemeProvider>
  );
}

export default App;
