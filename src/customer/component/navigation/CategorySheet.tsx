import React from 'react'
import { menLevel2 } from '../../../data/category/level two/menLevel2';
import { menLevel3} from '../../../data/category/level three/menLevel3';
import { Box, dividerClasses } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';

const categoryTwo = {
    men:menLevel2,
}

const categoryThree = {
    men: menLevel3,
}

const CategorySheet = () => {

    const childCategory = (category: any, parentCategoryId: any) => {
        return category.filter((child: any) => child.parentCategoryId == parentCategoryId)
    }

  return (
    <Box sx={{ zIndex: 1 }} className='bg-white shadow-lg lg:h-[500px] overflow-y-auto'>
        <div className='flex text-sm flex-wrap'>
            {
                categoryTwo["men"].map((item) => 
                <div key={item.name}>
                    <p className='text-primary mb-5 font-semibold'>{item.name}</p>
                    <ul className='space-y-3'>
                        {
                            childCategory(categoryThree["men"], item.categoryId).map((item: any) =>
                            <div>
                                <li key={item.name} className='hover:text-primary cursor-pointer'>
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