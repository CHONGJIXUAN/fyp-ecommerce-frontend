import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "config/Api";

export interface Deal {
  category: any;
  id?: number;
  discount: number;
  homeCategory: {
    id: number;
    name: string;
  };
}

interface DealState {
  deals: Deal[];
  loading: boolean;
  error: string | null;
  dealCreated: boolean;
}

const initialState: DealState = {
  deals: [],
  loading: false,
  error: null,
  dealCreated: false,
};

export const createDeal = createAsyncThunk(
  "deals/createDeal",
  async (deal: Deal, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/deals/create", deal, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to create deal");
    }
  }
);

export const fetchDeals = createAsyncThunk("deals/fetchDeals", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/admin/deals", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue("Failed to fetch deals");
  }
});

export const updateDeal = createAsyncThunk(
  "deals/updateDeal",
  async ({ id, deal }: { id: number; deal: Deal }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/deals/${id}`, deal, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue("Failed to update deal");
    }
  }
);

export const deleteDeal = createAsyncThunk("deals/deleteDeal", async (id: number, { rejectWithValue }) => {
  try {
    await api.delete(`/admin/deals/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    return id;
  } catch (error: any) {
    return rejectWithValue("Failed to delete deal");
  }
});

const dealSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {
    resetDealCreated(state) {
      state.dealCreated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createDeal.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.deals.push(action.payload);
        state.dealCreated = true;
      })
      .addCase(createDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.deals = action.payload;
      })
      // Update
      .addCase(updateDeal.fulfilled, (state, action) => {
        const index = state.deals.findIndex((d) => d.id === action.payload.id);
        if (index !== -1) state.deals[index] = action.payload;
      })
      // Delete
      .addCase(deleteDeal.fulfilled, (state, action) => {
        state.deals = state.deals.filter((d) => d.id !== action.payload);
      });
  },
});

export const { resetDealCreated } = dealSlice.actions;
export default dealSlice.reducer;