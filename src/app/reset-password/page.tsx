'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ResetPasswordForm from '@/components/auth/resetPasswordForm';
import AuthContentWrapper from '@/components/auth/AuthContentWrapper';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

// Create a client component that uses useSearchParams
function ResetPasswordContent() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const { redirectWithDelay } = useAuthRedirect();
  
  // Get email from query parameters
  const email = searchParams.get('email') || '';
  
  useEffect(() => {
    if (!email) {
      redirectWithDelay('/forgot-password', 3000, {
        type: 'error',
        text: 'Không tìm thấy thông tin email. Vui lòng thử lại.'
      });
    }
  }, [email, redirectWithDelay]);
  
  const handleResetPassword = async (passwordData: { password: string; email: string }) => {
    setIsLoading(true);
    
    try {
      // Simulate API call with delay
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1500); // 1.5 second delay to simulate network request
      });
      
      // Use passwordData in a console log to avoid the unused variable warning
      console.log(`Resetting password for ${passwordData.email} with new password length: ${passwordData.password.length}`);
      
      // Success case and redirect to login
      redirectWithDelay('/login', 2000, {
        type: 'success',
        text: 'Mật khẩu đã được đặt lại thành công!'
      });
      
    } catch (error) {
      // Error will be handled by the form component
      throw error;
    } finally {
      setIsLoading(false);
    }
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
      onSubmit={handleResetPassword} 
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
