import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from 'seller/pages/SellerDashBoard/Dashboard'
import Products from 'seller/pages/Products/Products'
import AddProduct from 'seller/pages/Products/AddProduct'
import Orders from 'seller/pages/Orders/Orders'
import Payment from 'seller/pages/Payment/Payment'
import Transaction from 'seller/pages/Payment/Transaction'
import Profile from 'seller/pages/Account/Profile'

const SellerRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Dashboard />}></Route>
            <Route path='/products' element={<Products />}></Route>
            <Route path='/add-product' element={<AddProduct />}></Route>
            <Route path='/orders' element={<Orders />}></Route>
            <Route path='/account' element={<Profile />}></Route>
            <Route path='/payment' element={<Payment />}></Route>
            <Route path='/transaction' element={<Transaction />}></Route>
            
        </Routes>
    </div>
  )
}

export default SellerRoutes