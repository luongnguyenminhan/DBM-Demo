'use client';

import React from 'react';
import LoginForm from '@/components/auth/loginForm';
import AuthContentWrapper from '@/components/auth/AuthContentWrapper';
import { useAuthPage } from '@/hooks/use_authPage';

export default function LoginPage() {
  const { isLoading, handleLogin } = useAuthPage();
  
  // Create a wrapper function that conforms to the expected type
  const handleFormSubmit = async (credentials: { email: string; password: string; }) => {
    await handleLogin(credentials);
    // Not returning anything ensures Promise<void>
  };

  return (
    <AuthContentWrapper>
      <LoginForm onSubmit={handleFormSubmit} isLoading={isLoading} />
    </AuthContentWrapper>
  );
}