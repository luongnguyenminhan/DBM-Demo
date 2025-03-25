import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    name: string | null;
    email: string | null;
    avatar?: string | null;
    role?: string | null;
  };
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    name: null,
    email: null,
    avatar: null,
    role: null,
  },
  token: null,
  refreshToken: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{
      name?: string | null;
      email: string;
      avatar?: string;
      role?: string;
      token: string;
      refreshToken: string;
    }>) => {
      state.isAuthenticated = true;
      state.user.name = action.payload.name || action.payload.email.split('@')[0];
      state.user.email = action.payload.email;
      state.user.avatar = action.payload.avatar || null;
      state.user.role = action.payload.role || null;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {
        name: null,
        email: null,
        avatar: null,
        role: null,
      };
      state.token = null;
      state.refreshToken = null;
      state.loading = false;
      state.error = null;
    },
    updateUserProfile: (state, action: PayloadAction<{
      name?: string;
      avatar?: string;
      role?: string;
    }>) => {
      if (action.payload.name) state.user.name = action.payload.name;
      if (action.payload.avatar) state.user.avatar = action.payload.avatar;
      if (action.payload.role) state.user.role = action.payload.role;
    },
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout,
  updateUserProfile
} = authSlice.actions;

export default authSlice.reducer;