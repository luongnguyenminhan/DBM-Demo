'use client';

import React, { useState } from 'react';
import ForgotPasswordForm from '@/components/auth/forgotPasswordForm';
import AuthContentWrapper from '@/components/auth/AuthContentWrapper';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleForgotPassword = async (email: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call with delay
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // For demo purposes, simulate error for a specific email
          if (email === 'unknown@example.com') {
            reject(new Error('Không tìm thấy tài khoản với email này'));
          } else {
            resolve(true);
          }
        }, 1500); // 1.5 second delay to simulate network request
      });
      
      // Success will be handled by the form component with a success message
      console.log('Password reset email sent to:', email);
      
    } catch (error) {
      // Error will be handled by the form component
      throw error;
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
