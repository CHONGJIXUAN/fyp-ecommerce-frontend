import AddNewCouponForm from 'admin/pages/Coupon/AddNewCouponForm'
import Coupon from 'admin/pages/Coupon/Coupon'
import SellersTable from 'admin/pages/Sellers/SellersTable'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Deal from 'admin/pages/HomePage/Deal'
import HomeCategoryTable from 'admin/pages/HomePage/HomeCategoryTable'

const AdminRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<SellersTable/>}></Route>
            <Route path='/coupon' element={<Coupon />}></Route>
            <Route path='/add-coupon' element={<AddNewCouponForm />}></Route>
            {/* <Route path='/sellers-table' element={<SellersTable />}></Route> */}
            <Route path='/home-grid' element={<HomeCategoryTable/>}></Route>
            {/* <Route path='/electronics-category' element={<ElectronicTable />}></Route>
            <Route path='/shop-by-category' element={<ShopByCategoryTable />}></Route> */}
            <Route path='/deals' element={<Deal />}></Route>
        </Routes>
    </div>
  )
}

export default AdminRoutes