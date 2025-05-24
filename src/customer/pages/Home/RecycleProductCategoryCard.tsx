import React from 'react'
import RecycleImage from '../../../image/recycle.jpg'

const RecycleProductCategoryCard = () => {
  return (
    <div>
        
        <img src={RecycleImage} alt="Image" className='object-contain h-10' />
        <h2 className='font-semibold text-sm'>Recycle</h2>
        
    </div>
  )
}

export default RecycleProductCategoryCard