import { Button, CircularProgress, TextField } from '@mui/material'
import { sign } from 'crypto'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendLoginSignupOtp, signing, verifyOtp } from 'State/AuthSlice'
import { useAppDispatch, useAppSelector } from 'State/Store'

const LoginForm = () => {
    const dispatch = useAppDispatch()
    const {auth} = useAppSelector(store => store)
    const navigate = useNavigate()
    const [otpStatus, setOtpStatus] = useState<string>("");
    
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
          if (auth.otpSent && !values.otp) {
            errors.otp = "OTP is required";
          }
          return errors
        },
        onSubmit: async (values) => {
          if (otpStatus !== "OTP verified") {
            alert("Please enter a valid OTP before login.");
            return;
          }

          const result = await dispatch(signing(values));

          if (signing.fulfilled.match(result)) {
            console.log("Login successful!", result.payload);
            navigate("/");
          } else {
            console.error("Login failed:", result.payload);
            alert("Invalid credentials or OTP.");
          }
        },
      })

      const handleSendOtp = () => {
          if (!formik.values.email || formik.errors.email) {
            alert("Please enter a valid email before requesting OTP.");
            return;
          }

          dispatch(sendLoginSignupOtp({ email: formik.values.email }))
            .unwrap()
            .then(() => {
              setOtpStatus("");
            })
            .catch(() => {
              alert("Failed to send OTP. Try again.");
            });
      }

      const handleOtpChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.setFieldValue("otp", e.target.value);

        if (e.target.value.length === 6) {
          try {
            const result = await dispatch(
              verifyOtp({ email: formik.values.email, otp: e.target.value })
            ).unwrap();
            setOtpStatus(result.message);
          } catch (error: any) {
            setOtpStatus(error);
          }
        }
      };
      
  return (
    <div>
        <h1 className="text-center font-bold text-xl text-primary pb-8">Login</h1>

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

            {auth.otpSent && 
            <div className='space-y-2'>
                <p className='font-medium text-sm opacity-40'>Enter Otp sent to your email</p>
                <TextField 
                fullWidth
                name='otp'
                label="Otp"
                value={formik.values.otp}
                onBlur={formik.handleBlur}
                onChange={handleOtpChange}
                error={Boolean(otpStatus && otpStatus !== "OTP verified")}
              helperText={otpStatus || (formik.touched.otp && formik.errors.otp)}
                />
            </div>
            }
            {auth.otpSent ? (
              <Button 
                onClick={() => formik.handleSubmit()} 
                fullWidth 
                variant='contained' 
                sx={{ py: "11px" }}
                
              >
                Login
              </Button>
            ) : (
              <Button 
                onClick={handleSendOtp} 
                fullWidth 
                variant='contained' 
                sx={{ py: "11px" }}
              >
                {auth.loading ? <CircularProgress /> : "Send otp"}
              </Button>
            )} 
        </div>
    </div>
  )
}

export default LoginForm