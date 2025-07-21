import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "config/Api";
import { Order, OrderItem, OrderState } from "types/orderTypes";
import { Address } from "types/userTypes";

const initialState: OrderState = {
  orders: [],
  orderItem: null,
  currentOrder: null,
  paymentOrder: null,
  loading: false,
  error: null,
  orderCanceled: false,
};

const API_URL = "/orders";

export const fetchUserOrderHistory = createAsyncThunk<Order[], string>(
  "orders/fetchUserOrderHistory",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("order history fetched ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ", error.response);
      return rejectWithValue(
        error.response.data.error || "Failed to fetch order history"
      );
    }
  }
);

export const fetchOrderById = createAsyncThunk<
  Order,
  { orderId: number; jwt: string }
>(
  "orders/fetchOrderById",
  async ({ orderId, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.get<Order>(`${API_URL}/${orderId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("order fetched ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ", error.response);
      return rejectWithValue("Failed to fetch order");
    }
  }
);

export const createOrder = createAsyncThunk<any, any>(
  "order/createOrder",
  async ({ addressId, jwt, paymentMethod }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/orders/payment`,
        null, 
        {
          headers: { Authorization: `Bearer ${jwt}` },
          params: { addressId, paymentMethod },
        }
      );

      console.log("Payment Response:", response.data);
      return response.data; // Contains payment link URL
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to create order");
    }
  }
);

export const fetchOrderItemById = createAsyncThunk<
  OrderItem,
  { orderItemId: number; jwt: string }
>(
  "orders/fetchOrderItemById",
  async ({ orderItemId, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.get<OrderItem>(`${API_URL}/item/${orderItemId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("order item fetched ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ", error.response);
      return rejectWithValue("Failed to create order");
    }
  }
);

export const paymentSuccess = createAsyncThunk<
  any,
  { paymentId: string; jwt: string; paymentLinkId: string },
  { rejectValue: string }
>(
  "orders/paymentSuccess",
  async ({ paymentId, jwt, paymentLinkId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/payment/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        params: { paymentLinkId }
      });

      console.log("payment success ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ", error.response);
      return rejectWithValue("Failed to fetch payment status");
    }
  }
);

export const cancelOrder = createAsyncThunk<any, { jwt: string; orderId: any }>(
  "orders/cancelOrder",
  async ({ jwt, orderId }) => {
    const response = await api.put(`/orders/${orderId}/cancel`, null, {
      headers: { Authorization: `Bearer ${jwt}` }
    });
    console.log("Order cancelled successfully", response.data);
    return response.data;
  }
);

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserOrderHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.orderCanceled = false;
            })
            .addCase(fetchUserOrderHistory.fulfilled, (state, action: PayloadAction<Order[]>) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchUserOrderHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderById.fulfilled, (state, action: PayloadAction<Order>) => {
                state.loading = false;
                state.currentOrder = action.payload;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.paymentOrder = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchOrderItemById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderItemById.fulfilled, (state, action) => {
                state.loading = false;
                state.orderItem = action.payload;
            })
            .addCase(fetchOrderItemById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(paymentSuccess.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(paymentSuccess.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.paymentOrder = action.payload as string;
            })
            .addCase(paymentSuccess.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(cancelOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.orderCanceled = false;
            })
            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orderCanceled = true;
                state.currentOrder = action.payload;
                state.orders = state.orders.map(order =>
                    order.id === action.payload.id ? action.payload : order
                );
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
})

export default orderSlice.reducer;