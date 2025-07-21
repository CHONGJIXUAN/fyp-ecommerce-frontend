import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "config/Api";

export interface Category {
  id?: number;
  name: string;
  categoryId: string;
  level: number;
  image?: string;
  parentCategoryId?: string;
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

// ✅ Fetch All
export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/categories/getAllCategory");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch categories");
    }
  }
);

// ✅ Create
export const createHomeCategory = createAsyncThunk(
  "homeCategory/create",
  async (data: Partial<Category>, { rejectWithValue }) => {
    try {
      const response = await api.post("/categories/update", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to create category");
    }
  }
);

// ✅ Update
export const updateCategory = createAsyncThunk(
  "categories/update",
  async ({ id, category }: { id: number; category: Category }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/categories/${id}`, category);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to update category");
    }
  }
);

// ✅ Delete
export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`/categories/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete category");
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createHomeCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.categories[index] = action.payload;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((c) => c.id !== action.payload);
      });
  },
});

export default categorySlice.reducer;