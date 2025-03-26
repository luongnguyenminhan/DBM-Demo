'use client';

import React, { Suspense } from 'react';
import RegisterForm from '@/components/auth/registerForm';
import AuthContentWrapper from '@/components/auth/authContentWrapper';
import { useAuthPage } from '@/hooks/use_authPage';

function LoadingFallback() {
  return <div className="flex justify-center items-center p-4">Loading...</div>;
}

function RegisterContent() {
  const { isLoading, handleRegister } = useAuthPage();
  
  // Create a wrapper function that conforms to the expected type
  const handleFormSubmit = async (credentials: { email: string; password: string; name: string; }) => {
    await handleRegister(credentials);
    // Not returning anything ensures Promise<void>
  };

  return (
    <RegisterForm onSubmit={handleFormSubmit} isLoading={isLoading} />
  );
}

export default function RegisterPage() {
  return (
    <AuthContentWrapper>
      <Suspense fallback={<LoadingFallback />}>
        <RegisterContent />
      </Suspense>
    </AuthContentWrapper>
  );
}
