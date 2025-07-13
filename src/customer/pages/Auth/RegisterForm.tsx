import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { sendLoginSignupOtp } from 'State/AuthSlice'
import { useAppDispatch } from 'State/Store'

const RegisterForm = () => {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: "",
            otp: ""
        },
        validate: (values) => {
            const errors: any = {}
            if (!values.email) {
                errors.email = 'Email is required'
            } else if (!/\S+@\S+\.\S+/.test(values.email)) {
                errors.email = 'Email address is invalid'
            }
              return errors
            },
        onSubmit: (values) => {
            console.log('Form submitted:', values)
        },
    })
    
    const handleSendOtp = () => {
        dispatch(sendLoginSignupOtp({email:formik.values.email}))
    }        
    
          
  return (
    <div>
        <h1 className="text-center font-bold text-xl text-primary pb-8">Register</h1>

        <div className="space-y-5">
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

            {true && 
            <div className='space-y-2'>
                <p className='font-medium text-sm opacity-40'>Enter Otp sent to your email</p>
                <TextField 
                fullWidth
                name='otp'
                label="Otp"
                value={formik.values.otp}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.otp && Boolean(formik.errors.otp)}
                helperText={formik.touched.otp && formik.errors.otp}
                />
            </div>
            }
            <Button onClick={handleSendOtp} fullWidth variant='contained' sx={{py: "11px"}}>
            Send Otp
            </Button>
            <Button onClick={() => formik.handleSubmit()} fullWidth variant='contained' sx={{py: "11px"}}>
            Login
            </Button>
        </div>
    </div>
  )
}

export default RegisterForm