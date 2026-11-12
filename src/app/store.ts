import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../feature/auth/userSlice';
import productReducer from '../components/ProductSlice';
import cartReducer from '../components/cartSlice';
import orderReducer from '../components/OrderSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
  },  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
