import React from 'react'

const DealCard = () => {
  return (
    <div className='w-[13rem] cursor-pointer'>
        <img className='border-x-[7px] border-t-[7px] border-pink-600 w-full h-[12rem] object-cover object-top' 
        src="https://www.everki.com/media/amasty/blog/Screen_Shot_0005-09-22_at_17.30.39_1.png" alt="" />
        <div className='border-4 border-black bg-black text-white p-2 text-center'>
            <p className='text-lg font-semibold'>Sustainable Backpacks</p>
            <p className='text-2xl font-bold'>20% OFF</p>
            <p className='text-balance text-lg'>SHOP NOW</p>
        </div>
    </div>
  )
}

export default DealCard