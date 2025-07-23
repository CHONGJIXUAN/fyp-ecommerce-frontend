import { Button } from '@mui/material'
import React, { use, useEffect } from 'react'
import {useLocation, useNavigate, useParams } from 'react-router-dom'
import { fetchUserCart, resetCartState } from 'State/customer/cartSlice';
import { clearCartCoupon } from 'State/customer/couponSlice';
import { paymentSuccess } from 'State/customer/orderSlice';
import { useAppDispatch } from 'State/Store';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const {orderId} = useParams(); 
    const getQueryParam = (key: string) => {
        const query = new URLSearchParams(window.location.search)
        return query.get(key);
    }

    useEffect(() => {
    const jwt = localStorage.getItem("jwt") || "";
    const paymentId = getQueryParam("paymentId") || "";
    const paymentLinkId = getQueryParam("paymentLinkId") || "";

    if (paymentId && paymentLinkId) {
        dispatch(paymentSuccess({ jwt, paymentId, paymentLinkId }))
            .then(() => {
                // ✅ Clear Redux state immediately
                dispatch(resetCartState());
                // ✅ Re-fetch updated cart (should be empty now)
                dispatch(fetchUserCart(jwt));
                dispatch(clearCartCoupon()); 
            });
    }
}, [dispatch]);

  return (
    <div className='min-h-[90vh] flex justify-center items-center'>
        <div className='bg-primary text-white p-8 w-[90%] lg:w-[25%] border rounded-md h-[40vh] flex flex-col gap-7 items-center justify-center'> 
            <h1 className="text-3xl font-semibold">Congratulations!</h1>
            <h1 className="text-2xl font-semibold">you order get success</h1>

            <div>
                <Button color='secondary' variant='contained' onClick={(() => navigate("/"))}>Shopping More</Button>
            </div>
        </div>
    </div>
  )
}

export default PaymentSuccess;
