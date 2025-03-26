'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ResetPasswordForm from '@/components/auth/resetPasswordForm';
import AuthContentWrapper from '@/components/auth/authContentWrapper';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { useAuthPage } from '@/hooks/use_authPage';

function ResetPasswordContent() {
  const { isLoading, handleResetPassword } = useAuthPage();
  const searchParams = useSearchParams();
  const { redirectWithDelay } = useAuthRedirect();
  
  const encodedEmail = searchParams.get('email') || '';
  const token = searchParams.get('token') || '';
  
  let email = '';
  try {
    if (encodedEmail) {
      email = atob(encodedEmail);
    }
  } catch (error) {
    console.error('Error decoding email:', error);
    email = encodedEmail;
  }
  
  useEffect(() => {
    if (!email) {
      redirectWithDelay('/forgot-password', 3000, {
        type: 'error',
        text: 'Không tìm thấy thông tin email. Vui lòng thử lại.'
      });
    }
  }, [email, redirectWithDelay]);
  
  const handleResetPasswordWithToken = async (passwordData: { password: string; email: string }) => {
    await handleResetPassword(passwordData, token);
  };

  if (!email) {
    return (
      <div className="text-center p-8">
        <p className="text-lg text-gray-600">Đang chuyển hướng...</p>
      </div>
    );
  }

  return (
    <ResetPasswordForm 
      onSubmit={handleResetPasswordWithToken} 
      email={email}
      isLoading={isLoading} 
    />
  );
}

function LoadingFallback() {
  return (
    <div className="text-center p-8">
      <p className="text-lg text-gray-600">Đang tải...</p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <AuthContentWrapper>
      <Suspense fallback={<LoadingFallback />}>
        <ResetPasswordContent />
      </Suspense>
    </AuthContentWrapper>
  );
}
