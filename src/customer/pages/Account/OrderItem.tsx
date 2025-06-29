import { Avatar } from '@mui/material'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import React from 'react'
import { teal } from '@mui/material/colors';

const OrderItem = () => {
  return (
    <div className='text-sm bg-white p-5 sp0ace-y-4 border rounded-md cursor-pointer'>
        <div className='flex items-center gap-5'>
            <div>
                <Avatar sizes='small' sx={{ backgroundColor: teal[500] }}>
                    <ElectricBoltIcon />
                </Avatar>
            </div>
            <div>
                <h1 className="font-bold tsxt-primary">PENDING</h1>
                <p>Arriving By Mon, 15 July</p>
            </div>
        </div>
        <div className='p-5 bg-teal-50 flex gap-3'>
            <div>
                <img className='w-[70px]' 
                src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQwsVOi1OD2IfAh6l-qcK
                ihclWRpc7JsGsy0T6Wd6kdUn0wGTn1nVk2I_qpGQ18DFqll8j78Y_x0BYmayxS3X
                XEGb1npBE0Zevuj8NyyursFYWqtohymDamBvk" alt="" />
            </div>
            <div className='w-full space-y-2'>
                <h1 className='font-bold'>Virani Clothing</h1>
                <p>Face design resembles an aircraft cockpit instrument</p>
                <p>
                    <strong>size :</strong>
                    FREE
                </p>
            </div>
        </div>
    </div>
  )
}

export default OrderItem