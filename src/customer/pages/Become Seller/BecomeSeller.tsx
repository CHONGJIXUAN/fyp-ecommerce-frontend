import React, { useState } from 'react'
import SellerAccountForm from './SellerAccountForm';
import SellerLoginForm from './SellerLoginForm';
import { Button } from '@mui/material';

const BecomeSeller = () => {
  const [isLogin, setIsLogin] = useState(false);
  const handleShowPage = () => {
    setIsLogin(!isLogin);
  }    
  return (
    <div className='grid md:gap-10 grid-cols-3 min-h-screen'>
        <section className='lg:col-span-1 md:col-span-2 col-span-3 p-10 shadow-lg rounded-b-md'>
            {!isLogin ? <SellerAccountForm onRegisterSuccess={() => setIsLogin(true)} /> 
            : <SellerLoginForm />}

            <div className='mt-10 psace-y-2'>
                <h1 className='text-centertext-sm font-medium'>have account</h1>
                <Button onClick={handleShowPage} variant='outlined' fullWidth sx={{py:"11px"}}>
                    {isLogin ? "Register" : "Login"}
                </Button>
            </div>
        </section>
        <section className='hidden md:col-span-1 lg:col-span-2 md:flex justify-center items-center'>
            <div className='lg:w-[70%] px-5 space-y-10'>
                <div className='space-y-2 font-bold text-center'>
                    <p className="text-2xl">Join the Marketplace Revolution</p>
                    <p className='text-lg text-primary'>Boost your sales today</p>
                </div>
                <img src="https://m.media-amazon.com/images/G/31/amazonservices/Becoming_an_online_seller.jpg" alt="" />
            </div>
        </section>
    </div>
  )
}

export default BecomeSeller