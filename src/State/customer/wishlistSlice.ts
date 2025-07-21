import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "config/Api";
import { Wishlist, WishlistState } from "types/wishlistTypes";

const initialState: WishlistState = {
    wishlist: null,
    loading: false,
    error: null,
}

export const getWishlistByUserId = createAsyncThunk(
    "wishlist/getWishlistByUserId",
    async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/wishlist`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log("wishlist fetch ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ", error);
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch wishlist"
      );
    }
  }
)

export const addProductToWishlist = createAsyncThunk(
  "wishlist/addProductToWishlist",
  async (
    { productId }: { productId: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        `/wishlist/add-product/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      console.log("add product ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ", error);
      return rejectWithValue(
        error.response?.data.message || "Failed to add product to wishlist"
      );
    }
  }
);

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        resetWishlistState: (state) => {
            state.wishlist = null;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getWishlistByUserId.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getWishlistByUserId.fulfilled, (state, action: PayloadAction<Wishlist>) => {
            state.loading = false;
            state.wishlist = action.payload;
        })
        builder.addCase(getWishlistByUserId.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(addProductToWishlist.pending, (state) => {
            state.loading = true;
            state.error = null;
        })  
        builder.addCase(addProductToWishlist.fulfilled, (state, action: PayloadAction<Wishlist>) => {
            state.loading = false;
            state.wishlist = action.payload;
        })
        builder.addCase(addProductToWishlist.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const { resetWishlistState } = wishlistSlice.actions;
export default wishlistSlice.reducer;