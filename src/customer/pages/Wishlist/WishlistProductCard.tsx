import React, { useState } from 'react'
import { Product } from 'types/ProductTypes'
import Close from '@mui/icons-material/Close';
import { useAppDispatch } from 'State/Store';
import { addProductToWishlist } from 'State/customer/wishlistSlice';
import { teal } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const WishlistProductCard = ({ item }: { item: Product }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation(); // ✅ Prevent navigation when clicking Close
    if (item.id) {
      dispatch(addProductToWishlist({ productId: item.id }));
    }
  };

  const handleNavigate = () => {
    navigate(`/product-details/${item.category?.categoryId}/${encodeURIComponent(item.title)}/${item.id}`);
  };

  return (
    <div
      className="w-60 relative cursor-pointer border rounded-lg shadow hover:shadow-lg transition"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleNavigate} // ✅ Only fires if you click outside Close button
    >
      <div className="w-full">
        <img
          src={item.images[0]}
          className="object-cover w-full h-48 rounded-t-lg"
          alt={item.title}
        />
      </div>

      <div className="p-3 space-y-1">
        <p className="font-semibold text-gray-800">{item.title}</p>
        <div className="price flex items-center gap-3">
          <span className="font-sans text-gray-800">RM {item.sellingPrice}</span>
        </div>
      </div>

      {/* ✅ Close button only visible on hover */}
      {isHovered && (
        <div className="absolute top-2 right-2">
          <button onClick={handleWishlist}>
            <Close
              className="cursor-pointer bg-white rounded-full p-1 shadow"
              sx={{ color: teal[500], fontSize: "2rem" }}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default WishlistProductCard