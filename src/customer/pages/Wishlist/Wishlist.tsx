import React, { use, useEffect } from 'react'
import WishlistProductCard from './WishlistProductCard'
import { useAppDispatch, useAppSelector } from 'State/Store';
import { getWishlistByUserId } from 'State/customer/wishlistSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const {wishlist} = useAppSelector(store => store)
  const navigate = useNavigate();

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getWishlistByUserId());
    }
  }, [dispatch, jwt]);


  return (
    <div className='h-[85vh] p-5 lg:p-20'>
        <section>
            {!jwt ? (
              <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <p className="text-gray-600 text-lg mb-4">
                  Please log in to view your wishlist.
                </p>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/login")}
                  sx={{ py: "10px", px: "20px" }}
                >
                  Login
                </Button>
              </div>
            ) : (
            <>
              <h1 className='text-2xl font-semibold mb-5'>My Wishlist</h1>
              <div className='pt-10 flex flex-wrap gap-5'>    
                {wishlist.wishlist?.products.map((item, index) => <WishlistProductCard item={item} key={index} /> )}
              </div>
            </>
            )}
        </section>
    </div>
  )
}

export default Wishlist