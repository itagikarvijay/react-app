// userSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchUserProfile } from '../../thunks/ProfileThunk';

interface User {
  message: string;
  clientId: string; // Optional client_id field
}

interface UserState {
  data: User | null;
  loading: boolean;
  error: string | null;
  login: boolean;
}

const initialState: UserState = {
  data: null,
  loading: false,
  login: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
    logout: (state) => {
      state.data = null;
      state.login = false;
      localStorage.removeItem('token');
    },
    login: (state) => {
      state.login = true;
      console.log('User logged in, login state updated to true');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.data = action.payload;
        console.log('User profile updated in state:', action.payload);
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUser, login, logout } = userSlice.actions;
export default userSlice.reducer;
