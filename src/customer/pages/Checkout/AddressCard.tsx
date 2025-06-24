import { Radio } from '@mui/material'
import React from 'react'

const AddressCard = () => {
  const handleChange = (event: any) => {
    console.log(event.target.checked);
  };  

  return (
    <div className='p-5 border rounded-md flex'>
        <div className=''>
            <Radio 
                checked={true}
                onChange={handleChange}
                value=""
                name='radio-button'
            />
        </div>
        <div className='space-y-3 pt-3'>
            <h1>User Name</h1>
            <p className='w-[320px]'>
                1234, Street Name, City, State, Country - 123456
            </p>
            <p><strong>Mobile :</strong> 0161234567</p>
        </div>
    </div>
  )
}

export default AddressCard