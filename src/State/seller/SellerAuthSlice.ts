import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "config/Api";
import { useNavigate } from "react-router-dom";

export const sellerLogin = createAsyncThunk<any, any>(
  "/sellers/login",
  async (loginRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/sellers/login", loginRequest);
      const jwt = response.data.jwt;
      localStorage.setItem("sellerJwt", jwt);
      return response.data;
    } catch (error: any) {
      console.error("Error during seller login:", error);
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);
