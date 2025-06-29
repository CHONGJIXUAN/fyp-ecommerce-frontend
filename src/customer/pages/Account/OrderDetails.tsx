import { Box, Button, Divider } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import OrderStepper from './OrderStepper';
import PaymentsIcon from '@mui/icons-material/Payments';

const OrderDetails = () => {
  const navigate = useNavigate();
    
  return (
    <Box className='space-y-5'>
        <section className='flex flex-col gap-5 justify-center items-center'>
            <img className='w-[100px]' src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ
            wsVOi1OD2IfAh6l-qcKihclWRpc7JsGsy0T6Wd6kdUn0wGTn1nVk2I_qpGQ18DFqll8j78Y_x0BYmayxS3XXEGb1n
            pBE0Zevuj8NyyursFYWqtohymDamBvk" alt="" />
            <div className='text-sm space-y-1 text-center'>
                <h1 className='font-bold'>{"Virant Clothing"}</h1>
                <p>{"Face design resembles an aircraft cockpit instrument"}</p>
                <p><strong>Size:</strong>M</p>
            </div>
            <div>
                <Button onClick={() => navigate(`/reviews/${5}/create`)}>
                    Write Review
                </Button>
            </div>
        </section>
        <section className='border p-5'>
            <OrderStepper orderStatus={"SHIPPED"} />
        </section>
        <div className='border p-5'>
            <h1 className='font-bold pb-3'>Delivery Address</h1>
            <div className='text-sm space-y-2'>
                <div className='flex gap-5 font-medium'>
                    <p>{"Josh"}</p>
                    <Divider flexItem orientation='vertical'/>
                    <p>{"0161234567"}</p>
                </div>
                <p>{"Address"}</p>
            </div>
        </div>
        <div className='border space-y-4'>
            <div className='flex justify-between text-sm pt-5 px-5'>
                <div className='space-y-1'>
                    <p className='font-bold'>Total Item Price</p>
                    <p>You saved <span className='text-green-500 font-medium text-sx'>
                            Orders Price
                        </span> on this item
                    </p>
                </div>
                <p className='font-medium'>Selling Prices</p>
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
                    <strong>Sold By: </strong> Business Name
                </p>
            </div>
            <div className='p-10'>
                <Button disabled={true} color='error' sx={{py:"0.7rem"}} className='' variant='outlined' fullWidth>
                    {false ? "Order Cancelled" : "Cancel Order"}
                </Button>
            </div>
        </div>
    </Box>
  )
}

export default OrderDetails