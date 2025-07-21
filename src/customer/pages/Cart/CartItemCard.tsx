import { Divider, Button, IconButton, Icon } from '@mui/material'
import React, { use } from 'react'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import type { CartItem } from 'types/cartTypes';
import { deleteCartItem, updateCartItem } from 'State/customer/cartSlice';
import { useAppDispatch } from 'State/Store';
import { cancelOrder } from 'State/customer/orderSlice';
import { Order } from 'types/orderTypes';


const CartItemCard = ({ item, order }: { item: CartItem; order?: Order }) => {
  const dispatch = useAppDispatch();  
  
    const handleUpdateQuantity = (values: number) => () => {
        const newQuantity = item.quantity + values;

        if (newQuantity >= 1) {
            dispatch(
            updateCartItem({
                jwt: localStorage.getItem("jwt"),
                cartItemId: item.id,
                cartItem: { quantity: newQuantity }
            })
            );
        }
    };

    const handleRemoveItem = (cartItemId: number) => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            dispatch(deleteCartItem({ jwt, cartItemId }));
        }
    };

    const handleCancelOrder = (order: Order) => {
        console.log("Cancel clicked", order);
        const orderId = order.id;
        const jwt = localStorage.getItem("jwt");
        if (window.confirm("Are you sure you want to cancel this order?") && jwt) {
            dispatch(cancelOrder({ jwt, orderId }));
        }
    };

  return (
    <div className='border rounded-md relative'>
        <div className='p-5 flex gap-3'>
            <div className=''>
                <img className='w-[90px] rounded-md' 
                src={item.product.images[0]} alt="" />
            </div>
            <div className='space-y-2'>
                <h1 className="font-semibold text-lg">{item.product.seller?.businessDetails.businessName}</h1>
                <p className='text-gray-600 font-medium text-sm'>{item.product.title}</p>
                <p className='text-gray-400 text-xs'><strong>Sold by: </strong> Natural Lifestyle Products Private Limited</p>
                <p className='text-sm'>7 days replacement available</p>
                <p className='text-sm text-gray-500'><strong>Quantity: </strong> {item.quantity}</p>
            </div>
        </div>
        <Divider />
        <div className='flex justify-between items-center'>
            <div className='px-5 py-2 flex justify-between items-center'>
                <div className='flex items-center gap-2 w-[140px] justify-between'>
                    <Button onClick={handleUpdateQuantity(-1)} disabled={item.quantity <= 1}>
                        <RemoveIcon />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button onClick={handleUpdateQuantity(1)}>
                        <AddIcon />
                    </Button>
                </div>
            </div>
            <div className='pr-5'>
                <p className='text-gray-700'>RM {item.sellingPrice}</p>
            </div>
            <div className='absolute top-1 right-1'>
                <IconButton color='primary' onClick={() => handleRemoveItem(item.id)}>
                    <CloseIcon />
                </IconButton>
            </div>
        </div>
    </div>
  )
}

export default CartItemCard