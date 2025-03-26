'use client';
import React, { Suspense } from 'react';
import ForgotPasswordForm from '@/components/auth/forgotPasswordForm';
import AuthContentWrapper from '@/components/auth/authContentWrapper';
import { useAuthPage } from '@/hooks/use_authPage';

function LoadingFallback() {
  return <div className="flex justify-center items-center p-4">Loading...</div>;
}

function ForgotPasswordContent() {
  const { isLoading, handleForgotPassword } = useAuthPage();
  
  return (
    <ForgotPasswordForm onSubmit={handleForgotPassword} isLoading={isLoading} />
  );
}

export default function ForgotPasswordPage() {
  return (
    <AuthContentWrapper>
      <Suspense fallback={<LoadingFallback />}>
        <ForgotPasswordContent />
      </Suspense>
    </AuthContentWrapper>
  );
}
