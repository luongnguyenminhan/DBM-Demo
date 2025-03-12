'use client';

import React, { useState } from 'react';
import LoginForm from '@/components/auth/loginForm';
import { Toast } from '@/components/molecules/alert';
import AuthContentWrapper from '@/components/auth/AuthContentWrapper';
import authApi from '@/apis/authenticationApi';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const handleLogin = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    
    try {
      const response = await authApi.login(credentials);
      
      // Check status code to handle different scenarios
      if (response.status === 200) {
        // Success case: User authenticated successfully
        if (response.data?.access_token && response.data?.refresh_token) {
            // Store tokens in localStorage
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            
            // Store tokens in cookies
            document.cookie = `access_token=${response.data.access_token}; path=/; max-age=86400; SameSite=Strict`;
            document.cookie = `refresh_token=${response.data.refresh_token}; path=/; max-age=604800; SameSite=Strict`;
            
            // Show success toast on successful login
            Toast.success('Login successful!', {
              autoCloseDuration: 1000,
              position: 'top-right'
            });
            
            // Redirect to dashboard after a short delay
            setTimeout(() => {
              router.push('/dashboard');
            }, 1500);
        }
      } else if (response.status === 401) {
        // Email verification required case
        Toast.warning('Your email address needs to be verified', {
          autoCloseDuration: 3000,
          position: 'top-right'
        });
        
        // Encode email for security
        const encodedEmail = btoa(credentials.email);
        
        // Redirect to OTP confirmation with email parameter after short delay
        setTimeout(() => {
          router.push(`/otp-confirmation?email=${encodedEmail}&purpose=login`);
        }, 1500);
      } else {
        // Other non-success cases
        Toast.error(response.message || 'Login failed', {
          autoCloseDuration: 3000,
          position: 'top-right'
        });
        throw new Error(response.message || 'Đăng nhập thất bại');
      }
    } catch (error: unknown) {
      console.error('Login failed:', error);
      
      // Default error message for API failures
      Toast.error('Email or password is incorrect', {
        autoCloseDuration: 3000,
        position: 'top-right'
      });
      
      throw new Error('Email hoặc mật khẩu không chính xác');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContentWrapper>
      <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
    </AuthContentWrapper>
  );
}