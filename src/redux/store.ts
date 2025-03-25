'use client';

import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

interface UserState {
  isLoggedIn: boolean;
  name: string | null;
  email: string | null;
}

interface ThemeState {
  darkMode: boolean;
}

interface AppState {
  user: UserState;
  theme: ThemeState;
}

const initialState: AppState = {
  user: {
    isLoggedIn: false,
    name: null,
    email: null,
  },
  theme: {
    darkMode: false,
  },
};

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState: initialState.user,
  reducers: {
    login: (state, action: PayloadAction<{ name?: string; email: string }>) => {
      state.isLoggedIn = true;
      state.name = action.payload.name || action.payload.email.split('@')[0];
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.name = null;
      state.email = null;
    }
  }
});

// Theme slice
const themeSlice = createSlice({
  name: 'theme',
  initialState: initialState.theme,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    }
  }
});

// Export actions
export const { login, logout } = userSlice.actions;
export const { toggleTheme } = themeSlice.actions;

// Create the store with combined reducers
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    theme: themeSlice.reducer,
    auth: authReducer
  }
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;