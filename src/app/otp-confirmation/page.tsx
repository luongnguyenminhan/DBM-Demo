'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import OtpConfirmationForm from '@/components/auth/otpConfirmationForm';
import { Toast } from '@/components/molecules/alert';

export default function OtpConfirmationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  
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
      setTimeout(() => {
        if (purpose === 'passwordReset') {
          router.push(`/reset-password?email=${encodeURIComponent(emailAddress)}`);
        } else if (purpose === 'registration') {
          router.push('/registration-complete');
        } else {
          router.push('/dashboard');
        }
      }, 1000);
      
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
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-20">
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-2/5">
        <OtpConfirmationForm 
          onSubmit={handleOtpConfirmation} 
          email={email} 
          isLoading={isLoading} 
          resendOTP={handleResendOtp}
          purpose={purpose}
        />
      </div>
    </div>
  );
}
