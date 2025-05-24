import React from 'react'
//import WaterBottleImage from '../../../image/water-bottle.jpg'

const CategoryGrid = () => {
  return (
    <div className='grid grid-cols-6 gap-4 px-5 lg:px-20'>
        <div className='col-span-2 row-span-2'>
            <img className='w-full h-full object-cover rounded-xl' 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUma3G4BN0wEx58oavlF97zCHXTLUqrz2_sg&s" />
        </div>

        <div className='col-span-2'>
            <img className='w-full h-full object-cover rounded-xl'
            src="https://www.ecowatch.com/wp-content/uploads/2021/11/1492898612-origin.jpg" />
        </div>

        <div className='col-span-2'>
            <img className='w-full h-full object-cover rounded-xl'
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd2842WaKEp7j7XoXJnQ6EeM8lAlOmErZlqA&s" />
        </div>

        <div className='col-span-2'>
            <img className='w-full h-full object-cover rounded-xl'
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd2842WaKEp7j7XoXJnQ6EeM8lAlOmErZlqA&s" />
        </div>

        <div className='col-span-2'>
            <img className='w-full h-full object-cover rounded-xl'
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd2842WaKEp7j7XoXJnQ6EeM8lAlOmErZlqA&s" />
        </div>

    </div>
  )
}

export default CategoryGrid