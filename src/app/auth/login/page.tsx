'use client';

import React, { Suspense } from 'react';
import LoginForm from '@/components/auth/loginForm';
import AuthContentWrapper from '@/components/auth/authContentWrapper';
import { useAuthPage } from '@/hooks/use_authPage';

function LoadingFallback() {
  return <div className="flex justify-center items-center p-4">Loading...</div>;
}

function LoginContent() {
  const { isLoading, handleLogin } = useAuthPage();
  
  const handleFormSubmit = async (credentials: { email: string; password: string; }) => {
    await handleLogin(credentials);
  };

  return (
    <LoginForm onSubmit={handleFormSubmit} isLoading={isLoading} />
  );
}

export default function LoginPage() {
  return (
    <AuthContentWrapper>
      <Suspense fallback={<LoadingFallback />}>
        <LoginContent />
      </Suspense>
    </AuthContentWrapper>
  );
}