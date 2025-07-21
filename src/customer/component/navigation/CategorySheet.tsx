import React from 'react'
import { homeLivingLevel2, kidsLevel2, menLevel2, personalCareLevel2, womenLevel2, zeroWasteLevel2 } from '../../../data/category/level two/Level2';
import { homeLivingLevel3, kidsLevel3, menLevel3, personalCareLevel3, womenLevel3, zeroWasteLevel3} from '../../../data/category/level three/Level3';
import { Box, dividerClasses } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'State/Store';


const categoryTwo:{[key:string]:any[]} = {
    men:menLevel2,
    women: womenLevel2,
    home_living: homeLivingLevel2,
    personal_care: personalCareLevel2,
    zero_waste: zeroWasteLevel2,
    kids: kidsLevel2
}

const categoryThree:{[key:string]:any[]} = {
    men: menLevel3,
    women: womenLevel3,
    home_living: homeLivingLevel3,
    personal_care: personalCareLevel3,
    zero_waste: zeroWasteLevel3,
    kids: kidsLevel3
}

const CategorySheet = ({ selectedCategory }: { selectedCategory: string }) => {
  const { categories } = useAppSelector((state) => state.category);
  const navigate = useNavigate();
  

  const subCategories = categories.filter(c => c.parentCategoryId === selectedCategory);
  
  return (
    <div className="flex p-4 bg-white shadow-lg">
      {subCategories.map((sub) => (
        <div key={sub.id} className="p-4 w-1/4">
          <h3
            className="font-semibold text-primary cursor-pointer hover:underline"
            onClick={() => navigate(`/products?category=${sub.categoryId}`)}
          >
            {sub.name}
          </h3>
          <ul className="mt-2 space-y-1">
            {categories
              .filter(c => c.parentCategoryId === sub.categoryId)
              .map(bottom => (
                <li
                  key={bottom.id}
                  className="cursor-pointer hover:text-green-600"
                  onClick={() => navigate(`/products?category=${bottom.categoryId}`)}
                >
                  {bottom.name}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CategorySheet