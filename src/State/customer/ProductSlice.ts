import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "config/Api";
import { Product } from "types/ProductTypes";

const API_URL = "/products";

export const fetchProductById = createAsyncThunk<any, any>(
  "products/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${productId}`);

      const data = response.data
      console.log("data: " + data)
      return data;

    } catch (error:any) {
        console.log("error: " + error)
      return rejectWithValue(error.message); 
    }
  }
)

export const searchProducts = createAsyncThunk<Product[], string>(
  "products/search",
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/search?query=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue("Failed to fetch products");
    }
  }
);

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async (filters: any, { rejectWithValue }) => {
    try {
      const response = await api.get("/products/getAllProducts", {
        params: filters 
      });
      console.log("All Products Data:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch products");
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ jwt, values }: { jwt: string; values: any }, { rejectWithValue }) => {
    try {
      const response = await api.put("/update-profile", values, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to update profile");
    }
  }
);


interface ProductState{
    product: Product | null;
    products: Product[];
    totalPages:number;
    loading:boolean;
    error: string | null | undefined | any;
    searchProduct: Product[]
}

const initialState:ProductState={
    product: null,
    products: [],
    totalPages: 1,
    loading: false,
    error: null,
    searchProduct: []
}

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });

    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchAllProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.content;
    });

    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(searchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(searchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });

    builder.addCase(searchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default productSlice.reducer;

