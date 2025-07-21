import { Avatar, Box, Grid, IconButton, Rating } from '@mui/material'
import Delete from '@mui/icons-material/Delete';
import React from 'react'
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'State/Store';

const ReviewCard = ({ review, onDelete }: { review: any; onDelete: () => void }) => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <div className="flex items-start justify-between border-b pb-4 mb-4">
      <Grid container spacing={2}>
        {/* Avatar */}
        <Grid size={{xs: 1}}>
          <Avatar sx={{ bgcolor: "#9155FD", width: 48, height: 48 }}>
            {review.user.fullName.charAt(0).toUpperCase()}
          </Avatar>
        </Grid>

        {/* Review Content */}
        <Grid size={{xs: 10}} className="pl-10">
          <div className="space-y-1">
            <p className="font-semibold text-lg">{review.user.fullName}</p>
            <p className="text-gray-500 text-sm">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
            <Rating value={review.rating} precision={0.5} readOnly />
            <p className="mt-1">{review.reviewText}</p>

            {/* If review has images */}
            {review.productImages && review.productImages.length > 0 && (
              <div className="flex gap-2 mt-2">
                {review.productImages.map((img: string, idx: number) => (
                  <img
                    key={idx}
                    src={img}
                    alt="review"
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>
        </Grid>

        {/* Delete Button */}
        <Grid size={{xs: 1}} className="flex justify-end">
          {user?.email === review.user.email && (
              <IconButton onClick={onDelete}>
                  <Delete sx={{ color: "red" }} />
              </IconButton>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ReviewCard