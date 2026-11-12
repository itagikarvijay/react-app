// userThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (accessToken: string, { rejectWithValue }) => {
    console.log('Fetching user profile with access token:', accessToken);
    try {
      const response = await axios.get('/api/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('User profile fetched successfully:', response.data);
      return response.data; // { sub, name, email, ... }
    } catch (error: any) {
      console.error('Failed to fetch profile:', error.response?.data);
      return rejectWithValue(error.response?.data || 'Failed to fetch profile');
    }
  },
);
