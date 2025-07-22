import React, { useEffect } from 'react'
import RecycleProductsCategory from './RecycleProductCategory/RecycleProductCategory'
import CategoryGrid from './CategoryGrid/CategoryGrid'
import Deal from './Deal/Deal'
import ShopByCategory from './ShopByCategory/ShopByCategory'
import { Button } from '@mui/material'
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'State/Store'
import { fetchHomeCategories } from 'State/admin/adminSlice'
import { fetchDeals } from 'State/admin/dealSlice'
import { fetchAllProducts } from 'State/customer/ProductSlice'
import ProductCard from '../Product/ProductCard'


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { products, loading, error } = useAppSelector((state) => state.product);

  
  useEffect(() => {
    dispatch(fetchAllProducts({})); 
  }, [dispatch]);

  return (
    <div className="space-y-10 relative pb-20">
      {/* ✅ Hero Banner */}
      <section className="relative h-[300px] lg:h-[500px] w-full">
        <img
          src="https://t4.ftcdn.net/jpg/02/16/47/35/360_F_216473592_NefHePTpMfvYMNjD3UQTUVJy7DFPwqKA.jpg"
          alt="Eco Shopping Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1/2 left-6 lg:left-20 transform -translate-y-1/2 text-white space-y-4">
          <h1 className="text-3xl lg:text-6xl font-bold">
            Shop <span className="text-green-400">Sustainable</span>
          </h1>
          <p className="text-lg lg:text-2xl">
            Eco-Friendly Products at Your Fingertips
          </p>
          {/* <Button
            onClick={() => navigate("/products")}
            variant="contained"
            size="large"
            color="success"
          >
            Start Shopping
          </Button> */}
        </div>
      </section>

      {/* ✅ Product Grid */}
      <section className="lg:px-20">
        <h2 className="text-lg lg:text-3xl font-bold text-primary mb-6 text-center">
          Featured Products
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-500">Failed to load products.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product:any) => (
              <div
                key={product.id}
                className="cursor-pointer"
                onClick={() =>
                  navigate(
                    `/product-details/${encodeURIComponent(product.category?.categoryId || "General")}/${encodeURIComponent(product.title.replace(/\s+/g, "-"))}/${product.id}`
                  )
                }
              >
                <ProductCard item={product} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ✅ Become Seller Banner */}
      <section className="lg:px-20 relative h-[250px] lg:h-[350px] mt-10">
        <img
          className="w-full h-full object-cover rounded-lg"
          src="https://static.vecteezy.com/system/resources/thumbnails/021/609/331/small/golden-business-promotion-decoration-with-shopping-bag-and-podium-for-sale-banner-with-space-for-text-free-vector.jpg"
          alt="Become Seller"
        />
        <div className="absolute top-1/2 left-6 lg:left-40 transform -translate-y-1/2 text-white font-semibold lg:text-4xl space-y-3">
          <h1>Sell Your Products</h1>
          <p className="text-lg md:text-2xl">
            With <span className="logo text-green-300">GreenShopping</span>
          </p>
          <div className="pt-6">
            <Button
              onClick={() => navigate("/become-seller")}
              variant="contained"
              size="large"
              color="success"
            >
              Become Seller
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;