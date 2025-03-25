'use client';

import React, { useEffect } from 'react';
import Button from '../atomic/button';
import Input from '../atomic/input';
import Typography from '../atomic/typo';
import { Toast } from '../molecules/alert';
import { faLock, faKey } from '@fortawesome/free-solid-svg-icons';
import useResetPasswordForm from '../../hooks/use-resetPasswordForm';
import AuthTemplate from './authTemplate';
const { Heading, Text } = Typography;

interface ResetPasswordFormProps {
  onSubmit: (passwordData: { password: string; email: string }) => Promise<void>;
  email?: string;
  isLoading?: boolean;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ 
  onSubmit, 
  email = '', 
  isLoading = false 
}) => {
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    userEmail,
    error,
    setError,
    success,
    isSubmitting,
    passwordError,
    confirmPasswordError,
    validatePassword,
    validateConfirmPassword,
    handleSubmit
  } = useResetPasswordForm({ onSubmit, email });

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

  // Show toast when success changes
  useEffect(() => {
    if (success) {
      Toast.success(success, {
        position: "top-right",
        autoCloseDuration: 5000,
        withAnimation: true,
        withShadow: true
      });
    }
  }, [success]);

  const isProcessing = isLoading || isSubmitting;

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (confirmPassword) validateConfirmPassword(confirmPassword);
  };

  return (
    <AuthTemplate
      sideTitle="Đặt lại mât khẩu mới"
      sideDescription="Đặt lại mật khẩu mới để bảo vệ tài khoản của bạn an toàn."
      sideTag="Meobeo.ai"
    >
      <div className="text-center mb-6">
        <Heading level="h1" size="2xl" withGradient className="mb-2">
          Đặt Lại Mật Khẩu
        </Heading>
        <Text variant="secondary" size="base">
          Vui lòng nhập mật khẩu mới cho tài khoản {userEmail}
        </Text>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Mật khẩu mới"
          type="password"
          placeholder="Nhập mật khẩu mới của bạn"
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
          isDisabled={isProcessing || !!success}
        />

        <Input
          label="Xác nhận mật khẩu"
          type="password"
          placeholder="Nhập lại mật khẩu mới của bạn"
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
          isDisabled={isProcessing || !!success}
        />

        <div className="pt-2">
          <Button
            htmltype="submit"
            variant="gradient"
            isFullWidth
            isLoading={isProcessing}
            size="large"
            rightIcon={!isProcessing ? faKey : undefined}
            rounded
            disabled={isProcessing || !!success}
          >
            <div className="flex items-center justify-center">
              {isProcessing ? null : 'Đặt Lại Mật Khẩu'}
            </div>
          </Button>
        </div>
      </form>

      {success && (
        <div className="text-center mt-6">
          <Text
            asLink
            href="auth/login"
            variant="primary"
            size="sm"
            customClassName="hover:underline font-medium"
          >
            Quay lại trang đăng nhập
          </Text>
        </div>
      )}

      {!success && (
        <div className="text-center mt-6">
          <Text variant="secondary" size="sm">
            Nhớ mật khẩu cũ?{' '}
            <Text
              asLink
              href="auth/login"
              variant="primary"
              size="sm"
              customClassName="hover:underline font-medium"
            >
              Đăng Nhập
            </Text>
          </Text>
        </div>
      )}
    </AuthTemplate>
  );
};

export default ResetPasswordForm;
