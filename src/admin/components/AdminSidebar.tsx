import SideBar from 'customer/component/SideBar'
import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import IntegrationInstructions from '@mui/icons-material/IntegrationInstructions';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

const menu = [
    {
        name: 'Dashboard',
        path: "/admin",
        icon: <DashboardIcon className='text-primary' />,
        activeIcon: <DashboardIcon className='text-white' />,
    },
    {
        name: 'Coupons',
        path: "/admin/coupon",
        icon: <IntegrationInstructions className='text-primary' />,
        activeIcon: <IntegrationInstructions className='text-white' />,
    },
    {
        name: 'Add New Coupon',
        path: "/admin/add-coupon",
        icon: <AddIcon className='text-primary' />,
        activeIcon: <AddIcon className='text-white' />,
    },
    // {
    //     name: 'Sellers',
    //     path: "/admin/sellers-table",
    //     icon: <PersonIcon className='text-primary' />,
    //     activeIcon: <PersonIcon className='text-white' />,
    // },
    {
        name: 'Home Page',
        path: "/admin/home-grid",
        icon: <HomeIcon className='text-primary' />,
        activeIcon: <HomeIcon className='text-white' />,
    },
    // {
    //     name: 'Electronics Category',
    //     path: "/admin/electronics-category",
    //     icon: <ElectricBoltIcon className='text-primary' />,
    //     activeIcon: <ElectricBoltIcon className='text-white' />,
    // },
    // {
    //     name: 'Shop By Category',
    //     path: "/admin/shop-by-category",
    //     icon: <CategoryIcon className='text-primary' />,
    //     activeIcon: <CategoryIcon className='text-white' />,
    // },
    {
        name: 'Deals',
        path: "/admin/deals",
        icon: <LocalOfferIcon className='text-primary' />,
        activeIcon: <LocalOfferIcon className='text-white' />,
    },
];

const menu2 = [
    // {
    //     name: 'Account',
    //     path: "/admin/account",
    //     icon: <AccountBoxIcon className='text-primary' />,
    //     activeIcon: <AccountBoxIcon className='text-white' />,
    // },
    {
        name: 'Logout',
        path: "/",
        icon: <LogoutIcon className='text-primary' />,
        activeIcon: <LogoutIcon className='text-white' />,
    },
  ]

const AdminSidebar = ({toggleSideBar}:any) => {
  return (
    <SideBar menu={menu} menu2={menu2} toggleSideBar={toggleSideBar} />
  )
}

export default AdminSidebar