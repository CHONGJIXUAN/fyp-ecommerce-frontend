import { TextField } from '@mui/material';
import React from 'react'

interface BecomeSellerFormStep2Props {
    formik: any;
}

const BecomeSellerFormStep3 = ({formik}: BecomeSellerFormStep2Props) => {
  return (
    <div className='space-y-5'>
        <TextField 
            fullWidth
            name='bankDetails.accountNumber'
            label="Account Number"
            value={formik.values.bankDetails.accountNumber}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.bankDetails?.accountNumber && Boolean(formik.errors.bankDetails?.accountNumber)}
            helperText={formik.touched.bankDetails?.accountNumber && formik.errors.bankDetails?.accountNumber}
        />
        <TextField 
            fullWidth
            name='bankDetails.accountHolderName'
            label="Account Holder Number"
            value={formik.values.bankDetails.accountHolderName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.bankDetails?.accountHolderName && Boolean(formik.errors.bankDetails?.accountHolderName)}
            helperText={formik.touched.bankDetails?.accountHolderName && formik.errors.bankDetails?.accountHolderName}
        />
    </div>
  )
}

export default BecomeSellerFormStep3