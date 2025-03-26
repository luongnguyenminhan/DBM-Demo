import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

// Define JWT structure based on your token
interface JwtPayload {
  exp: number;
  iat: number;
  iss: string;
  aud: string;
  user_id: string;
  email: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string | null;
    email: string | null;
    role: string | null;
    name: string | null;
  };
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

// Function to decode JWT without external libraries
const decodeJwt = (token: string): JwtPayload | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

// Initialize auth state
const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    id: null,
    email: null,
    role: null,
    name: null,
  },
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

// Check if we have tokens in localStorage on initial load
if (typeof window !== 'undefined') {
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  
  if (accessToken) {
    const decodedToken = decodeJwt(accessToken);
    
    if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
      initialState.isAuthenticated = true;
      initialState.accessToken = accessToken;
      initialState.refreshToken = refreshToken;
      initialState.user = {
        id: decodedToken.user_id,
        email: decodedToken.email,
        role: decodedToken.role,
        name: decodedToken.email.split('@')[0],
      };
    }
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{
      accessToken: string;
      refreshToken: string;
      email: string;
    }>) => {
      const { accessToken, refreshToken, email } = action.payload;
      const decodedToken = decodeJwt(accessToken);
      
      if (decodedToken) {
        state.isAuthenticated = true;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.user = {
          id: decodedToken.user_id,
          email: decodedToken.email,
          role: decodedToken.role,
          name: email.split('@')[0], // Default name using email prefix
        };
      }
      
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      // Clear authentication state
      state.isAuthenticated = false;
      state.user = {
        id: null,
        email: null,
        role: null,
        name: null,
      };
      state.accessToken = null;
      state.refreshToken = null;
      
      // Clear stored tokens
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        
        // Clear cookies
        document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict';
        document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict';
      }
    },
    updateUserProfile: (state, action: PayloadAction<{
      name?: string;
    }>) => {
      if (action.payload.name) state.user.name = action.payload.name;
    },
  },
});

// Selectors for easier access to auth state
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectUserRole = (state: RootState) => state.auth.user.role;

// Function to check if token is valid and not expired
export const isValidToken = (token: string | null): boolean => {
  if (!token) return false;
  
  try {
    const decodedToken = decodeJwt(token);
    return !!decodedToken && decodedToken.exp * 1000 > Date.now();
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUserProfile
} = authSlice.actions;

export default authSlice.reducer;