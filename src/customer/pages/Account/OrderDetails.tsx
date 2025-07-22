import { Box, Button, Divider } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import OrderStepper from './OrderStepper';
import PaymentsIcon from '@mui/icons-material/Payments';
import { useAppDispatch, useAppSelector } from 'State/Store';
import { cancelOrder, fetchOrderById, fetchOrderItemById } from 'State/customer/orderSlice';

const OrderDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {orderId, orderItemId} = useParams();
  const { currentOrder, orderItem, loading } = useAppSelector(state => state.order);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderById({ orderId: Number(orderId), jwt: localStorage.getItem("jwt") || "" }));
    }
    if (orderItemId) {
      dispatch(fetchOrderItemById({ orderItemId: Number(orderItemId), jwt: localStorage.getItem("jwt") || "" }));
    }
  }, [orderId, orderItemId, dispatch]);
    
  return (
    <Box className='space-y-5'>
        <section className='flex flex-col gap-5 justify-center items-center'>
            <img className='w-[100px]'  src={orderItem?.product?.images?.[0] || currentOrder?.orderItems?.[0]?.product?.images?.[0] || ""} />
            <div className='text-sm space-y-1 text-center'>
                <h1 className='font-bold'>{orderItem?.product?.seller?.businessDetails?.businessName ||
              currentOrder?.orderItems?.[0]?.product?.seller?.businessDetails?.businessName}</h1>
                <p>{orderItem?.product?.title || currentOrder?.orderItems?.[0]?.product?.title}</p>
                <p><strong>Size:</strong>{orderItem?.size || currentOrder?.orderItems?.[0]?.size}</p>
            </div>
            <div>
                <Button
                    variant="outlined"
                    onClick={() => navigate(`/reviews/${currentOrder?.orderItems?.[0]?.product?.id}`)}
                >
                    Write Review
                </Button>
            </div>
        </section>
        <section className='border p-5'>
            <OrderStepper  orderStatus={currentOrder?.orderStatus || "PENDING"} />
        </section>
        <div className='border p-5'>
            <h1 className='font-bold pb-3'>Delivery Address</h1>
            <div className='text-sm space-y-2'>
                <div className='flex gap-5 font-medium'>
                    <p>{currentOrder?.shippingAddress?.name || "N/A"}</p>
                    <Divider flexItem orientation='vertical'/>
                    <p>{currentOrder?.shippingAddress?.mobile || "N/A"}</p>
                </div>
                <p>{currentOrder?.shippingAddress?.fullAddress || "N/A"}</p>
                <p>{currentOrder?.shippingAddress?.state || "N/A"}</p>
                <p>{currentOrder?.shippingAddress?.city || "N/A"}</p>
                <p>{currentOrder?.shippingAddress?.postCode || "N/A"}</p>
            </div>
        </div>
        <div className='border space-y-4'>
            <div className='flex justify-between text-sm pt-5 px-5'>
                <div className='space-y-1'>
                    <p className='font-bold'>Total Item Price</p>
                    {/* <p>You saved <span className='text-green-500 font-medium text-sx'>
                            Orders Price
                        </span> on this item
                    </p> */}
                </div>
                <p className='font-medium'>{currentOrder?.totalSellingPrice || "0"}</p>
            </div>
            <div className='px-5'>
                <div className='bg-teal-50 px-5 py-2 text-xs font-medium flex items-center gap-3'>
                    <PaymentsIcon />
                    <p>Pay On Delivery</p>
                </div>
            </div>
            <Divider />
            <div className='px-5 pb-5'>
                <p className='text-xs'>
                    <strong>Sold By: </strong> {orderItem?.product?.seller?.businessDetails?.businessName ||
              currentOrder?.orderItems?.[0]?.product?.seller?.businessDetails?.businessName}
                </p>
            </div>
            <div className='p-10'>
                <Button
                    disabled={currentOrder?.orderStatus === "CANCELLED" || currentOrder?.orderStatus === "DELIVERED"}
                    color='error'
                    sx={{ py: "0.7rem" }}
                    variant='outlined'
                    fullWidth
                    onClick={() => {
                    if (window.confirm("Are you sure you want to cancel this order?")) {
                        const jwt = localStorage.getItem("jwt") || "";
                        dispatch(cancelOrder({ jwt, orderId: currentOrder?.id }))
                        .unwrap()
                        .then(() => {
                            alert("Order cancelled successfully!");
                            navigate("/account/orders");
                        })
                        .catch(() => {
                            alert("Failed to cancel order.");
                        });
                    }
                    }}
                >
                    {currentOrder?.orderStatus === "CANCELLED" ? "Order Cancelled" : "Cancel Order"}
                </Button>
            </div>
        </div>
    </Box>
  )
}

export default OrderDetails