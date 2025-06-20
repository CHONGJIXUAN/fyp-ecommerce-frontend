import React, { useEffect, useState } from 'react'
import './ProductCard.css';
import { Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeComment from '@mui/icons-material/ModeComment';

const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK_j-gbGFRqwGAwhoXIIS_RLlEW78hIEu7GA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPuFK173JoOVYsnIQT8o34w6qCnI_IN9tMR0wvHoJVsHGpA9L4WGkDYTCj1fUFBCVqxEE&usqp=CAU"
    ]

const ProductCard = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let interval:any
        if(isHovered){
            interval = setInterval(() => {
                setCurrentImage((prev) => (prev + 1) % images.length);
            }, 1000);
        }else if(interval){
            clearInterval(interval);
            interval = null;
        }
        return () => clearInterval(interval);
    },[isHovered])

  return (
    <>
        <div className='group px-4 relative'>
            <div className='card' 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            >
                {images.map((item, index) => 
                    <img
                        className="card-media object-top"
                        src={item}
                        style={{ transform: `translateX(${(index - currentImage)*100}%)` }}
                    />
                )}

                { 
                    isHovered && <div className='indicator flex flex-col items-center space-y-2'>
                        <div className='flex gap-3'>
                            <Button variant='contained' color='primary'>
                                <FavoriteIcon sx={{color:"green.800"}}/>
                            </Button>
                            <Button variant='contained' color='primary'>
                                <ModeComment sx={{color:"green.800"}}/>
                            </Button>
                        </div>
                    </div>
                }
                
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
    </>
    
  )
}

export default ProductCard