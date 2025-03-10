'use client';

import React, { useState } from 'react';
import ForgotPasswordForm from '@/components/auth/forgotPasswordForm';

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
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-20">
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-2/5">
        <ForgotPasswordForm onSubmit={handleForgotPassword} isLoading={isLoading} />
      </div>
    </div>
  );
}
