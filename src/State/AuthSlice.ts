import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "config/Api";

export const sendLoginSignupOtp = createAsyncThunk("/auth/sendLoginSignupOtp", 
    async({email}:{email:string}, {rejectWithValue}) => {
        try {
            const response = await api.post("/auth/sent/login-signup-otp",{email})
            console.log("Login otp:", response);
        } catch (error) {
            console.log("Error fetching otp:", error);
        }
    }    
)

export const signing = createAsyncThunk<any, any>("/auth/signing", 
    async(loginRequest, {rejectWithValue}) => {
        try {
            const response = await api.post("/auth/signing", loginRequest)
            console.log("Login otp:", response.data);
        } catch (error) {
            console.log("Error fetching otp:", error);
        }
    }    
)