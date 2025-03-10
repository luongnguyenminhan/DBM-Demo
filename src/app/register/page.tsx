'use client';

import React, { useState } from 'react';
import RegisterForm from '@/components/auth/registerForm';
import { Toast } from '@/components/molecules/alert';
import AuthContentWrapper from '@/components/auth/AuthContentWrapper';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleRegister = async (userData: { name: string; email: string; password: string }) => {
    setIsLoading(true);
    
    try {
      // Simulate API call with delay
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // For demo purposes, simulate successful registration except for a specific email
          if (userData.email === 'taken@example.com') {
            reject(new Error('Email đã được sử dụng'));
          } else {
            resolve(true);
          }
        }, 1000); // 1 second delay to simulate network request
      });
      
      // Show success toast on successful registration
      Toast.success('Đăng ký thành công!', {
        autoCloseDuration: 3000,
        position: 'top-right'
      });
      
      // Redirect or perform other actions after successful registration
      console.log('Registration successful:', userData);
      
    } catch (error) {
      // Error will be handled by the RegisterForm component
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContentWrapper>
      <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
    </AuthContentWrapper>
  );
}
