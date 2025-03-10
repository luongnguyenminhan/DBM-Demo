'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ResetPasswordForm from '@/components/auth/resetPasswordForm';
import { Toast } from '@/components/molecules/alert';

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get email from query parameters
  const email = searchParams.get('email') || '';
  
  useEffect(() => {
    if (!email) {
      Toast.error('Không tìm thấy thông tin email. Vui lòng thử lại.', {
        position: "top-right",
        autoCloseDuration: 5000,
      });
      
      // Redirect to forgot password after a short delay if no email is provided
      const timer = setTimeout(() => {
        router.push('/forgot-password');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [email, router]);
  
  const handleResetPassword = async (passwordData: { password: string; email: string }) => {
    setIsLoading(true);
    
    try {
      // Simulate API call with delay
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1500); // 1.5 second delay to simulate network request
      });
      
      // Use passwordData in a console log to avoid the unused variable warning
      console.log(`Resetting password for ${passwordData.email} with new password length: ${passwordData.password.length}`);
      
      // Success case
      Toast.success('Mật khẩu đã được đặt lại thành công!', {
        position: "top-right",
        autoCloseDuration: 3000,
      });
      
      // Redirect to login after a success (handled by the form)
      setTimeout(() => {
        router.push('/login');
      }, 2000);
      
    } catch (error) {
      // Error will be handled by the form component
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-lg text-gray-600">Đang chuyển hướng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-20">
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-2/5">
        <ResetPasswordForm 
          onSubmit={handleResetPassword} 
          email={email}
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
}
