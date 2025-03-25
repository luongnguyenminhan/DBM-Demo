'use client';

import React from 'react';
import ForgotPasswordForm from '@/components/auth/forgotPasswordForm';
import AuthContentWrapper from '@/components/auth/authContentWrapper';
import { useAuthPage } from '@/hooks/use_authPage';

export default function ForgotPasswordPage() {
  const { isLoading, handleForgotPassword } = useAuthPage();

  return (
    <AuthContentWrapper>
      <ForgotPasswordForm onSubmit={handleForgotPassword} isLoading={isLoading} />
    </AuthContentWrapper>
  );
}
