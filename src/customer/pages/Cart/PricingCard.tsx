import { Divider } from '@mui/material'
import React, { useState } from 'react'
import { applyCoupon } from 'State/customer/couponSlice';
import { useAppDispatch, useAppSelector } from 'State/Store';


const PricingCard = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [couponCode, setCouponCode] = useState('');
  const [isApplied, setIsApplied] = useState(false);

  const subtotal = cart?.totalSellingPrice || 0;
  const discount = cart?.discount || 0;
  const shipping = subtotal >= 100 ? 0 : 10;
  const total = subtotal - discount + shipping;

  const handleApplyCoupon = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) return alert('Please login');

    dispatch(
      applyCoupon({
        jwt,
        apply: !isApplied, 
        code: couponCode,
        orderValue: subtotal,
      })
    )
      .unwrap()
      .then(() => {
        setIsApplied(!isApplied);
      })
      .catch((err:any) => alert(err));
  };

  return (
    <>
      <div className="space-y-3 p-5">
        <div className="flex justify-between items-center">
          <span>Subtotal</span>
          <span>RM {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Discount</span>
          <span>RM {discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `RM ${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Platform Fee</span>
          <span>Free</span>
        </div>
      </div>

      <hr />

      <div className="flex justify-between items-center p-5 text-primary font-bold">
        <span>Total</span>
        <span>RM {total.toFixed(2)}</span>
      </div>
    </>
  );
};

export default PricingCard