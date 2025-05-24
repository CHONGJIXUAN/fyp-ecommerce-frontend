import React from 'react'
import './ShopByCategory.css';

const ShopByCategoryCard = () => {
  return (
    <div className='flex gap-3 flex-col justify-center items-center'>
        <div className='custom-border w-[150px] h-[150px] rounded-full cursor-pointer group overflow-hidden bg-primary'>
            <img
            className='group-hover:scale-95 transition-transform duration-700 object-cover object-top w-full h-full rounded-full '
            src="https://i.ytimg.com/vi/IRa26mv0FmE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB1Wsm6gPAsaDLCEKavQou4plItFg"
            alt=""
            />
        </div>
        <h1 className="text-center font-semibold">Sustainable Fashion</h1>
    </div>
  )
}

export default ShopByCategoryCard