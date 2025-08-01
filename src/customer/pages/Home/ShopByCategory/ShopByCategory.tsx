import React from 'react'
import ShopByCategoryCard from './ShopByCategoryCard'
import { useAppSelector } from 'State/Store';

const ShopByCategory = () => {
  const {customer} = useAppSelector(store => store);
  return (
    <div className='flex flex-wrap justify-between lg:px-20 gap-7'>
        {customer.homePageData?.shopByCategories.slice(0,5).map((item) => <ShopByCategoryCard item={item} />)}
        
    </div>
  )
}

export default ShopByCategory