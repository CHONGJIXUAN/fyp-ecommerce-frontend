import AddNewCouponForm from 'admin/pages/Coupon/AddNewCouponForm'
import Coupon from 'admin/pages/Coupon/Coupon'
import SellersTable from 'admin/pages/Sellers/SellersTable'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import GridTable from 'admin/pages/HomePage/GridTable'
import ElectronicTable from 'admin/pages/HomePage/ElectronicTable'
import ShopByCategory from 'customer/pages/Home/ShopByCategory/ShopByCategory'
import Deal from 'admin/pages/HomePage/Deal'

const AdminRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<SellersTable/>}></Route>
            <Route path='/coupon' element={<Coupon />}></Route>
            <Route path='/add-coupon' element={<AddNewCouponForm />}></Route>
            <Route path='/home-grid' element={<GridTable />}></Route>
            <Route path='/electronics-category' element={<ElectronicTable />}></Route>
            <Route path='/shop-by-category' element={<ShopByCategory />}></Route>
            <Route path='/deals' element={<Deal />}></Route>
        </Routes>
    </div>
  )
}

export default AdminRoutes