import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendLoginSignupOtp, signup, verifyOtp } from 'State/AuthSlice'
import { useAppDispatch } from 'State/Store'


interface RegisterFormProps {
  onRegisterSuccess: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess }) => {
    const dispatch = useAppDispatch()
    const [otpSent, setOtpSent] = useState(false);
    const [otpStatus, setOtpStatus] = useState(""); 
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            otp: "",
            fullName: "",
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
            if (!otpStatus.includes("OTP Verified")) {
                alert("Please verify OTP before registering.");
                return;
            }

            dispatch(signup(values))
                .unwrap()
                .then(() => {
                alert("Registration successful! Please login.");
                onRegisterSuccess(); 
                })
                .catch((error) => {
                console.error("Registration failed:", error);
                alert("Failed to register. Please try again.");
                });
        },
    })
    
    const handleSendOtp = () => {
    const email = formik.values.email;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    dispatch(sendLoginSignupOtp({ email }))
      .unwrap()
      .then(() => {
        setOtpSent(true);
        setMessage("OTP has been sent to your email!");
      })
      .catch(() => {
        setMessage("Failed to send OTP. Please try again.");
      });
  };
    
  const handleOtpChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("otp", e.target.value);

    if (e.target.value.length === 6) {
      try {
        const result = await dispatch(
          verifyOtp({ email: formik.values.email, otp: e.target.value })
        ).unwrap();
        setOtpStatus("OTP Verified Successfully");
      } catch (error: any) {
        setOtpStatus("Invalid OTP. Please try again.");
      }
    } else {
      setOtpStatus("");
    }
  };
          
  return (
    <div>
      <h1 className="text-center font-bold text-xl text-primary pb-8">
        Register
      </h1>

      <div className="space-y-5">
        {/* Email Field */}
        <TextField
          fullWidth
          name="email"
          label="Email"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        {/* ✅ Show message after OTP sent */}
        {message && (
          <p
            style={{
              color: otpSent ? "green" : "red",
              fontSize: "14px",
              marginTop: "4px",
            }}
          >
            {message}
          </p>
        )}

        {/* OTP + Full Name Fields (Only after OTP is sent) */}
        {otpSent && (
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="font-medium text-sm opacity-60">
                Enter the OTP sent to your email
              </p>
              <TextField
                fullWidth
                name="otp"
                label="OTP"
                value={formik.values.otp}
                onBlur={formik.handleBlur}
                onChange={handleOtpChange}
                error={formik.touched.otp && Boolean(formik.errors.otp)}
                helperText={formik.touched.otp && formik.errors.otp
                    ? formik.errors.otp
                    : otpStatus}
              />
            </div>
            <TextField
              fullWidth
              name="fullName"
              label="Full Name"
              value={formik.values.fullName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
          </div>
        )}

        {/* Buttons */}
        {!otpSent ? (
          <Button
            onClick={handleSendOtp}
            fullWidth
            variant="contained"
            sx={{ py: "11px" }}
          >
            Send OTP
          </Button>
        ) : (
          <Button
            onClick={() => formik.handleSubmit()}
            fullWidth
            variant="contained"
            sx={{ py: "11px" }}
          >
            Register
          </Button>
        )}
      </div>
    </div>
  )
}

export default RegisterForm