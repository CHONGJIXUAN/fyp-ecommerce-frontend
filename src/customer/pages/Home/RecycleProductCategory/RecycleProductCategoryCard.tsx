import React from 'react'
import { HomeCategory } from 'types/HomeCategoryTypes'

const RecycleProductCategoryCard = ({item}:{item:HomeCategory}) => {
  return (
    <div className='flex flex-col gap-2 justify-center'>
        
        <img src={item.image}
            alt="Image" className='object-contain h-10' />
        <h2 className='font-semibold text-sm'>{item.name}</h2>
        
    </div>
  )
}

export default RecycleProductCategoryCard