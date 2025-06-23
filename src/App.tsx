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

function App() {
  return (
      <ThemeProvider theme={customTheme}>
        <div>
          <Navbar /> 
          {/*<Home />*/}
          {/* <Product /> */}
          {/* <ProductDetails /> */}
          {/* <Review /> */}
          <Cart />
        </div>
        
      </ThemeProvider>
  );
}

export default App;
