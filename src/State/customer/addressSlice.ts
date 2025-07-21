import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "config/Api";

interface Address {
  id: number;
  name: string;
  locality: string;
  fullAddress: string;
  city: string;
  state: string;
  postCode: string;
  mobile: string;
}

interface AddressState {
  addresses: Address[];
  loading: boolean;
  error: string | null;
}

const initialState: AddressState = {
  addresses: [],
  loading: false,
  error: null,
};

export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/addresses", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch addresses");
    }
  }
);

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async ({ jwt, values }: { jwt: string; values: any }, { rejectWithValue }) => {
    try {
      const response = await api.post("/addresses", values, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to add address");
    }
  }
);

export const updateAddress = createAsyncThunk<
  Address, // response type
  { jwt: string; id: number; data: any }, // payload type
  { rejectValue: string }
>(
  "address/updateAddress",
  async ({ jwt, id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/addresses/${id}`, data, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return response.data; // Updated address
    } catch (error: any) {
      return rejectWithValue("Failed to update address");
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async ({ jwt, id }: { jwt: string; id: number }, { rejectWithValue }) => {
    try {
      await api.delete(`/addresses/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete address");
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.addresses.push(action.payload);
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter((a) => a.id !== action.payload);
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        const index = state.addresses.findIndex(addr => addr.id === action.payload.id);
        if (index !== -1) {
            state.addresses[index] = action.payload; // Replace with updated address
        }
    });
  },
});

export default addressSlice.reducer;