import React, { useState } from 'react'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Button } from '@mui/material';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className='flex justify-center h-[90vh] items-center'>
        <div className='max-w-md h-[85vh] rounded-md shadow-lg'>
          <img className='w-full rounded-t-md' src="https://img.freepik.com/premium-photo/shopping-cart-with-medical-pills-gre
          en-background-banner_427957-1815.jpg" alt="" />

          <div className='mt-8 px-10'>
            {
              isLogin ? <LoginForm /> : <RegisterForm onRegisterSuccess={() => setIsLogin(true)} />
            }

            <div className='flex items-center justify-center mt-5 gap-1'>
              <p>{isLogin && "Don't "} have Account</p>
              <Button size='small' onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Create Account" : "Login"}</Button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Auth