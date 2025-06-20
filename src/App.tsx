import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './customer/component/navigation/Navbar';
import { ThemeProvider } from '@emotion/react';
import customTheme from './Theme/customTheme';
import Home from './customer/pages/Home/Home';
import Product from 'customer/pages/Product/Product';
import ProductDetails from 'customer/pages/PageDetails/PageDetails';

function App() {
  return (
      <ThemeProvider theme={customTheme}>
        <div>
          <Navbar /> 
          {/*<Home />*/}
          {/* <Product /> */}
          <ProductDetails />
        </div>
        
      </ThemeProvider>
  );
}

export default App;
