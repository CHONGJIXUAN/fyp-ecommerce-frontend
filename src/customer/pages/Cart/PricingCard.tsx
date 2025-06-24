import { Divider } from '@mui/material'
import React from 'react'

const PricingCard = () => {


  return (
    <>
      <div className='space-y-3 p-5'>
          <div className='flex justify-between items-center'>
            <span>Subtotal</span>
            <span>100.00</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>Discount</span>
            <span>50</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>Shipping</span>
            <span>10.00</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>Platform Fee</span>
            <span>Free</span>
          </div>
      </div>

      <Divider />

      <div className='flex justify-between items-center p-5 text-primary'>
          <span>Total</span>
          <span>140.00</span>
      </div>
    </>
  )
}

export default PricingCard