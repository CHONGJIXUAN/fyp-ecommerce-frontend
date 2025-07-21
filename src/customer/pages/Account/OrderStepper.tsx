import { Box } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';
import React, { useEffect, useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const steps = [
    { name: 'Pending', description: "Waiting for confirmation", value: "PENDING" },
    { name: 'Order Placed', description: "Order has been placed", value: "PLACED" },
    { name: 'Packed', description: "Item packed in dispatch warehouse", value: "CONFIRMED" },
    { name: 'Shipped', description: "Item shipped", value: "SHIPPED" },
    { name: "Delivered", description: "Order delivered", value: "DELIVERED" }
];

const cancelledSteps = [
    { name: 'Order Placed', description: "Order placed successfully", value: "PLACED" },
    { name: 'Order Cancelled', description: "Order has been cancelled", value: "CANCELLED" }
];


const OrderStepper = ({orderStatus}: any) => {
 const [statusStep, setStatusStep] = useState(steps);

    useEffect(() => {
        if (orderStatus === "CANCELLED") {
        setStatusStep(cancelledSteps);
        } else {
        setStatusStep(steps);
        }
    }, [orderStatus]);

 const currentStepIndex = statusStep.findIndex(step => step.value === orderStatus);

  return (
     <Box className="my-10">
      {statusStep.map((step, index) => (
        <div key={index} className="flex px-4 text-center">
          {/* Left Column: Step Icon & Line */}
          <div className="flex flex-col items-center">
            {/* Circle */}
            <Box
              className={`w-8 h-8 rounded-full flex items-center justify-center 
                ${index <= currentStepIndex ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'}`}
            >
              {index <= currentStepIndex ? (
                <CheckCircleIcon sx={{ fontSize: 18 }} />
              ) : (
                <FiberManualRecordIcon sx={{ fontSize: 12 }} />
              )}
            </Box>

            {/* Vertical Line */}
            {statusStep.length - 1 !== index && (
              <div className={`border h-20 w-[2px] 
                ${index < currentStepIndex ? 'bg-primary' : 'bg-gray-300'}`}>
              </div>
            )}
          </div>

          {/* Right Column: Step Details */}
          <div className="ml-2 w-full">
            <div
              className={`p-2 rounded-md w-full 
                ${step.value === orderStatus ? 'bg-primary text-white font-medium -translate-y-3' : ''} 
                ${(orderStatus === "CANCELLED" && step.value === "CANCELLED") ? 'bg-red-500 text-white' : ''}`}
            >
              <p>{step.name}</p>
              <p className={`${step.value === orderStatus ? "text-gray-200" : "text-gray-500"} text-xs`}>
                {step.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </Box>
  )
}

export default OrderStepper