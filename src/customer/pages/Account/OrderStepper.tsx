import { Box } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';
import React, { useEffect, useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const steps = [
    {name: 'Order Placed', description: "on Thu, 11 Jul", value: "PLACED"},
    {name: 'Packed', description: "Item Packed in Dispatch Warehouse", value: "CONFIRMED"},
    {name: 'Shipped', description: "on Thu, 11 Jul", value: "SHIPPED"},
    {name: "Arriving", description: "on Thu, 11 Jul", value: "ARRIVING"},
    {name: "Delivered", description: "on Thu, 11 Jul", value: "DELIVERED"}
]

const cancelledSteps = [
    {name: 'Order Placed', description: "on Thu, 11 Jul", value: "PLACED"},
    {name: 'Order Cancelled', description: "on Thu, 11 Jul", value: "CANCELLED"},
]

const currentStep = 1;

const OrderStepper = ({orderStatus}: any) => {
 const [statusStep, setStatusStep] = useState(steps);

 useEffect(() => {
    if(orderStatus === "CANCELLED") {
        setStatusStep(cancelledSteps);
    }else{
        setStatusStep(steps);
    }
 }, [orderStatus])

  return (
    <Box className="my-10">
        {statusStep.map((step, index) => (
            <>
                <div key={index} className={`flex px-4 text-center`}>
                    <div className='flex flex-col items-center'>
                        <Box sx={{zIndex: -1}} className={`w-8 h-8 rounded-full items-center justify-center z-10
                            ${index <= currentStep ? 'bg-gray-200 text-teal-500' : 'bg-gray-300 text-gray-600'}
                        `}>
                        {step.value === orderStatus ? (
                            <CheckCircleIcon />
                        ) : (
                            <FiberManualRecordIcon sx={{zIndex: -1}} />
                        )}
                        </Box>
                        {statusStep.length - 1 != index && (
                            <div className={`border h-20 w-[2px] 
                                ${index < currentStep ? 'bg-primary' : 'bg-gray-300 text-gray-600'}`}>
                            </div>
                        )} 
                    </div>
                    <div className={`ml-2 w-full`}>
                        <div className={`${step.value === orderStatus  
                            ? 'bg-primary p-2 text-white font-medium rounded-md -translate-y-3' 
                            : ''
                            } ${(orderStatus === "CANCELLED" && step.value === orderStatus) ? 'bg-red-500' : ''} w-full`}>
                            <p className={``}>{step.name}</p>
                            <p className={`${step.value === orderStatus ? "text-gray-200" : "text-gray-500"} text-xs`}>
                                {step.description}
                            </p>
                        </div>
                    </div>
                </div>
            </>
        ))}    
    </Box>
  )
}

export default OrderStepper