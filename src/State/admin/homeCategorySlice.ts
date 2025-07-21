import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "config/Api";
import { ReactNode } from "react";

export interface HomeCategory {
  level: ReactNode;
  parentCategoryId: string;
  id?: number;
  categoryId: string;
  section: string; 
  name: string;
  image: string;
}

interface HomeCategoryState {
  categories: HomeCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: HomeCategoryState = {
  categories: [],
  loading: false,
  error: null,
};


export const fetchHomeCategories = createAsyncThunk(
  "homeCategory/fetchHomeCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/home/home-category");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch home categories");
    }
  }
);

export const createHomeCategories = createAsyncThunk<HomeCategory[], HomeCategory[]>(
  "homeCategory/createHomeCategories",
  async (categories, { rejectWithValue }) => {
    try {
      const response = await api.post("/home/create/categories", categories);
      return response.data.categories || categories; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to create categories");
    }
  }
);

export const updateHomeCategory = createAsyncThunk(
  "homeCategory/updateHomeCategory",
  async ({ id, data }: { id: number; data: any }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/home/home-category/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to update category");
    }
  }
);

export const deleteHomeCategory = createAsyncThunk(
  "homeCategory/deleteHomeCategory",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`/home/home-category/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete category");
    }
  }
);

const homeCategorySlice = createSlice({
  name: "homeCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch
    builder.addCase(fetchHomeCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchHomeCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchHomeCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create
    builder.addCase(createHomeCategories.fulfilled, (state, action) => {
      state.categories.push(...action.payload);
    });

    // Update
    builder.addCase(updateHomeCategory.fulfilled, (state, action) => {
      const index = state.categories.findIndex((cat) => cat.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    });
    //Delete
    builder.addCase(deleteHomeCategory.fulfilled, (state, action) => {
      state.categories = state.categories.filter((cat: any) => cat.id !== action.payload);
    });
  },
});

export default homeCategorySlice.reducer;