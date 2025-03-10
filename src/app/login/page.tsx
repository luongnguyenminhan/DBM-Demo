'use client';

import React, { useState } from 'react';
import LoginForm from '@/components/auth/loginForm';
import { Toast } from '@/components/molecules/alert';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    
    try {
      // Simulate API call with delay
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate successful login for demo@example.com/password123
          if (credentials.email === 'demo@example.com' && credentials.password === 'password123') {
            resolve(true);
          } else {
            reject(new Error('Email hoặc mật khẩu không chính xác'));
          }
        }, 1000); // 2 second delay to simulate network request
      });
      
      // Show success toast on successful login
      Toast.success('Đăng nhập thành công!', {
        autoCloseDuration: 3000,
        position: 'top-right'
      });
      
      // Redirect or perform other actions after successful login
      console.log('Login successful:', credentials);
      
    } catch (error) {
      // Error will be handled by the LoginForm component
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-20">
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-2/5">
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
      </div>
    </div>
  );
}