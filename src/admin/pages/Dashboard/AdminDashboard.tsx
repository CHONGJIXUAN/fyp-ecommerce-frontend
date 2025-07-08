import AdminSidebar from 'admin/components/AdminSidebar'
import React from 'react'
import AdminRoutes from 'Routes/AdminRoutes'

const AdminDashboard = () => {
  const toggleSideBar = () => {}

  return (
    <div>
        <div className='lg:flex lg:h-[90vh]'>
            <section className='hidden lg:block h-full'>
                <AdminSidebar toggleSideBar={toggleSideBar} />
            </section>
            <section className='p-10 w-full lg:w-[80%] over-y-auto'>
                <AdminRoutes />
            </section>
        </div>
    </div>
  )
}

export default AdminDashboard