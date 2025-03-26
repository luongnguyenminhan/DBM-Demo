'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/redux/slices/authSlice';
import { Toast } from '@/components/molecules/alert';
import LoadingSpinner from '@/components/atomic/spinner'; // Assuming you have a loading component

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireAuth?: boolean; // true for protected pages, false for auth pages
  isPublic?: boolean; // true for pages that don't require authentication like home page
}

/**
 * AuthGuard component to handle route protection
 * - For requireAuth=true: Protects pages that need authentication
 * - For requireAuth=false: Prevents logged-in users from accessing auth pages
 * - For isPublic=true: Allows access regardless of authentication status
 */
export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  redirectTo = '/dashboard',
  requireAuth = false,
  isPublic = false
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Skip protection for public routes
    if (isPublic) {
      setIsLoading(false);
      return;
    }
    
    // For auth pages (login, register, etc.)
    if (!requireAuth && isAuthenticated) {
      Toast.info('You are already logged in', {
        position: "top-right",
        autoCloseDuration: 3000,
      });
      router.push(redirectTo);
      return;
    }
    
    // For protected pages
    if (requireAuth && !isAuthenticated) {
      Toast.warning('Please login to continue', {
        position: "top-right",
        autoCloseDuration: 3000,
      });
      
      // Include the current path as the "from" parameter
      router.push(`/auth/login?from=${encodeURIComponent(pathname)}`);
      return;
    }
    
    // If we reach here, access is allowed
    setIsLoading(false);
  }, [isAuthenticated, requireAuth, redirectTo, router, isPublic, pathname]);

  // For public pages, always render
  if (isPublic) {
    return <>{children}</>;
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // For auth pages, only render when not authenticated
  // For protected pages, only render when authenticated
  if ((requireAuth && !isAuthenticated) || (!requireAuth && isAuthenticated)) {
    return null; // Don't render anything during redirect
  }

  return <>{children}</>;
};

export default AuthGuard;
