import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from '../../types';
import type { RootState } from '../../app/store';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((cartItem) => cartItem.product.id === id);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            (cartItem) => cartItem.product.id !== id
          );
        } else {
          item.quantity = quantity;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state: RootState): CartItem[] =>
  state.cart.items;

export const selectCartTotalQuantity = (state: RootState): number =>
  state.cart.items.reduce(
    (total: number, item: CartItem) => total + item.quantity,
    0
  );

export const selectCartTotalPrice = (state: RootState): number =>
  state.cart.items.reduce(
    (total: number, item: CartItem) =>
      total + item.product.price * item.quantity,
    0
  );

export default cartSlice.reducer;