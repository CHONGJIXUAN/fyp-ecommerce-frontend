import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "config/Api";
import { Product } from "types/ProductTypes";

export const fetchSellerProducts = createAsyncThunk<Product[], any>(
    "sellerProduct/fetchSellerProducts",
    async (jwt, { rejectWithValue }) => {
        try {
            const response = await api.get(`/sellers/products/getProductsBySellerId`,{
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
            })

            const data = response.data;
            console.log("Fetched products:", data);
            return data;
        } catch (error) {
            console.error("Error fetching seller products:", error);
            throw error;
        }
    }
)

export const updateProduct = createAsyncThunk(
  "sellerProducts/updateProduct",
  async ({
    jwt,
    productId,
    data,
  }: {
    jwt: string;
    productId: number;
    data: {
      title: string;
      sellingPrice: number;
      color: string;
      sizes: string[];
      images: string[];
    };
  }) => {
    const response = await api.put(`/sellers/products/${productId}`, data, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  }
);

export const createProduct = createAsyncThunk<Product, { request: any, jwt: string | null }>(
  "/sellerProduct/createProduct",
  async (args, { rejectWithValue }) => {
    const { request, jwt } = args;
    try {
      const response = await api.post(`/sellers/products/createProduct`, request, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Product created successfully:", response.data);
      return response.data;
    } catch (error) {
      console.log("error - - -", error);
      // throw error
    }
  }
);

interface SellerProductState {
    products: Product[];
    loading: boolean;
    error: string | null | undefined;
}

const initialState: SellerProductState = {
    products: [],
    loading: false,
    error: null,
};

const sellerProductSlice = createSlice({
    name: "sellerProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSellerProducts.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchSellerProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        });

        builder.addCase(fetchSellerProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(createProduct.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products.push(action.payload);
        });

        builder.addCase(createProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            const updatedProduct = action.payload;
            const index = state.products.findIndex((p) => p.id === updatedProduct.id);
            if (index !== -1) {
            state.products[index] = updatedProduct;
            }
      });
    }
})

export default sellerProductSlice.reducer;