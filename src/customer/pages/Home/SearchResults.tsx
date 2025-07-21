import React, { useEffect } from 'react'
import ProductCard from '../Product/ProductCard';
import { useAppDispatch, useAppSelector } from 'State/Store';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchProducts } from 'State/customer/ProductSlice';

const SearchResults = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query");
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.product);
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      dispatch(searchProducts(query));
    }
  }, [query]);

  return (
    <div className="p-5">
      <h1 className="text-lg font-bold">Results for: {query}</h1>
      <button
          onClick={() => navigate("/")}
          className="text-blue-600 hover:underline font-medium"
        >
          ← Go Back to Home
        </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {products.length > 0 ? (
            products.map((item:any) => <ProductCard key={item.id} item={item} />)
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchResults