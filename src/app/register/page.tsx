'use client';

import React, { useState } from 'react';
import RegisterForm from '@/components/auth/registerForm';
import { Toast } from '@/components/molecules/alert';
import AuthContentWrapper from '@/components/auth/AuthContentWrapper';
import authApi from '@/apis/authenticationApi';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const handleRegister = async (userData: { name: string; email: string; password: string }) => {
    setIsLoading(true);
    
    try {
      // Prepare signup data according to SignupRequest interface
      const signupData = {
        email: userData.email,
        username: userData.name,
        password: userData.password,
        confirm_password: userData.password,
        device_address: navigator.userAgent || 'unknown'
      };
      
      const response = await authApi.signup(signupData);
      
      if (response.status === 200 || response.status === 201) {
        // Show success toast on successful registration
        Toast.success('Đăng ký thành công!', {
          autoCloseDuration: 1500,
          position: 'top-right'
        });
        
        // Encrypt email for security
        const encryptedEmail = btoa(userData.email); // Base64 encoding for simple encryption
        
        // Redirect to OTP confirmation page after a short delay
        setTimeout(() => {
          router.push(`/otp-confirmation?email=${encryptedEmail}&purpose=registration`);
        }, 1500);
      } else {
        console.error('Registration failed:', response);
        Toast.error(response.message || 'Đăng ký thất bại', {
          autoCloseDuration: 3000,
          position: 'top-right'
        });
        throw new Error(response.message || 'Đăng ký thất bại');
      }
    } catch (error: unknown) {
      console.error('Registration failed:', error);
      
      // Handle error from API response if available
      const errorMessage = 'Email đã được sử dụng hoặc đăng ký thất bại';
      
      Toast.error(errorMessage, {
        autoCloseDuration: 3000,
        position: 'top-right'
      });
      
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
