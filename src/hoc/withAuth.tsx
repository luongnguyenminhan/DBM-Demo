'use client';

import React from 'react';
import { AuthGuard } from '@/components/auth/AuthGuard';

interface WithAuthOptions {
  requireAuth?: boolean;
  redirectTo?: string;
  isPublic?: boolean;
}

/**
 * Higher Order Component to protect routes
 * @param Component Component to protect
 * @param options Authentication options
 * @returns Protected component
 * 
 * Usage examples:
 * - Protected page: export default withAuth(MyPage, { requireAuth: true });
 * - Auth page: export default withAuth(LoginPage, { requireAuth: false });
 * - Public page: export default withAuth(HomePage, { isPublic: true });
 */
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options: WithAuthOptions = { requireAuth: true }
) {
  const { requireAuth = true, redirectTo, isPublic = false } = options;
  
  const WithAuthComponent: React.FC<P> = (props) => {
    return (
      <AuthGuard requireAuth={requireAuth} redirectTo={redirectTo} isPublic={isPublic}>
        <Component {...props} />
      </AuthGuard>
    );
  };

  // Copy display name for better debugging
  const displayName = Component.displayName || Component.name || 'Component';
  WithAuthComponent.displayName = `withAuth(${displayName})`;

  return WithAuthComponent;
}

export default withAuth;
