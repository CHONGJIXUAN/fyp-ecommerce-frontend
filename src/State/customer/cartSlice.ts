import { red } from "@mui/material/colors";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "config/Api";
import { Cart, CartItem } from "types/cartTypes";

import { applyCoupon } from "./couponSlice";
import { sumCartItemSellingPrice } from "Util/sumCartItemSellingPrice";

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

export const fetchUserCart = createAsyncThunk<Cart, string>(
  "cart/fetchUserCart",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get('/cart/findUserCart', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("Cart fetched ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ", error.response);
      return rejectWithValue("Failed to fetch user cart");
    }
  }
);

interface AddItemRequest {
    productId: number | undefined;
    size: string | string[];
    quantity: number;
}


export const addItemToCart = createAsyncThunk<CartItem, { jwt: string | null; request: AddItemRequest }, { rejectValue: string }>(
  "cart/addItemToCart",
  async ({ jwt, request }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/cart/add`, request, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("Cart added ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ", error.response);
      return rejectWithValue("Failed to add item to cart");
    }
  }
);

export const deleteCartItem = createAsyncThunk<
  any,
  { jwt: string; cartItemId: number }
>(
  "cart/deleteCartItem",
  async ({ jwt, cartItemId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/cart/item/${cartItemId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete cart item"
      );
    }
  }
);

export const updateCartItem = createAsyncThunk<
  any,
  { jwt: string | null; cartItemId: number; cartItem: any }
>(
  "cart/updateCartItem",
  async ({ jwt, cartItemId, cartItem }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/cart/item/${cartItemId}`,
        cartItem,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("Cart item updated ", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update cart item"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCartState: (state) => {
        state.cart = null;
        state.loading = false;
        state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(fetchUserCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    }); 
    builder.addCase(addItemToCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addItemToCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
      if(state.cart){
        state.cart.cartItems.push(action.payload);
      }
      state.loading = false;
    });
    builder.addCase(addItemToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(deleteCartItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteCartItem.fulfilled, (state, action) => {
      if (state.cart) {
        state.cart.cartItems = state.cart.cartItems.filter(
          (item:CartItem) => item.id !== action.meta.arg.cartItemId
        );
        const sellingPrice = sumCartItemSellingPrice(state.cart?.cartItems || []);
        state.cart.totalSellingPrice = sellingPrice;
      }
      state.loading = false;
    });
    builder.addCase(deleteCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(updateCartItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCartItem.fulfilled, (state, action) => {
        if(state.cart){
            const index = state.cart.cartItems.findIndex(
                (item:CartItem) => item.id === action.meta.arg.cartItemId
            );
            if (index !== -1) {
                state.cart.cartItems[index] = {
                ...state.cart.cartItems[index],
                ...action.payload,
                };
            }
            const sellingPrice = sumCartItemSellingPrice(state.cart?.cartItems || []);
            state.cart.totalSellingPrice = sellingPrice;
        }
        state.loading = false;
    })
    builder.addCase(updateCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    builder.addCase(applyCoupon.fulfilled, (state, action) => {
      state.cart = action.payload; 
    })
  }
});

export default cartSlice.reducer;
export const { resetCartState } = cartSlice.actions;