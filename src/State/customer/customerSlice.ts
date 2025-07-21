import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "config/Api";
import { HomeCategory, HomeData } from "types/HomeCategoryTypes";

interface HomeState {
  homePageData: HomeData | null;
  homeCategories: HomeCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  homePageData: null,
  homeCategories: [],
  loading: false,
  error: null,
};


export const fetchHomePageData = createAsyncThunk<HomeData, void, { rejectValue: string }>(
  "home/fetchHomePageData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/home-page");
      console.log("Home Page Data:", response.data);
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to fetch home page data";
      console.error("Error fetching home page:", errorMessage, error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const createHomeCategories = createAsyncThunk<HomeData, HomeCategory[], { rejectValue: string }>(
  "home/createHomeCategories",
  async (homeCategories, { rejectWithValue }) => {
    try {
      const response = await api.post("/home/create/categories", homeCategories);
      console.log("Home categories:", response.data);
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to create home categories";
      console.error("Error creating home categories:", errorMessage, error);
      return rejectWithValue(errorMessage);
    }
  }
);

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchHomePageData.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchHomePageData.fulfilled, (state, action) => {
            state.loading = false;
            state.homePageData = action.payload;
        })
        .addCase(fetchHomePageData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to fetch home page data";
        })
        .addCase(createHomeCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createHomeCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.homePageData = action.payload; 
        })
        .addCase(createHomeCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to create home categories";
        });
    },
})

export default homeSlice.reducer;
