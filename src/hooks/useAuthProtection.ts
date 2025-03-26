import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

/**
 * Hook to protect auth pages from authenticated users
 * Redirects authenticated users to the dashboard or specified path
 */
export const useAuthProtection = (redirectTo = '/dashboard') => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    // If user is authenticated, redirect away from auth pages
    if (isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, router, redirectTo]);

  return { isAuthenticated };
};

