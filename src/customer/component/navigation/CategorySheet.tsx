import React from 'react'
import { menLevel2 } from '../../../data/category/level two/menLevel2';
import { menLevel3} from '../../../data/category/level three/menLevel3';
import { Box, dividerClasses } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';
import { useNavigate } from 'react-router-dom';

const categoryTwo:{[key:string]:any[]} = {
    men:menLevel2,
}

const categoryThree:{[key:string]:any[]} = {
    men: menLevel3,
}

const CategorySheet = ({selectedCategory}:any) => {
    const navigate = useNavigate();

    const childCategory = (category: any, parentCategoryId: any) => {
        return category.filter((child: any) => child.parentCategoryId == parentCategoryId)
    }

  return (
    <Box sx={{ zIndex: 2 }} className='bg-white shadow-lg lg:h-[500px] overflow-y-auto'>
        <div className='flex text-sm flex-wrap'>
            {
                categoryTwo[selectedCategory]?.map((item:any, index) => 
                <div className={`p-8 lg:w-[20%] ${index % 2 === 0 ? "bg-slate-50" : "bg-white"}`}>
                    <p className='text-primary mb-5 font-semibold'>{item.name}</p>
                    <ul className='space-y-3'>
                        {
                            childCategory(categoryThree[selectedCategory], item.categoryId).map((item: any) =>
                            <div>
                                <li onClick={() => navigate("/products/"+item.categoryId)} key={item.name} className='hover:text-primary cursor-pointer'>
                                    {item.name}
                                </li>   
                            </div>)
                        }
                    </ul>
                </div>)
            }
        </div>
    </Box>
  )
}

export default CategorySheet