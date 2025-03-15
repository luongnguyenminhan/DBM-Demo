'use client';

import { configureStore } from '@reduxjs/toolkit';

// Define a simple initial state
interface AppState {
  user: {
    isLoggedIn: boolean;
    name: string | null;
  };
  theme: {
    darkMode: boolean;
  };
}

const initialState: AppState = {
  user: {
    isLoggedIn: false,
    name: null,
  },
  theme: {
    darkMode: false,
  },
};

// Define action type
type Action = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
};

// Define a simple reducer
const rootReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: {
          isLoggedIn: true,
          name: action.payload.name,
        },
      };
    case 'LOGOUT':
      return {
        ...state,
        user: {
          isLoggedIn: false,
          name: null,
        },
      };
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: {
          darkMode: !state.theme.darkMode,
        },
      };
    default:
      return state;
  }
};

// Create the store
export const store = configureStore({
  reducer: rootReducer,
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;