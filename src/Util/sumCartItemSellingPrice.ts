import { CartItem } from "../types/cartTypes";

export const sumCartItemSellingPrice = (cartItems: CartItem[]) => {
  return cartItems.reduce((acc, item) => acc + item.sellingPrice * item.quantity, 0);
};