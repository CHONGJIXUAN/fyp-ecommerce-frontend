import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "config/Api";
import { Order, OrderStatus } from "types/orderTypes";

interface SellerOrderState {
    orders: Order[];
    selectedOrder: Order | null;
    loading: boolean;
    error: string | null;
}

const initialState: SellerOrderState = {
    orders: [],
    selectedOrder: null,
    loading: false,
    error: null,
}

export const fetchSellerOrders = createAsyncThunk<Order[], string>(
  'sellerOrders/fetchSellerOrders',
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get('/sellers/orders/all', {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      console.log("fetch seller orders", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error", error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk<Order,
{
  jwt: string,
  orderId: number,
  orderStatus: OrderStatus
}>(
  'sellerOrders/updateOrderStatus',
  async ({ jwt, orderId, orderStatus }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/sellers/orders/${orderId}/status/${orderStatus}`,
        null,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      console.log("order status updated", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteOrder = createAsyncThunk<any, { jwt: string, orderId: number }>(
  'sellerOrders/deleteOrder',
  async ({ jwt, orderId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/sellers/orders/${orderId}/delete`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const sellerOrderSlice = createSlice({
    name: 'sellerOrders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchSellerOrders.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchSellerOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
            state.loading = false;
            state.orders = action.payload;
        })
        .addCase(fetchSellerOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(updateOrderStatus.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateOrderStatus.fulfilled, (state, action: PayloadAction<Order>) => {
            const updatedOrder = action.payload;
            const index = state.orders.findIndex(order => order.id === updatedOrder.id);
            if (index !== -1) {
              state.orders[index] = updatedOrder;
            }
        })
        .addCase(updateOrderStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(deleteOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = state.orders.filter(order => order.id !== action.meta.arg.orderId);
        })
        .addCase(deleteOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
})

export default sellerOrderSlice.reducer;