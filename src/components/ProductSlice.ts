import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from '../thunks/ProductThunk';

interface Supplier {
  name: string;
  id: string; // Optional client_id field
}

interface Product {
  id: string;
  name: string;
  unitPrice: number;
  stockQuantity: number; // Example property
}

interface ProductState {
  supplier: Supplier | null;
  products: Product[] | null; // Replace 'any' with the actual product type if available
  loading: boolean;
  error: string | null;
  login: boolean;
}

const initialState: ProductState = {
  supplier: null,
  products: null, // Initialize as an empty array or null based on your requirements
  loading: false,
  error: null,
  login: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.products = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        console.log('Products updated in state:', action.payload);
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProduct } = productSlice.actions;
export default productSlice.reducer;
