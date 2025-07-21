import React, { useEffect, useState } from 'react'
import ReviewCard from './ReviewCard'
import { Box, Button, Divider, Rating, TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'State/Store';
import { useNavigate, useParams } from 'react-router-dom';
import { addReview, deleteReview, fetchReviews } from 'State/customer/reviewSlice';
import { fetchProductById } from 'State/customer/ProductSlice';

const Review = () => {
  const dispatch = useAppDispatch();
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { product } = useAppSelector((state) => state.product);
  const { reviews, loading } = useAppSelector((state) => state.review);

  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState<number | null>(0);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
      dispatch(fetchReviews(Number(productId)));
    }
  }, [dispatch, productId]);

  const handleDeleteReview = (reviewId: number) => {
    const jwt = localStorage.getItem("jwt") || "";
    dispatch(deleteReview({ jwt, reviewId }))
      .unwrap()
      .then(() => alert("Review deleted successfully"))
      .catch(() => alert("Failed to delete review"));
  };

  const handleAddReview = () => {
    if (!reviewText || !rating) {
      alert("Please add review text and rating.");
      return;
    }

    const jwt = localStorage.getItem("jwt") || "";
    dispatch(
      addReview({
        jwt,
        productId: Number(productId),
        data: {
          reviewText,
          reviewRating: rating,
          productImages: images, 
        },
      })
    )
      .unwrap()
      .then(() => {
        alert("Review added successfully!");
        setReviewText("");
        setRating(0);
        setImages([]);
      })
      .catch(() => alert("Failed to add review."));
  };

  return (
    <div className="p-5 lg:px-20 flex flex-col lg:flex-row gap-20">
      {/* ✅ Product Section */}
      <section className="w-full md:w-1/2 lg:w-[30%] space-y-2">
        <img
          src={product?.images?.[0] || "/placeholder.jpg"}
          alt={product?.title || "Product"}
          className="w-full object-cover rounded"
        />
        <div>
          <p className="font-bold text-xl">{product?.seller?.businessDetails.businessName}</p>
          <p className="text-lg text-gray-600">{product?.title}</p>
          <div className="price flex items-center gap-3 mt-5 text-2xl">
            <span className="font-sans text-gray-800">RM {product?.sellingPrice}</span>
          </div>
        </div>
      </section>

      {/* ✅ Reviews + Add Review */}
      <section className="space-y-8 w-full">
        {/* Reviews List */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Customer Reviews</h2>
          {loading ? (
            <p>Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p>No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map((rev) => (
              <div key={rev.id} className="space-y-3">
                <ReviewCard
                  review={rev}
                  onDelete={() => handleDeleteReview(rev.id)}
                />
                <Divider />
              </div>
            ))
          )}
        </div>

        {/* ✅ Add Review Form */}
        <Box className="p-4 border rounded-md shadow-sm space-y-4">
          <h3 className="text-lg font-semibold">Write a Review</h3>
          <TextField
            label="Your Review"
            fullWidth
            multiline
            rows={3}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <Rating
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
            precision={0.5}
            size="large"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAddReview}
          >
            Submit Review
          </Button>
        </Box>
      </section>
      <div className="mt-8 text-center">
        <p
            onClick={() => navigate("/")}
            className="text-blue-600 cursor-pointer hover:underline font-medium"
        >
            ← Go back to shopping
        </p>
      </div>
    </div>
  );
};

export default Review