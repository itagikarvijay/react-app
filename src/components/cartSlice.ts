import { createSlice, current, type PayloadAction } from '@reduxjs/toolkit';

type ProductId = string | number;

interface Product {
  id: ProductId;
  name: string;
  unitPrice: number;
  stockQuantity: number;
}

interface cartState {
  id: number | null;
  loading: boolean;
  error: string | null;
  login: boolean;
  prod: Record<ProductId, Product>;
}

const initialState: cartState = {
  id: null,
  loading: false,
  error: null,
  login: false,
  prod: {},
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const incomingProduct =
        typeof action.payload === 'object' && action.payload !== null
          ? action.payload
          : { id: action.payload, name: '', unitPrice: 0, stockQuantity: 0 };

      const existingProduct = state.prod[incomingProduct.id];
      if (existingProduct) {
        existingProduct.stockQuantity += 1;
        existingProduct.unitPrice = incomingProduct.unitPrice; // Update unit price if needed
        existingProduct.name = incomingProduct.name; // Update name if needed
        console.log('Cart state after update:', current(state));
      } else {
        state.prod[incomingProduct.id] = { ...incomingProduct, stockQuantity: 1 };
        console.log('Cart state update:', current(state));
      }
    },
    removeFromCart: (state, action: PayloadAction<ProductId>) => {
      const productId = action.payload;
      console.log('Removing product from cart:', productId);
      const existingProduct = state.prod[productId];
      if (existingProduct) {
        existingProduct.stockQuantity = Math.max(0, existingProduct.stockQuantity - 1);
        console.log('Product removed. Current cart state:', current(state));
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
