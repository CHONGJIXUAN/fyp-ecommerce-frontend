import React from 'react'
import RecycleProductsCategory from './RecycleProductCategory/RecycleProductCategory'
import CategoryGrid from './CategoryGrid/CategoryGrid'
import Deal from './Deal/Deal'
import ShopByCategory from './ShopByCategory/ShopByCategory'
import { Button } from '@mui/material'
import StorefrontIcon from '@mui/icons-material/Storefront';

const Home = () => {
  return (
    <>
        <div className='spayce-y-5 lg:space-y-10 relative pb-20'>
            <RecycleProductsCategory />
            <CategoryGrid />
            <div className='pt-20'>
                <h1 className='text-lg lg:text-4xl font-bold text-primary pb-5 lg:pb-10 text-center'>TODAY'S DEAL</h1>
                <Deal />
            </div>
            
            <div className='pt-20'>
                <h1 className='text-lg lg:text-4xl font-bold text-primary pb-5 lg:pb-20 text-center'>SHOP BY CATEGORY</h1>
                <ShopByCategory />
            </div>
            <section className='py-20'>
                <h1 className='text-lg lg:text-4xl font-bold text-primary pb-5 lg:pb-20 text-center'>SHOP BY CATEGORY</h1>
                <ShopByCategory />
            </section>
            <section className='lg:px-20 relative h-[200px] lg:h-[350px] object-cover'>
                <img className='w-full h-full'
                src="https://static.vecteezy.com/system/resources/thumbnails/004/299/830/small/shopping-online-on-phone-with-podium-paper-art-modern-pink-background-gifts-box-illustration-free-vector.jpg" 
                alt="" />
                <div className='absolute top-1/2 left-4 lg:left-[15rem] transform -translate-y-1/ font-semibold lg:text-4xl space-y-3'>
                    <h1>Sell your Product</h1>
                    <p className='text-lg md:text-2xl'>With <span className='logo'>GreenShopping</span></p>
                    <div className='pt-6 flex justify-center'>
                        <Button startIcon={<StorefrontIcon />} variant='contained' size='large'>Become Seller</Button>
                    </div>
                </div>
            </section>
        </div>
    </>
  )
}

export default Home