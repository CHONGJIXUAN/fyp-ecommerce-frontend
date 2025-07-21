import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "config/Api";
import { error, profile } from "console";
import { create } from "domain";
import { Seller } from "types/SellerTypes";

export const fetchSellerProfile = createAsyncThunk("/sellers/fetchSellerProfile", 
    async(jwt : string, {rejectWithValue}) => {
        try {
            const response = await api.get("/sellers/profile", {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log("Seller profile fetched successfully:", response.data);
            return response.data;
        } catch (error) {
            console.log("Error fetching seller profile:", error);
        }
    }    
)

export const updateSellerProfile = createAsyncThunk(
  "seller/updateSellerProfile",
  async ({ jwt, values }: { jwt: string; values: any }, { rejectWithValue }) => {
    try {
      const response = await api.put("/sellers/update-profile", values, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to update profile");
    }
  }
);

export const fetchAllSellers = createAsyncThunk(
  "seller/fetchAllSellers",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/sellers/getAllSellers", {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      console.log("Fetched sellers:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching sellers:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch sellers");
    }
  }
);

export const updateSellerStatus = createAsyncThunk(
  "seller/updateSellerStatus",
  async (
    { id, status, jwt }: { id: number; status: string; jwt: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.patch(
        `/sellers/admin/sellers/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to update status");
    }
  }
);

export const deleteSeller = createAsyncThunk(
  "seller/deleteSeller",
  async ({ id, jwt }: { id: number; jwt: string }, { rejectWithValue }) => {
    try {
      await api.delete(`/sellers/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return id; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete seller");
    }
  }
);

interface SellerState {
    sellers: any[],
    selectedSeller: any,
    profile: any,
    report: any,
    loading: boolean,
    error: any,
}

const initialState:SellerState = {
    sellers: [],
    selectedSeller: null,
    profile: null,
    report: null,
    loading: false,
    error: null,
}

const sellerSlice = createSlice({
    name: "sellers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchSellerProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchSellerProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        })
        .addCase(fetchSellerProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Update Profile
        .addCase(updateSellerProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateSellerProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        })
        .addCase(updateSellerProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Fetch All Sellers
        .addCase(fetchAllSellers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAllSellers.fulfilled, (state, action) => {
            state.loading = false;
            state.sellers = action.payload;
        })
        .addCase(fetchAllSellers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(updateSellerStatus.fulfilled, (state, action) => {
          const updatedSeller = action.payload;
          const index = state.sellers.findIndex(
            (seller) => seller.id === updatedSeller.id
          );
          if (index !== -1) {
            state.sellers[index] = updatedSeller;
          }
        })
        .addCase(deleteSeller.fulfilled, (state, action) => {
          state.sellers = state.sellers.filter((seller) => seller.id !== action.payload);
        });
    },
});

export default sellerSlice.reducer;