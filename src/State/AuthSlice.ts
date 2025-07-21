import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "config/Api";
import { sign } from "crypto";

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
            localStorage.setItem("jwt", response.data.jwt);
            return response.data.wt;
        } catch (error) {
            console.log("Error fetching otp:", error);
        }
    }    
)

export const signup = createAsyncThunk<any, any>("/auth/signup", 
    async(signupRequest, {rejectWithValue}) => {
        try {
            const response = await api.post("/auth/signup", signupRequest)
            console.log("Login otp:", response.data);
            localStorage.setItem("jwt", response.data.jwt);
            return response.data.wt;
        } catch (error) {
            console.log("Error fetching otp:", error);
        }
    }    
)

export const fetchUserProfile = createAsyncThunk<any, any>("auth/fetchUserProfile", 
    async({jwt}, {rejectWithValue}) => {
        try {
            const response = await api.get("/api/users/profile", {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            })
            console.log("User Profile:", response.data);
            return response.data;
        } catch (error) {
            console.log("Error fetching otp:", error);
        }
    }    
)

export const logout = createAsyncThunk<any, any>("/auth/logout", 
  async (navigate, { rejectWithValue }) => {
    try {
      localStorage.clear();
      console.log("logout success");
      navigate("/")
    } catch (error) {
      console.log("error - - -", error);
    }
  }
)

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/verify-otp", null, {
        params: { email, otp },
      });
      return response.data; // { status: "success", message: "OTP verified" }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "OTP verification failed");
    }
  }
);

interface AuthState{
  jwt: string | null,
  otpSent: boolean,
  isLoggedIn: boolean,
  user: any | null,
  loading: boolean,
}

const initialState:AuthState = {
  jwt: null,
  otpSent: false,
  isLoggedIn: false,
  user: null,
  loading: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:{},
  extraReducers:(builder) =>{
    builder.addCase(sendLoginSignupOtp.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(sendLoginSignupOtp.fulfilled, (state) => {
      state.loading = false;
      state.otpSent = true;
    })
    builder.addCase(sendLoginSignupOtp.rejected, (state) => {
      state.loading = false;
      state.otpSent = false;
    })
    builder.addCase(signing.fulfilled, (state, action) => {
      state.jwt = action.payload;
      state.isLoggedIn = true;
    })
    builder.addCase(signup.fulfilled, (state, action) => {
      state.jwt = action.payload;
      state.isLoggedIn = true;
    })
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.jwt = null;
      state.isLoggedIn = false;
      state.user = null;
    })
  }
})

export default authSlice.reducer;