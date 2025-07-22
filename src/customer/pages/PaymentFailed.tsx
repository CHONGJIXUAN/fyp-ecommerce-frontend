import { Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-5">
      {/* Error Icon */}
      <div className="bg-red-100 p-6 rounded-full mb-6">
        <ErrorOutlineIcon sx={{ fontSize: 80, color: "#EF4444" }} />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-red-600 mb-3">Payment Failed!</h1>
      <p className="text-gray-600 text-center max-w-md mb-6">
        Oops! Something went wrong while processing your payment. Please try
        again or contact our support team if the issue persists.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <Button
          variant="contained"
          color="error"
          sx={{ py: "12px", px: "24px" }}
          onClick={() => navigate("/checkout")}
        >
          Retry Payment
        </Button>
        <Button
          variant="outlined"
          color="primary"
          sx={{ py: "12px", px: "24px" }}
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </div>

      {/* Extra Info */}
      <p className="text-sm text-gray-400 mt-6">
        Need help? <span className="text-blue-600 cursor-pointer">Contact Support</span>
      </p>
    </div>
  );
};

export default PaymentFailed;