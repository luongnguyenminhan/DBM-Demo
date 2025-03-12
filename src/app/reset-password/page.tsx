'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ResetPasswordForm from '@/components/auth/resetPasswordForm';
import AuthContentWrapper from '@/components/auth/AuthContentWrapper';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import authApi from '@/apis/authenticationApi';
import { Toast } from '@/components/molecules/alert';

// Create a client component that uses useSearchParams
function ResetPasswordContent() {
  const [isLoading, setIsLoading] = useState(false);
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
  
  const handleResetPassword = async (passwordData: { password: string; email: string }) => {
    setIsLoading(true);
    
    try {
      const resetData = {
        token: token,
        new_password: passwordData.password
      };
      
      const response = await authApi.resetPassword(resetData);
      
      if (response.status === 200) {
        Toast.success('Mật khẩu đã được đặt lại thành công!', {
          position: "top-right",
          autoCloseDuration: 3000,
        });
        
        // Redirect to login page on success
        redirectWithDelay('/login', 2000);
      } else {
        Toast.error(response.message || 'Không thể đặt lại mật khẩu', {
          position: "top-right",
          autoCloseDuration: 3000,
        });
        throw new Error(response.message || 'Không thể đặt lại mật khẩu');
      }
    } catch (error: unknown) {
      console.error('Password reset failed:', error);
      Toast.error('Không thể đặt lại mật khẩu. Vui lòng thử lại sau.', {
        position: "top-right",
        autoCloseDuration: 3000,
      });
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
