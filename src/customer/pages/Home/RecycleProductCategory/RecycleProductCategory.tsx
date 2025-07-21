import React from 'react'
import RecycleProductCategoryCard from './RecycleProductCategoryCard'
import store, { useAppSelector } from 'State/Store'

const RecycleProductCategory = () => {
  const {customer} = useAppSelector(store => store);

  return (
    <div className='flex flex-wrap justify-between py-5 lg:px-20 border-b'>
        {customer.homePageData?.recycleProducts?.slice(0, 7).map((item) => <RecycleProductCategoryCard  item={item} />)}
        
    </div>
  )
}

export default RecycleProductCategory