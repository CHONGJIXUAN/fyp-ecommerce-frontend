// Update the import path below if the location is incorrect
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

export interface HomeData{
    id: number;
    grid: HomeCategory[];
    shopByCategories: HomeCategory[];
    electricCategories: HomeCategory[];
    deals: Deal[];
    dealCategories: HomeCategory[];
    recycleProducts: HomeCategory[];
}

export interface HomeCategory{
    id?: number;
    categoryId: string;
    section?: string;
    name?: string;
    image: string;
    parentCategoryId?: string;
}