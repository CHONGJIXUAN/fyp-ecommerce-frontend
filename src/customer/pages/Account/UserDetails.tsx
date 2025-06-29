import { Divider } from '@mui/material'
import ProfileFieldCard from 'component/ProfileFieldCard'
import React from 'react'

const UserDetails = () => {
  return (
    <div className='flex justify-center py-10'>
        <div className='w-full lg:w-[70%]'>
            <div className='flex items-center pb-3 justify-between'>
                <h1 className='text-2xl font-bold text-gray-600'>Personal Details</h1>

            </div>
            <div className=''>
                <ProfileFieldCard keys='Name' value={"Josh"} />
                <Divider />
                <ProfileFieldCard keys='Email' value={"Josh@gmail.com"} />
                <Divider />
                <ProfileFieldCard keys='Mobile' value='0161234567' />
            </div>
        </div>
    </div>
  )
}

export default UserDetails