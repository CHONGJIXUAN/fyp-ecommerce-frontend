import React, { use, useEffect, useState } from 'react'
import CartItem from './CartItemCard'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import { teal } from '@mui/material/colors'
import TextField from '@mui/material/TextField';
import { Button, dividerClasses, IconButton } from '@mui/material';
import Close from '@mui/icons-material/Close';
import PricingCard from './PricingCard';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'State/Store';
import { fetchUserCart } from 'State/customer/cartSlice';
import { applyCoupon } from 'State/customer/couponSlice';


const Cart = () => {
  const [couponCode, setCouponCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((store) => store.cart);

  useEffect(() => {
    dispatch(fetchUserCart(localStorage.getItem("jwt") || ""));
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value);
  };

  const handleApplyCoupon = () => {
    const jwt = localStorage.getItem("jwt");
  if (!jwt) {
    alert("Please login first");
    return;
  }

  const normalizedCode = couponCode.trim().toUpperCase();
  if (!normalizedCode) {
    setMessage("Please enter a coupon code");
    setIsError(true);
    return;
  }

  setLoading(true); // ✅ Optional: Add a loading state for UX

  dispatch(
    applyCoupon({
      apply: true,
      code: normalizedCode,
      orderValue: cart?.totalSellingPrice || 0,
      jwt,
    })
  )
    .unwrap()
    .then(() => {
      setMessage(`Coupon "${normalizedCode}" applied successfully!`);
      setIsError(false);

      // ✅ Refresh cart to update discount info
      dispatch(fetchUserCart(jwt));
    })
    .catch((err: any) => {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to apply coupon.";
      setMessage(errorMessage);
      setIsError(true);
    })
    .finally(() => {
      setLoading(false);
    });
  };


  return (
    <div className="pt-10 px-5 sm:px-10 md:px-60 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Cart Items */}
        <div className="cartItemSection lg:col-span-2 space-y-3">
          {cart?.cartItems.length ? (
            cart.cartItems.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        {/* Coupon & Pricing */}
        <div className="col-span-1 text-sm space-y-3">
          <div className="border rounded-md px-5 py-3 space-y-5">
            <div className="flex gap-3 text-sm items-center">
              <LocalOfferIcon sx={{ color: teal[600], fontSize: "17px" }} />
              <span>Apply Coupons</span>
            </div>
            <div className="flex justify-between items-center">
              <TextField
                onChange={handleChange}
                id="outlined-basic"
                placeholder="Coupon Code"
                size="small"
                variant="outlined"
                value={couponCode}
              />
              <Button size="small" onClick={handleApplyCoupon}>
                Apply
              </Button>
            </div>
            {message && (
              <p
                className={`text-sm mt-2 ${
                  isError ? "text-red-600" : "text-green-600"
                }`}
              >
                {message}
              </p>
            )}
          </div>

          {/* Pricing Summary */}
          <div className="border rounded-md">
            <PricingCard />
            <div className="p-5">
              <Button
                onClick={() => navigate("/checkout")}
                sx={{ py: "11px" }}
                variant="contained"
                className="w-full"
                disabled={!cart?.cartItems.length}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart