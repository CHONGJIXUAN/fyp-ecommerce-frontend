import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "config/Api";

export const sellerLogin = createAsyncThunk<any, any>("/sellers/login", 
    async(loginRequest, {rejectWithValue}) => {
        try {
            const response = await api.post("/sellers/login", loginRequest)
            console.log("Login otp:", response.data);
            const jwt = response.data.jwt;
            localStorage.setItem("sellerJwt", jwt);
        } catch (error) {
            console.log("Error fetching otp:", error);
        }
    }    
)