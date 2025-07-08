import React from 'react'

const AdminDashboard = () => {
  return (
    <div>
        <div className='lg:flex lg:h-[90vh]'>
            <section className='hidden lg:block h-full'>
                {/* <SellerSideBar toggleSideBar={toggleSideBar} /> */}
            </section>
            <section className='p-10 w-full lg:w-[80%] over-y-auto'>
                {/* <SellerRoutes /> */}
            </section>
        </div>
    </div>
  )
}

export default AdminDashboard