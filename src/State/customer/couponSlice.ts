import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "config/Api";
import { Cart } from "types/cartTypes";

export interface Coupon {
  id: number;
  code: string;
  discountPercentage: number;
  minimumOrderValue: number;
  validityStartDate?: string;
  validityEndDate?: string;
  status: "ACTIVE" | "INACTIVE";
}

interface CouponState {
  coupons: Coupon[];
  loading: boolean;
  error: string | null;
}

const initialState: CouponState = {
  coupons: [],
  loading: false,
  error: null,
};

export const fetchCoupons = createAsyncThunk<Coupon[]>(
  "coupon/fetchCoupons",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/coupon/admin/all");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch coupons");
    }
  }
);

export const createCoupon = createAsyncThunk(
  "coupon/createCoupon",
  async (couponData: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/coupon/admin/create", couponData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to create coupon");
    }
  }
);


export const deleteCoupon = createAsyncThunk<number, number>(
  "coupon/deleteCoupon",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/coupon/admin/delete/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete coupon");
    }
  }
);

export const updateCoupon = createAsyncThunk(
  "coupon/update",
  async ({ id, updatedData }: { id: number; updatedData: Partial<Coupon> }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/coupon/admin/update/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to update coupon");
    }
  }
);


export const applyCoupon = createAsyncThunk(
  "coupon/applyCoupon",
  async (
    {
      apply,
      code,
      orderValue,
      jwt,
    }: { apply: boolean; code: string; orderValue: number; jwt: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        `/coupon/apply?apply=${apply}&code=${code}&orderValue=${orderValue}`,
        {},
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      return response.data; // Updated cart
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to apply coupon");
    }
  }
);

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoupons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.coupons.push(action.payload);
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        const index = state.coupons.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.coupons[index] = action.payload;
        }
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.coupons = state.coupons.filter((c) => c.id !== action.payload);
      });
  },
});


export default couponSlice.reducer;
