import React, { useEffect } from 'react'
import WishlistProductCard from '../Wishlist/WishlistProductCard';
import { getWishlistByUserId } from 'State/customer/wishlistSlice';
import { useAppDispatch, useAppSelector } from 'State/Store';

const SavedCards = () => {
  const dispatch = useAppDispatch();
  const { wishlist, loading } = useAppSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getWishlistByUserId());
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-5">My Saved Wishlist Items</h2>

      {loading ? (
        <p>Loading wishlist...</p>
      ) : wishlist && wishlist.products && wishlist.products.length > 0 ? (
        <div className="flex flex-wrap gap-5">
          {wishlist.products.map((item) => (
            <WishlistProductCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p>No saved items yet. Start adding products to your wishlist!</p>
      )}
    </div>
  );
};

export default SavedCards