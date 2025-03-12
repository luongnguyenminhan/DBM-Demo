'use client';

import React, { useState } from 'react';
import ForgotPasswordForm from '@/components/auth/forgotPasswordForm';
import AuthContentWrapper from '@/components/auth/AuthContentWrapper';
import authApi from '@/apis/authenticationApi';
import { Toast } from '@/components/molecules/alert';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const handleForgotPassword = async (email: string) => {
    setIsLoading(true);
    
    try {
      const response = await authApi.requestPasswordReset({ email });
      
      if (response.status === 200) {
        Toast.success('Link đặt lại mật khẩu đã được gửi!', {
          position: "top-right",
          autoCloseDuration: 3000,
        });
        // Encrypt email for security
        const encryptedEmail = btoa(email); // Base64 encoding for simple encryption
        console.log('Encrypted email:', encryptedEmail);
        // Redirect to OTP confirmation page with the email and purpose
        router.push(`/otp-confirmation?email=${encryptedEmail}&purpose=passwordReset`);
      } else {
        throw new Error(response.message || 'Không thể gửi email đặt lại mật khẩu');
      }
      
    } catch (error: unknown) {
      console.error('Password reset request failed:', error);
      throw new Error('Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContentWrapper>
      <ForgotPasswordForm onSubmit={handleForgotPassword} isLoading={isLoading} />
    </AuthContentWrapper>
  );
}
