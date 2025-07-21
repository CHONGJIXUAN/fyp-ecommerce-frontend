import React, { use, useEffect, useState } from 'react'
import './ProductCard.css';
import { Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeComment from '@mui/icons-material/ModeComment';
import { Product } from 'types/ProductTypes';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'State/Store';
import { addProductToWishlist } from 'State/customer/wishlistSlice';

const ProductCard = ({item}:{item:Product}) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        let interval:any
        if(isHovered){
            interval = setInterval(() => {
                setCurrentImage((prev) => (prev + 1) % item.images.length);
            }, 1000);
        }else if(interval){
            clearInterval(interval);
            interval = null;
        }
        return () => clearInterval(interval);
    },[isHovered])

    const handleWishlist = (e: any) => {
        e.stopPropagation();
        item.id && dispatch(addProductToWishlist({productId: item.id || 1}))
    }

  return (
    <>
        <div onClick={() => navigate(`/product-details/${item.category?.categoryId}/${item.title}/${item.id}`)} className='group px-4 relative'>
            <div className='card' 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            >
                {item.images.map((item, index) => 
                    <img
                        className="card-media object-top"
                        src={item}
                        style={{ transform: `translateX(${(index - currentImage)*100}%)` }}
                    />
                )}

                { 
                    isHovered && <div className='indicator flex flex-col items-center space-y-2'>
                        <div className='flex gap-3'>
                            <Button onClick={(e) => handleWishlist(e)} variant='contained' color='primary'>
                                <FavoriteIcon sx={{color:"green.800"}}/>
                            </Button>
                            <Button
                            variant="contained"
                            color="primary"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/reviews/${item.id}`);
                            }}
                            >
                            <ModeComment sx={{ color: "green.800" }} />
                            </Button>
                        </div>
                    </div>
                }
                
            </div>
            <div className='details pt-3 space-y-1 rounded'>
                <div className='name'>
                    <h1>{item.seller?.businessDetails.businessName}</h1>
                    <p>{item.title}</p>
                </div>
                <div className='price flex items-center gap-3'>
                    <span className="font-sans text-gray-800">
                        RM {item.sellingPrice}
                    </span>
                    {/* <span className="thin-line-through text-gray-400">
                        RM {item.}
                    </span> */}
                    {/* <span className='text-primary font-semibold'>
                        {item.discountPercent}%
                    </span> */}
                </div>
            </div>
        </div>
    </>
    
  )
}

export default ProductCard