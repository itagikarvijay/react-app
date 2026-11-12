import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type ProfileData = Record<string, unknown>;

type AuthState = {
  token: string | null;
  profileData: ProfileData | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  token: localStorage.getItem('token') || null,
  profileData: null,
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk<
  ProfileData,
  void,
  { state: { auth: AuthState }; rejectValue: string }
>('auth/fetchProfile', async (_, { getState, rejectWithValue }) => {
  try {
    const { token } = getState().auth;
    console.log('Current token in fetchProfile:', token);
    if (!token) {
      return rejectWithValue('No token available');
    }
    console.log('Fetching profile with token:', token);
    const response = await axios.get('http://localhost:9000/userinfo', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // params: { client_id: 'frontend-app', client_secret: 'secret' },
      // withCredentials: true, // Include cookies if needed
    });
    console.log('Profile data fetched successfully:', response.data);
    return response.data;
  } catch (error: unknown) {
    const message =
      axios.isAxiosError(error) && error.response?.data
        ? String(error.response.data)
        : 'Failed to fetch data';
    return rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Simulated token storage (mocking successful PKCE flow capture)
    setToken: (state, action: PayloadAction<string>) => {
      console.log('Setting token in authSlice:', action.payload);
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.profileData = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<ProfileData>) => {
        state.loading = false;
        state.profileData = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
