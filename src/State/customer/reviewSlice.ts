import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "config/Api";

interface Review {
  id: number;
  reviewText: string;
  rating: number;
  productImages: string[];
  createdAt: string;
  user: {
    fullName: string;
    email: string;
  };
}

interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: null,
};

export const fetchReviews = createAsyncThunk<Review[], number>(
  "reviews/fetchReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/review/products/${productId}/reviews`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue("Failed to load reviews");
    }
  }
);

export const addReview = createAsyncThunk<
  Review,
  { jwt: string; productId: number; data: { reviewText: string; reviewRating: number; productImages: string[] } }
>(
  "reviews/addReview",
  async ({ jwt, productId, data }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/review/products/${productId}/reviews`, data, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue("Failed to add review");
    }
  }
);

export const deleteReview = createAsyncThunk<void, { jwt: string; reviewId: number }>(
  "reviews/deleteReview",
  async ({ jwt, reviewId }, { rejectWithValue }) => {
    try {
      await api.delete(`/review/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
    } catch (error: any) {
      return rejectWithValue("Failed to delete review");
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.reviews = [];
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter((r) => r.id !== action.meta.arg.reviewId);
      });
  },
});

export default reviewSlice.reducer;