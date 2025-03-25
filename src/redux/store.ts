'use client';

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';

// Create the store with combined reducers
export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer
  },
  // Add middleware to handle serialization issues with JWT tokens if needed
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types to prevent serialization errors with JWT tokens
        ignoredActions: ['auth/loginSuccess'],
      },
    }),
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Re-export actions for convenience
export * from './slices/authSlice';
export * from './slices/themeSlice';