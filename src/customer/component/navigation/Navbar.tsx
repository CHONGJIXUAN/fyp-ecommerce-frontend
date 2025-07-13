import React, { use, useState } from 'react'
import { Avatar, Box, Button, IconButton, useMediaQuery, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CategorySheet from './CategorySheet';
import { mainCategory } from 'data/category/mainCategory';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {

    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up('lg'));
    const [selectedCategory, setSelectedCategory] = useState("men");
    const [showSheet, setShowSheet] = useState(false);
    const navigate = useNavigate();

  return (
    <>
        <Box sx={{ zIndex: 2 }} className='sticky top-0 left-0 right-0 bg-white '>
            <div className='flex justify-between items-center px-5 lg:px-20 h-[70px] border-b'>
                <div className='flex items-center gap-9'>
                    <div className='flex items-center gap-2'>
                        {
                            !isLarge &&  
                            <IconButton>
                                <MenuIcon />
                            </IconButton>
                        }
                        <h1 onClick={() => navigate("/")} className='logo cursor-pointer text-lg md:text-2xl text-primary'>
                            Green Shopping
                        </h1>
                        <ul className='flex items-center font-medium text-gray-800'>
                            {mainCategory.map((item) => 
                            <li onMouseLeave={() =>{
                                setShowSheet(false);
                            }}
                            onMouseEnter={() => {
                                setSelectedCategory(item.categoryId);
                                setShowSheet(true);
                            }}
                            className='mainCategory hover:text-primary hover:border-b-2 
                                            h-[70px] px-4 border-primary flex items-center'>
                                {item.name}
                            </li>)}
                        </ul>
                    </div>
                </div>
                <div className='flex gap-1 lg:gap-4 items-center'>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    {
                        false ? 
                        <Button onClick={() => navigate("/account/orders")} className='flex items-center gap-2'> 
                        <Avatar sx={{width: 29, hieght:29}} src='#'/>
            
                            
                            <h1 className='font-semibold hidden lg:block'>Zosh</h1>
                        </Button> 
                        : 
                        <Button onClick={() => navigate("/login")} variant='contained'>
                            Login
                        </Button>
                    }
                    <IconButton>
                        <FavoriteBorder sx={{fontSize: 29}} />
                    </IconButton>
                    <IconButton onClick={() => navigate("/cart")}>
                        <AddShoppingCartIcon className='text-gray-700' sx={{fontSize: 29}} />
                    </IconButton>
                    
                   {
                    isLarge && 
                        <Button onClick={() => navigate("/become-seller")} startIcon={<StorefrontIcon/>} variant='outlined'>
                            Become Seller
                        </Button>
                    }
                </div>
            </div>
            { showSheet && 
                <div 
                onMouseLeave={() => 
                    setShowSheet(false)
                }
                onMouseEnter={() => 
                    setShowSheet(true)
                }
                className='categorySheet absolute top-[4.41rem] left-20 right-20 border'>
                    <CategorySheet selectedCategory={selectedCategory}/>
                </div>
            }
        </Box>
    </>
  )
}

export default Navbar