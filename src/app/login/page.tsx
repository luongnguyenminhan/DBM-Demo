'use client';

import React, { useState } from 'react';
import LoginForm from '@/components/auth/loginForm';
import { Toast } from '@/components/molecules/alert';
import { motion } from 'framer-motion';

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
        }, 1000); // 1 second delay to simulate network request
      });
      
      // Show success toast on successful login
      Toast.success('Đăng nhập thành công!', {
        autoCloseDuration: 3000,
        position: 'top-right'
      });
      
      // Redirect or perform other actions after successful login
      console.log('Login successful:', credentials);
      
      // Add a slight delay before potentially redirecting
      setTimeout(() => {
        // You could add router.push('/dashboard') here
      }, 1000);
      
    } catch (error) {
      // Error will be handled by the LoginForm component
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Area */}
      <header className="py-6 px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto flex justify-between items-center"
        >
          <div className="text-xl font-semibold text-gray-800">DBM System</div>
          <div className="text-sm">
            <span className="text-gray-500 mr-2">Bạn cần hỗ trợ?</span>
            <a href="/help" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Trung tâm hỗ trợ
            </a>
          </div>
        </motion.div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-5xl mx-auto">
          <LoginForm onSubmit={handleLogin} isLoading={isLoading}/>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-4 px-8 text-center text-sm text-gray-500">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p>© {new Date().getFullYear()} DBM System. Tất cả các quyền được bảo lưu.</p>
        </motion.div>
      </footer>
    </div>
  );
}