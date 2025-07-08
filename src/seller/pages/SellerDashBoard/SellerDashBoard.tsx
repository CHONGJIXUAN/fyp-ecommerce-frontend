import React from 'react'
import SellerRoutes from 'Routes/SellerRoutes'
import SellerSideBar from 'seller/components/SellerSideBar/SellerSideBar'

const SellerDashBoard = () => {
  const toggleSideBar = () => {}

  return (
    <div>
        <div className='lg:flex lg:h-[90vh]'>
            <section className='hidden lg:block h-full'>
                <SellerSideBar toggleSideBar={toggleSideBar} />
            </section>
            <section className='p-10 w-full lg:w-[80%] over-y-auto'>
                <SellerRoutes />
            </section>
        </div>
    </div>
  )
}

export default SellerDashBoard