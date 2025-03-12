'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import OtpConfirmationForm from '@/components/auth/otpConfirmationForm';
import { Toast } from '@/components/molecules/alert';
import AuthContentWrapper from '@/components/auth/AuthContentWrapper';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import authApi from '@/apis/authenticationApi';

// Client component that safely uses useSearchParams
function OtpConfirmationContent() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const { redirectWithDelay } = useAuthRedirect();
  
  // Get encoded email and purpose from query parameters
  const encodedEmail = searchParams.get('email') || '';
  const purpose = (searchParams.get('purpose') || 'registration') as 'registration' | 'passwordReset' | 'login';
  
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
      Toast.error('Không tìm thấy thông tin email. Vui lòng thử lại.', {
        position: "top-right",
        autoCloseDuration: 5000,
      });
    }
  }, [email]);
  
  const handleOtpConfirmation = async (otp: string, emailAddress: string) => {
    setIsLoading(true);
    
    try {
      const verificationData = {
        email: emailAddress,
        token: otp
      };
      
      const response = await authApi.verifyEmail(verificationData);
      
      if (response.status === 200) {
        // Success case
        Toast.success('Xác thực OTP thành công!', {
          position: "top-right",
          autoCloseDuration: 3000,
        });
        
        // Redirect based on purpose
        if (purpose === 'passwordReset') {
          // Keep the email encoded for the next step
          redirectWithDelay(`/reset-password?email=${encodedEmail}`, 1000);
        } else if (purpose === 'registration') {
          redirectWithDelay('/registration-complete', 1000);
        } else {
          redirectWithDelay('/dashboard', 1000);
        }
      } else {
        console.error('OTP verification failed:', response);
        Toast.error(response.message || 'Xác thực thất bại', {
          autoCloseDuration: 3000,
          position: 'top-right'
        });
        throw new Error(response.message || 'Xác thực thất bại');
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
      Toast.error('Mã OTP không hợp lệ hoặc đã hết hạn', {
        position: "top-right",
        autoCloseDuration: 3000,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await authApi.requestEmailVerification({ email });
      
      if (response.status === 200) {
        Toast.success('Mã OTP mới đã được gửi!', {
          position: "top-right",
          autoCloseDuration: 3000,
        });
        return Promise.resolve();
      } else {
        Toast.error(response.message || 'Không thể gửi lại mã OTP', {
          position: "top-right",
          autoCloseDuration: 3000,
        });
        return Promise.reject(new Error(response.message || 'Không thể gửi lại mã OTP'));
      }
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      Toast.error('Không thể gửi lại mã OTP', {
        position: "top-right",
        autoCloseDuration: 3000,
      });
      return Promise.reject(new Error('Không thể gửi lại mã OTP'));
    }
  };

  return (
    <OtpConfirmationForm 
      onSubmit={handleOtpConfirmation} 
      email={email} 
      isLoading={isLoading} 
      resendOTP={handleResendOtp}
      purpose={purpose}
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
export default function OtpConfirmationPage() {
  return (
    <AuthContentWrapper>
      <Suspense fallback={<LoadingFallback />}>
        <OtpConfirmationContent />
      </Suspense>
    </AuthContentWrapper>
  );
}
