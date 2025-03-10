'use client';

import React, { useEffect } from 'react';
import Button from '../atomic/button';
import Input from '../atomic/input';
import Typography from '../atomic/typo';
import { Toast } from '../molecules/alert';
import { faEnvelope, faLock, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import useRegisterForm from '../../hooks/use_registerForm';
import AuthLayout from './authLayout';
const { Heading, Text } = Typography;

interface RegisterFormProps {
  onSubmit: (userData: { name: string; email: string; password: string }) => Promise<void>;
  isLoading?: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isLoading = false }) => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    setError,
    isSubmitting,
    nameError,
    emailError,
    passwordError,
    confirmPasswordError,
    validateName,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    handleSubmit
  } = useRegisterForm({ onSubmit });

  // Show toast when error changes
  useEffect(() => {
    if (error) {
      Toast.error(error, {
        position: "top-right",
        autoCloseDuration: 5000,
        withAnimation: true,
        withShadow: true
      });
      
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  const isProcessing = isLoading || isSubmitting;

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (confirmPassword) validateConfirmPassword(confirmPassword);
  };

  return (
    <AuthLayout
      sideTitle="Bắt đầu hành trình mới"
      sideDescription="Đăng ký để trở thành thành viên của EnterViu - nơi bạn khám phá tiềm năng của bản thân."
      sideTag="EnterViu"
    >
      <div className="text-center mb-6">
        <Heading level="h1" size="2xl" withGradient className="mb-2">
          Tạo Tài Khoản Mới
        </Heading>
        <Text variant="secondary" size="base">
          Điền thông tin để đăng ký tài khoản
        </Text>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Họ và tên"
          type="text"
          placeholder="Nhập họ và tên của bạn"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => validateName(name)}
          leftIcon={faUser}
          isRequired
          variant="outlined"
          withFloatingLabel
          isError={!!nameError}
          errorMessage={nameError} 
          isFullWidth
          isDisabled={isProcessing}
        />

        <Input
          label="Địa chỉ Email"
          type="email"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => validateEmail(email)}
          leftIcon={faEnvelope}
          isRequired
          variant="outlined"
          withFloatingLabel
          isError={!!emailError}
          errorMessage={emailError}
          isFullWidth
          isDisabled={isProcessing}
        />

        <Input
          label="Mật khẩu"
          type="password"
          placeholder="Nhập mật khẩu của bạn"
          value={password}
          onChange={handlePasswordChange}
          onBlur={() => validatePassword(password)}
          leftIcon={faLock}
          isRequired
          variant="outlined"
          withFloatingLabel
          isError={!!passwordError}
          errorMessage={passwordError}
          isFullWidth
          isDisabled={isProcessing}
        />

        <Input
          label="Xác nhận mật khẩu"
          type="password"
          placeholder="Nhập lại mật khẩu của bạn"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={() => validateConfirmPassword(confirmPassword)}
          leftIcon={faLock}
          isRequired
          variant="outlined"
          withFloatingLabel
          isError={!!confirmPasswordError}
          errorMessage={confirmPasswordError}
          isFullWidth
          isDisabled={isProcessing}
        />

        <div className="pt-2">
          <Button
            htmltype="submit"
            variant="gradient"
            isFullWidth
            isLoading={isProcessing}
            size="large"
            rightIcon={!isProcessing ? faUserPlus : undefined}
            rounded
            disabled={isProcessing}
          >
            <div className="flex items-center justify-center">
              {isProcessing ? null : 'Đăng Ký'}
            </div>
          </Button>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Hoặc đăng ký với</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            isFullWidth 
            size="medium"
            className="border-gray-300"
          >
            <div className="flex items-center justify-center">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.545 10.239v3.821h5.445c-0.643 2.508-2.608 4.112-5.445 4.112-3.332 0-6.033-2.701-6.033-6.033s2.701-6.032 6.033-6.032c1.542 0 2.939 0.583 3.999 1.541l2.999-2.999c-1.996-1.888-4.662-3.046-7.598-3.046-6.048 0-10.941 4.893-10.941 10.941s4.893 10.94 10.941 10.94c6.305 0 10.498-4.463 10.498-10.726 0-0.636-0.073-1.265-0.211-1.889h-10.687z"/>
              </svg>
              Google
            </div>
          </Button>
          <Button 
            variant="outline" 
            isFullWidth 
            size="medium"
            className="border-gray-300"
          >
            <div className="flex items-center justify-center">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.959 12c0 -5.498 -4.461 -9.959 -9.959 -9.959 -5.498 0 -9.959 4.461 -9.959 9.959 0 4.972 3.647 9.089 8.4 9.828v-6.959h-2.528v-2.869h2.528v-2.183c0 -2.496 1.488 -3.869 3.756 -3.869 1.087 0 2.224 0.195 2.224 0.195v2.442h-1.251c-1.233 0 -1.617 0.765 -1.617 1.548v1.867h2.752l-0.44 2.869h-2.312v6.959c4.753 -0.739 8.4 -4.856 8.4 -9.828z"/>
              </svg>
              Facebook
            </div>
          </Button>
        </div>
      </div>

      <div className="text-center mt-6">
        <Text variant="secondary" size="sm">
          Đã có tài khoản?{' '}
          <Text
            asLink
            href="/login"
            variant="primary"
            size="sm"
            customClassName="hover:underline font-medium"
          >
            Đăng Nhập
          </Text>
        </Text>
      </div>
    </AuthLayout>
  );
};

export default RegisterForm;
