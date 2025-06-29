import React from 'react'

const UserAddressCard = () => {
  return (
    <div className='p-5 border rounded-md flex'>
        <div className='space-y-3'>
            <h1>Josh</h1>
            <p className='w-[320px]'>
                1234, Street Name, City, State, Country - 123456
            </p>
            <p><strong>Mobile :</strong> 0161234567</p>
        </div>
    </div>
  )
}

export default UserAddressCard