'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ResetPasswordForm from '@/components/auth/resetPasswordForm';
import AuthContentWrapper from '@/components/auth/AuthContentWrapper';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { useAuthPage } from '@/hooks/use_authPage';

// Create a client component that uses useSearchParams
function ResetPasswordContent() {
  const { isLoading, handleResetPassword } = useAuthPage();
  const searchParams = useSearchParams();
  const { redirectWithDelay } = useAuthRedirect();
  
  // Get encoded email from query parameters and decode it
  const encodedEmail = searchParams.get('email') || '';
  const token = searchParams.get('token') || '';
  
  // Decode the base64-encoded email
  let email = '';
  try {
    if (encodedEmail) {
      email = atob(encodedEmail);
    }
  } catch (error) {
    console.error('Error decoding email:', error);
    // If decoding fails, use the raw value (might be unencoded in some cases)
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
    // Not returning anything ensures Promise<void>
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

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="text-center p-8">
      <p className="text-lg text-gray-600">Đang tải...</p>
    </div>
  );
}

// Main page component with Suspense boundary
export default function ResetPasswordPage() {
  return (
    <AuthContentWrapper>
      <Suspense fallback={<LoadingFallback />}>
        <ResetPasswordContent />
      </Suspense>
    </AuthContentWrapper>
  );
}
