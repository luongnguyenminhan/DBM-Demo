'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import OtpConfirmationForm from '@/components/auth/otpConfirmationForm';
import { Toast } from '@/components/molecules/alert';
import AuthContentWrapper from '@/components/auth/AuthContentWrapper';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

export default function OtpConfirmationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { redirectWithDelay } = useAuthRedirect();
  
  // Get email and purpose from query parameters
  const email = searchParams.get('email') || '';
  const purpose = (searchParams.get('purpose') || 'registration') as 'registration' | 'passwordReset' | 'login';
  
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
      // Simulate API call with delay
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // For demonstration purposes, reject if OTP is 111111
          if (otp === '111111') {
            reject(new Error('Mã OTP không hợp lệ'));
          } else {
            resolve(true);
          }
        }, 1500); // 1.5 second delay to simulate network request
      });
      
      // Success case
      Toast.success('Xác thực OTP thành công!', {
        position: "top-right",
        autoCloseDuration: 3000,
      });
      
      // Redirect based on purpose
      if (purpose === 'passwordReset') {
        redirectWithDelay(`/reset-password?email=${encodeURIComponent(emailAddress)}`, 1000);
      } else if (purpose === 'registration') {
        redirectWithDelay('/registration-complete', 1000);
      } else {
        redirectWithDelay('/dashboard', 1000);
      }
      
    } catch (error) {
      // Error will be handled by the form component
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      // Simulate API call with delay
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000); // 1 second delay
      });
      
      return Promise.resolve();
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error('Không thể gửi lại mã OTP'));
    }
  };

  return (
    <AuthContentWrapper>
      <OtpConfirmationForm 
        onSubmit={handleOtpConfirmation} 
        email={email} 
        isLoading={isLoading} 
        resendOTP={handleResendOtp}
        purpose={purpose}
      />
    </AuthContentWrapper>
  );
}
