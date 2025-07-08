import { Divider, List, ListItemIcon, ListItemText, SlideProps } from '@mui/material'
import React, { use } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface menuItem{
    name: string,
    path: string,
    icon: any,
    activeIcon: any
}

interface SideBarProps {
    menu: menuItem[],
    menu2: menuItem[],
    toggleSideBar: () => void
} 

const SideBar = ({menu, menu2, toggleSideBar}:SideBarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
    
  return (
    <div className='h-full'>
        <div className='flex flex-col justify-between h-full w-[300px] border-r py-5'>
            <div className="space-y-2">
                {
                    menu.map((item:any, index:number) =>
                        <div onClick={() => navigate(item.path)} className='pr-9 cursor-pointer' key={index}>
                            <p className={`${item.path == location.pathname 
                                ? 'text-white bg-primary' : 'text-primary'} flex items-center px-5 py-3 rounded-r-full`}>
                                <ListItemIcon>
                                    {item.path == location.pathname 
                                            ? item.activeIcon : item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </p>
                        </div>
                    )
                }
            </div>
            <Divider />
            <div className="space-y-2">
                {
                    menu2.map((item:any, index:number) =>
                        <div onClick={() => navigate(item.path)} className='pr-9 cursor-pointer' key={index}>
                            <p className={`${item.path == location.pathname 
                                ? 'text-white bg-primary' : 'text-primary'} flex items-center px-5 py-3 rounded-r-full`}>
                                <ListItemIcon>
                                    {item.path == location.pathname 
                                        ? item.activeIcon : item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </p>
                        </div>
                    )
                }
            </div>        
        </div>
    </div>
  )
}

export default SideBar