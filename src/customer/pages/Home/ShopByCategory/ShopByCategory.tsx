import React from 'react'
import ShopByCategoryCard from './ShopByCategoryCard'

const ShopByCategory = () => {
  return (
    <div className='flex flex-wrap justify-between lg:px-20 gap-7'>
        {[1, 1, 1, 1, 1].map((item, index) => <ShopByCategoryCard key={index} />)}
        
    </div>
  )
}

export default ShopByCategory