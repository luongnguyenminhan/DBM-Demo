'use client';

import React, { useState } from 'react';
import LoginForm from '@/components/auth/loginForm';
import { Toast } from '@/components/molecules/alert';
import { motion } from 'framer-motion';
import LocaleSwitcher from '@/components/molecules/localeSwitcher';

export default function LoginPage({
  params
}: {
  params: { locale: string }
}) {
  const { locale } = params;
  const [isLoading, setIsLoading] = useState(false);
  
  // Get config for static text
  
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
            // Use config for error messages to ensure consistency
            reject(new Error(locale === 'vi' ? 
              'Email hoặc mật khẩu không chính xác' : 
              'Incorrect email or password'));
          }
        }, 1000);
      });
      
      // Use config for success message
      Toast.success(locale === 'vi' ? 'Đăng nhập thành công!' : 'Login successful!', {
        autoCloseDuration: 3000,
        position: 'top-right'
      });
      
      console.log('Login successful:', credentials);
      
      setTimeout(() => {
        // You could add router.push(`/${locale}/dashboard`) here
      }, 1000);
      
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Static text for header and footer - consistent with server/client
  const helpText = locale === 'vi' ? 'Bạn cần hỗ trợ?' : 'Need help?';
  const helpCenter = locale === 'vi' ? 'Trung tâm hỗ trợ' : 'Help Center';
  const copyright = locale === 'vi' ? 'Tất cả các quyền được bảo lưu.' : 'All rights reserved.';

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
          <div className="flex items-center space-x-6">
            <LocaleSwitcher currentLocale={locale} />
            <div className="text-sm">
              <span className="text-gray-500 mr-2">{helpText}</span>
              <a href={`/${locale}/help`} className="text-indigo-600 hover:text-indigo-800 font-medium">
                {helpCenter}
              </a>
            </div>
          </div>
        </motion.div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-5xl mx-auto">
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} locale={locale} />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-4 px-8 text-center text-sm text-gray-500">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p>© {new Date().getFullYear()} DBM System. {copyright}</p>
        </motion.div>
      </footer>
    </div>
  );
}
