import { Avatar } from '@mui/material'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import React from 'react'
import { teal } from '@mui/material/colors';
import { Order, OrderItem } from 'types/orderTypes';
import { useNavigate } from 'react-router-dom';

const OrderItemCard = ({item, order}:{item: OrderItem, order: Order}) => {
  const navigate = useNavigate();
    
  return (
    <div onClick={() => navigate(`/account/order/${order.id}/:${item.id}`)} className='text-sm bg-white p-5 sp0ace-y-4 border rounded-md cursor-pointer'>
        <div className='flex items-center gap-5'>
            <div>
                <Avatar sizes='small' sx={{ backgroundColor: teal[500] }}>
                    <ElectricBoltIcon />
                </Avatar>
            </div>
            <div>
                <h1 className="font-bold tsxt-primary">{order.orderStatus}</h1>
                <p>Arriving By {new Date(order.deliverDate).toLocaleDateString()}</p>
            </div>
        </div>
        <div className='p-5 bg-teal-50 flex gap-3'>
            <div>
                <img className='w-[70px]' 
                src={item.product.images[0]} alt="" />
            </div>
            <div className='w-full space-y-2'>
                <h1 className='font-bold'>{item.product.seller?.businessDetails.businessName}</h1>
                <p>{item.product.title}</p>
                <p>
                    <strong>size :</strong>
                    {item.product.sizes}
                </p>
            </div>
        </div>
    </div>
  )
}

export default OrderItemCard