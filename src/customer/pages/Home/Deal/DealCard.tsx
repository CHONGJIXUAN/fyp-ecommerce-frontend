import React from 'react'
import { useNavigate } from 'react-router-dom';
import { HomeCategory } from 'types/HomeCategoryTypes';

export interface Deal{
    id?: number;
    discount: number;
    category: HomeCategory
}

export interface ApiResponse{
    message: string;
    status: boolean;
}

export interface DealState{
    deals: Deal
    loading: boolean;
    error: string | null;
    dealCreated: boolean;
    dealUpdated: boolean;
}

const DealCard = ({ item }: { item: any }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${item.category.categoryId}`);
 };

  return (
    <div
      className="w-[13rem] cursor-pointer"
      onClick={handleClick}
    >
      <img
        className="border-x-[7px] border-t-[7px] border-pink-600 w-full h-[12rem] object-cover object-top"
        src={item.category.image}
        alt={item.category.name}
      />
      <div className="border-4 border-black bg-black text-white p-2 text-center">
        <p className="text-lg font-semibold">{item.category.name}</p>
        <p className="text-2xl font-bold">{item.discount}%</p>
        <p className="text-lg">SHOP NOW</p>
      </div>
    </div>
  );
};

export default DealCard