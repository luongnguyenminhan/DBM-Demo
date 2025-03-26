'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import OtpConfirmationForm from '@/components/auth/otpConfirmationForm';
import { Toast } from '@/components/molecules/alert';
import AuthContentWrapper from '@/components/auth/authContentWrapper';
import { useAuthPage } from '@/hooks/use_authPage';

function OtpConfirmationContent() {
  const { isLoading, handleOtpConfirmation, handleResendOtp } = useAuthPage();
  const searchParams = useSearchParams();
  
  const encodedEmail = searchParams.get('email') || '';
  const purpose = (searchParams.get('purpose') || 'registration') as 'registration' | 'passwordReset' | 'login';
  
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
      Toast.error('Không tìm thấy thông tin email. Vui lòng thử lại.', {
        position: "top-right",
        autoCloseDuration: 5000,
      });
    }
  }, [email]);
  
  const handleOtpSubmit = async (otp: string, emailAddress: string) => {
    await handleOtpConfirmation(otp, emailAddress, purpose, encodedEmail);
  };

  const handleResendOtpRequest = async () => {
    await handleResendOtp(email);
  };

  return (
    <OtpConfirmationForm 
      onSubmit={handleOtpSubmit} 
      email={email} 
      isLoading={isLoading} 
      resendOTP={handleResendOtpRequest}
      purpose={purpose}
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

export default function OtpConfirmationPage() {
  return (
    <AuthContentWrapper>
      <Suspense fallback={<LoadingFallback />}>
        <OtpConfirmationContent />
      </Suspense>
    </AuthContentWrapper>
  );
}
