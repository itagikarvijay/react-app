// productThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../components/Interceptor';
// import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'user/products',
  async (accessToken: string, { rejectWithValue }) => {
    console.log('Fetching products with access token:', accessToken);
    try {
      const response = await api.get('/api/products', {
        withCredentials: false,
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        // },
      });
      console.log('Products fetched successfully:', response.data);
      return response.data; // { sub, name, email, ... }
    } catch (error: any) {
      console.error('Failed to fetch products:', error.response?.data);
      return rejectWithValue(error.response?.data || 'Failed to fetch products');
    }
  },
);
