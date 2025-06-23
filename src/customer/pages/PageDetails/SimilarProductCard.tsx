import React from 'react'

const SimilarProductCard = () => {
  return (
    <div className='group px-4 relative'>
        <div className='card' >
            <img className="card-media object-top" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK_j-gbGFRqwGAwhoXIIS_RLlEW78hIEu7GA&s"}/>
        </div>
            <div className='details pt-3 space-y-1 rounded'>
                <div className='name'>
                    <h1>Muji</h1>
                    <p>Blue Shirt</p>
                </div>
                <div className='price flex items-center gap-3'>
                    <span className="font-sans text-gray-800">
                        RM 40
                    </span>
                    <span className="thin-line-through text-gray-400">
                        RM 100
                    </span>
                    <span className='text-primary font-semibold'>
                        60% off
                    </span>
                </div>
            </div>
        </div>       
  )
}

export default SimilarProductCard