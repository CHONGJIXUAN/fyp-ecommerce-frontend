import React from 'react'
import RecycleProductCategoryCard from './RecycleProductCategoryCard'

const RecycleProductCategory = () => {
  return (
    <div className='flex flex-wrap justify-between py-5 lg:px-20 border-b'>
        {[1, 1, 1, 1, 1, 1, 1].map((item, index) => <RecycleProductCategoryCard key={index} />)}
        
    </div>
  )
}

export default RecycleProductCategory