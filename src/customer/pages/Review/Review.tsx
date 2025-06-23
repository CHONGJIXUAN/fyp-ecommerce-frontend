import React from 'react'
import ReviewCard from './ReviewCard'
import { Divider } from '@mui/material'

const Review = () => {
  return (
    <div className='p-5 lg:px-20 flex flex-col lg:flex-row gap-20'>
        <section className='w-full md:w-1/2 lg:w-[30%] space-y-2'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK_j-gbGFRqwGAwhoXIIS_RLlEW78hIEu7GA&s" alt="" />

            <div>
                <div>
                    <p className='font-bold text-xl'>Business Name</p>
                    <p className='text-lg text-gray-600'>Category Name</p>
                </div>
                <div>
                    <div className='price flex items-center gap-3 mt-5 text-2xl'>
                        <span className="font-sans text-gray-800">
                            RM 40
                        </span>
                        <span className="line-through text-gray-400">
                            RM 100
                        </span>
                        <span className='text-primary font-semibold'>
                            60% off
                        </span>
                    </div>
                </div>
            </div>

        </section>
        <section className='space-y-5 w-full'>
            {[1, 1, 1, 1, 1].map((item)=>
            <div className='space-y-3'> 
            <ReviewCard /> 
            <Divider />
            </div>)}
        </section>
    </div>
  )
}

export default Review