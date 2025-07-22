import { TextField } from '@mui/material'
import { api } from 'config/Api';
import React from 'react'
import { useNavigate } from 'react-router-dom';

interface BecomeSellerFormStep2Props {
    formik: any;
}

const BecomeSellerFormStep4 = ({formik}: BecomeSellerFormStep2Props) => {
  return (
    <div className='space-y-5'>
        <TextField 
            fullWidth
            name='businessDetails.businessName'
            label="Business Name"
            value={formik.values.businessDetails.businessName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched?.businessDetails?.businessName && Boolean(formik.errors?.businessDetails?.businessName)}
            helperText={formik.touched?.businessDetails?.businessName && formik.errors?.businessDetails?.businessName}
        />
        <TextField 
            fullWidth
            name='sellerName'
            label="Seller Name"
            value={formik.values.sellerName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.sellerName && Boolean(formik.errors.sellerName)}
            helperText={formik.touched.sellerName && formik.errors.sellerName}
        />
        <TextField 
            fullWidth
            name='email'
            label="Email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
        />
        <TextField 
            fullWidth
            name='password'
            label="Password"
            type='password'
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched?.password && Boolean(formik.errors?.password)}
            helperText={formik.touched?.password && formik.errors?.password}
        />
    </div>
  )
}

export default BecomeSellerFormStep4