'use client';

import React from 'react';
import RegisterForm from '@/components/auth/registerForm';
import AuthContentWrapper from '@/components/auth/authContentWrapper';
import { useAuthPage } from '@/hooks/use_authPage';

export default function RegisterPage() {
  const { isLoading, handleRegister } = useAuthPage();
  
  // Create a wrapper function that conforms to the expected type
  const handleFormSubmit = async (credentials: { email: string; password: string; name: string; }) => {
    await handleRegister(credentials);
    // Not returning anything ensures Promise<void>
  };

  return (
    <AuthContentWrapper>
      <RegisterForm onSubmit={handleFormSubmit} isLoading={isLoading} />
    </AuthContentWrapper>
  );
}
