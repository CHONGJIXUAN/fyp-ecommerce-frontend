import React from 'react'
import './ShopByCategory.css';
import { HomeCategory } from 'types/HomeCategoryTypes';

const ShopByCategoryCard = ({item}:{item:HomeCategory}) => {
  return (
    <div className='flex gap-3 flex-col justify-center items-center'>
        <div className='custom-border w-[150px] h-[150px] rounded-full cursor-pointer group overflow-hidden bg-primary'>
            <img
            className='group-hover:scale-95 transition-transform duration-700 object-cover object-top w-full h-full rounded-full '
            src={item.image}
            alt=""
            />
        </div>
        <h1 className="text-center font-semibold">{item.name}</h1>
    </div>
  )
}

export default ShopByCategoryCard