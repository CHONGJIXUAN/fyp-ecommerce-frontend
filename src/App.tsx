import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './customer/component/navigation/Navbar';
import { ThemeProvider } from '@emotion/react';
import customTheme from './Theme/customTheme';
import Home from './customer/pages/Home/Home';

function App() {
  return (
      <ThemeProvider theme={customTheme}>
        <div>
          <Navbar />
          <Home />
        </div>
        
      </ThemeProvider>
  );
}

export default App;
