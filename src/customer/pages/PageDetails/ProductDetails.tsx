import React, { useEffect, useState } from 'react'
import StarIcon from '@mui/icons-material/Star';
import { green, teal, yellow } from '@mui/material/colors';
import { Box, Button, Divider, Rating, TextField } from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WalletIcon from '@mui/icons-material/Wallet';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SimilarProduct from './SimilarProduct';
import Review from '../Review/Review';
import ReviewCard from '../Review/ReviewCard';
import { useAppDispatch, useAppSelector } from 'State/Store';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductById } from 'State/customer/ProductSlice';
import { addItemToCart } from 'State/customer/cartSlice';
import { addReview, deleteReview, fetchReviews } from 'State/customer/reviewSlice';
import { addProductToWishlist } from 'State/customer/wishlistSlice';

const ProductDetails = () => {
    const navigate = useNavigate();
    const [Quantity, setQuantity] = React.useState(1);
    const dispatch = useAppDispatch();
    const { productId } = useParams<{ productId: string }>();
    const {product} = useAppSelector((store) => store);
    const [activeImage, setActiveImage] = useState(0);
    const { reviews, loading } = useAppSelector((state) => state.review);
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState<number | null>(0);
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (!jwt) {
            navigate("/login");
            return;
        }

        if (productId) {
            dispatch(fetchProductById(productId));
            dispatch(fetchReviews(Number(productId))); 
        }
    }, [productId, dispatch, navigate]);

    const handleActiveImage = (value:number)=> () => {
        setActiveImage(value)
    }


    const handleAddToCart = () => {
        const jwt = localStorage.getItem("jwt");
        
        const request = {
            productId: product.product?.id,     
            quantity: product.product?.quantity || 1,     
            size: product.product?.sizes ?? "",              
        };

        dispatch(addItemToCart({ jwt, request }));
    };

    const handleDeleteReview = (reviewId: number) => {
        const jwt = localStorage.getItem("jwt") || "";
        dispatch(deleteReview({ jwt, reviewId }))
            .unwrap()
            .then(() => {
            alert("Review deleted successfully!");
            })
            .catch(() => {
            alert("Failed to delete review.");
            });
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
    <div className='px-5 lg:px-20 pt-10'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
            <section className='flex flex-col lg:flex-row gap-5'>
                <div className='w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3'>
                    {product.product?.images.map((item:any, index) => 
                    <img onClick={handleActiveImage(index)} className='lg:w-full w-[50] cursor-pointer rounded-md' 
                    src={item} />)} 
                </div>
                <div className='w-full lg:w-[85%]'>
                    <img className="w-full rounded-md" 
                    src={product.product?.images[activeImage]} alt="" />
                </div>
            </section>
            <section>
                <h1 className='font-bold text-lg text-primary'>{product.product?.seller?.businessDetails.businessName}</h1>
                <p className='text-gray-500 font-semibold'>{product.product?.title}</p>
                <div className='flex justify-between items-center py-2  w-[180px] px-3 mt-5'>
                    {product.product?.numRatings && product.product.numRatings > 0 ? (
                        <div className="flex justify-between items-center py-2 border w-[180px] px-3 mt-5">
                            <div className="flex gap-1 items-center">
                                <span>{product.product.numRatings} Ratings</span>
                                <StarIcon sx={{ color: yellow[400], fontSize: "17px" }} />
                            </div>               
                        </div>
                    ) : null}
                    {/* <Divider orientation='vertical' flexItem />
                    <span>
                       {product.product?.numRatings}
                    </span> */}
                </div>
                <div>
                    <div className='price flex items-center gap-3 mt-5 text-2xl'>
                        <span className="font-sans text-gray-800">
                            RM {product.product?.sellingPrice}
                        </span>
                        {/* <span className="line-through text-gray-400">
                            RM 100
                        </span> */}
                        {/* <span className='text-primary font-semibold'>
                            {product.product?.discountPercent}%
                        </span> */}
                    </div>
                    <p className='text-sm'>Inclusive of all taxes. Free Shipping above RM 100.</p>
                </div>
                <div className='mt-7 space-y-3'>
                    <div className='flex items-center gap-4'>
                        <ShieldIcon sx={{color:teal[500]}} />
                        <p>Authentic & Quality</p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <WorkspacePremiumIcon sx={{color:teal[500]}} />
                        <p>100% money back guarantee</p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <LocalShippingIcon sx={{color:teal[500]}} />
                        <p>Free Shipping & Returns</p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <WalletIcon sx={{color:teal[500]}} />
                        <p>Pay on delivery might be available</p>
                    </div>
                </div>
                <div className='mt-7 space-y-2'>
                    <h1>QUANTITY</h1>
                    <div className='flex items-center gap-2 w-[140px] justify-between'>
                        <Button disabled={Quantity == 1} onClick={() => setQuantity(Quantity - 1)}>
                            <RemoveIcon />
                        </Button>
                        <span>{Quantity}</span>
                        <Button onClick={() => setQuantity(Quantity + 1)}>
                            <AddIcon />
                        </Button>
                    </div>
                </div>
                <div className="mt-5 cursor-pointer" onClick={() => navigate("/")}>
                    <h3 className="text-blue-600 hover:underline">Go back to shopping</h3>
                </div>
                <div className='mt-12 flex items-center gap-5'>
                    <Button 
                        onClick={() => {
                            const jwt = localStorage.getItem("jwt");
                            const sizeValue = Array.isArray(product.product?.sizes)
                                ? product.product?.sizes[0] || "" 
                                : product.product?.sizes || "";

                            type AddItemRequest = {
                                productId: number;
                                quantity: number;
                                size: string;
                            };

                            const request: AddItemRequest = {
                                productId: product.product?.id || 0, 
                                quantity: Quantity,
                                size: sizeValue
                            };

                            if (jwt && request.productId) {
                                dispatch(addItemToCart({ jwt, request }))
                                .unwrap() 
                                .then(() => {
                                    alert("Product has been added to the cart!");
                                })
                                .catch(() => {
                                    alert("Failed to add product to the cart. Please try again.");
                                });
                            } else {
                                console.error("Missing JWT or Product ID");
                            }
                        }}
                        fullWidth
                        sx={{py:"1rem"}} 
                        variant='contained'
                        startIcon= {<AddShoppingCartIcon />}>
                        Add To Bag
                    </Button>
                    <Button 
                        onClick={() => {
                            if (product.product?.id) {
                                dispatch(addProductToWishlist({ productId: product.product.id }))
                                .unwrap()
                                .then(() => {
                                    alert("Product added to wishlist!");
                                })
                                .catch(() => {
                                    alert("Failed to add product to wishlist.");
                                });
                            }
                        }}
                        fullWidth
                        variant='outlined'
                        sx={{py:"1rem"}} 
                        startIcon= {<FavoriteBorderIcon />}>
                        Whish List
                    </Button>
                </div>
                <div className='mt-5'>
                    <p>{product.product?.description}</p>
                </div>
               <div id="reviews" className="mt-12">
                    <h2 className="text-xl font-semibold mb-3">Customer Reviews</h2>
                    <div>
                        {loading ? (
                            <p>Loading reviews...</p>
                            ) : reviews.length === 0 ? (
                            <p>No reviews yet. Be the first to review!</p>
                            ) : (
                            reviews.map((rev) => (
                                <ReviewCard key={rev.id} review={rev} onDelete={() => handleDeleteReview(rev.id)} />
                            ))
                        )}
                    </div>
                </div>
                <Box className="p-4 border rounded-md shadow-sm mt-6 space-y-4">
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
        </div>
        
        {/* <div className='mt-20'>
            <h1 className='text-lg font-bold'>
                Similar Products
            </h1>
            <div className='pt-5'>
                <SimilarProduct />
            </div>
        </div> */}

    </div>
  )
}

export default ProductDetails