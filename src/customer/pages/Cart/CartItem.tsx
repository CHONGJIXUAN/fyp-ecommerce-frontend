import { Divider, Button, IconButton, Icon } from '@mui/material'
import React from 'react'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const CartItem = () => {
  const handleUpdateQuantity = () => {
    console.log("Update quantity");
  }  
  return (
    <div className='border rounded-md relative'>
        <div className='p-5 flex gap-3'>
            <div className=''>
                <img className='w-[90px] rounded-md' 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK_j-gbGFRqwGAwhoXIIS_RLlEW78hIEu7GA&s" alt="" />
            </div>
            <div className='space-y-2'>
                <h1 className="font-semibold text-lg">Business Name</h1>
                <p className='text-gray-600 font-medium text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <p className='text-gray-400 text-xs'><strong>Sold by: </strong> Natural Lifestyle Products Private Limited</p>
                <p className='text-sm'>7 days replacement available</p>
                <p className='text-sm text-gray-500'><strong>Quantity: </strong> 5</p>
            </div>
        </div>
        <Divider />
        <div className='flex justify-between items-center'>
            <div className='px-5 py-2 flex justify-between items-center'>
                <div className='flex items-center gap-2 w-[140px] justify-between'>
                    <Button disabled={true}>
                        <RemoveIcon />
                    </Button>
                    <span>{5}</span>
                    <Button onClick={handleUpdateQuantity}>
                        <AddIcon />
                    </Button>
                </div>
            </div>
            <div className='pr-5'>
                <p className='text-gray-700'>79</p>
            </div>
            <div className='absolute top-1 right-1'>
                <IconButton color='primary'>
                    <CloseIcon />
                </IconButton>
            </div>
        </div>
    </div>
  )
}

export default CartItem