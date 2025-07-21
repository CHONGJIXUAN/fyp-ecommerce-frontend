import React, { useEffect, useState } from 'react'
import FilterSection from './FilterSection'
import ProductCard from './ProductCard'
import { Box, Divider, FormControl, IconButton, InputLabel, MenuItem, Pagination, Select, useMediaQuery, useTheme } from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useAppDispatch, useAppSelector } from 'State/Store';
import { fetchAllProducts } from 'State/customer/ProductSlice';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';


const Product = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const location = useLocation();

  const { product } = useAppSelector((store) => store);

  const handleSortChange = (event: any) => {
    setSort(event.target.value);
  };

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const [minPrice, maxPrice] = searchParams.get("price")?.split("-") || [];
    const color = searchParams.get("color");
    const minDiscount = searchParams.get("discount")
      ? Number(searchParams.get("discount"))
      : undefined;

    const pageNumber = page - 1;

    const newFilter = {
      category: categoryId || "",
      color: color || "",
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      minDiscount,
      sort,
      pageNumber
    };

    dispatch(fetchAllProducts(newFilter));
  }, [searchParams, location.search, page, sort, dispatch]);

  return (
    <div className="-z-10 mt-10">
      {/* ✅ Dynamic Category Name */}
      <div>
        <h1 className="text-3xl text-center font-bold text-gray-700 pb-5 px-9 uppercase space-x-2">
          {categoryId ? categoryId.replace(/_/g, " ") : "All Products"}
        </h1>
      </div>

      <div className="lg:flex">
        {/* ✅ Sidebar Filters */}
        <section className="filter_section hidden lg:block w-[20%]">
          <FilterSection />
        </section>

        {/* ✅ Product List */}
        <div className="w-full lg:w-[80%] space-y-5">
          <div className="flex justify-between items-center px-9 h-[40px]">
            <div className="relative w-[50%]">
              {!isLarge && (
                <IconButton>
                  <FilterAltIcon />
                </IconButton>
              )}
              {!isLarge && (
                <Box>
                  <FilterSection />
                </Box>
              )}
            </div>

            {/* ✅ Sort Dropdown */}
            <FormControl size="small" sx={{ width: "200px" }}>
              <InputLabel>Sort</InputLabel>
              <Select id="sort" value={sort} label="Sort" onChange={handleSortChange}>
                <MenuItem value={"price_low"}>Price: Low - High</MenuItem>
                <MenuItem value={"price_high"}>Price: High - Low</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Divider />

          {/* ✅ Products */}
          <section className="products_section grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 px-5 justify-center">
            {product.products.length > 0 ? (
              product.products.map((item) => <ProductCard key={item.id} item={item} />)
            ) : (
              <p className="text-center col-span-full">No products found</p>
            )}
          </section>

          {/* ✅ Pagination */}
          <div className="flex justify-center py-10">
            <Pagination
              onChange={(e, value) => handlePageChange(value)}
              count={product.totalPages || 1}
              page={page}
              variant="outlined"
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;