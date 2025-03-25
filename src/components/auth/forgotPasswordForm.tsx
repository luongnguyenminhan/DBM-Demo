'use client';

import React, { useEffect } from 'react';
import Button from '../atomic/button';
import Input from '../atomic/input';
import Typography from '../atomic/typo';
import { Toast } from '../molecules/alert';
import { faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import useForgotPasswordForm from '../../hooks/use-forgotPasswordForm';
import AuthTemplate from './authTemplate';
const { Heading, Text } = Typography;

interface ForgotPasswordFormProps {
  onSubmit: (email: string) => Promise<void>;
  isLoading?: boolean;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSubmit, isLoading = false }) => {
  const {
    email,
    setEmail,
    error,
    setError,
    success,
    isSubmitting,
    emailError,
    validateEmail,
    handleSubmit
  } = useForgotPasswordForm({ onSubmit });

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

  return (
    <AuthTemplate
      sideTitle="Lấy lại tài khoản của bạn"
      sideDescription="Quên mật khẩu? Đừng lo lắng. Chúng tôi sẽ giúp bạn khôi phục tài khoản."
      sideTag="Meobeo.ai"
    >
      <div className="text-center mb-6">
        <Heading level="h1" size="2xl" withGradient className="mb-2">
          Khôi Phục Mật Khẩu
        </Heading>
        <Text variant="secondary" size="base">
          Nhập địa chỉ email của bạn để nhận liên kết đặt lại mật khẩu
        </Text>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
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
          isDisabled={isProcessing || !!success}
        />

        <div className="pt-2">
          <Button
            htmltype="submit"
            variant="gradient"
            isFullWidth
            isLoading={isProcessing}
            size="large"
            rightIcon={!isProcessing ? faPaperPlane : undefined}
            rounded
            disabled={isProcessing || !!success}
          >
            <div className="flex items-center justify-center">
              {isProcessing ? null : 'Gửi Liên Kết'}
            </div>
          </Button>
        </div>
      </form>

      <div className="text-center mt-6">
        <Text variant="secondary" size="sm">
          Nhớ mật khẩu?{' '}
          <Text
            asLink
            href="login"
            variant="primary"
            size="sm"
            customClassName="hover:underline font-medium"
          >
            Đăng Nhập
          </Text>
        </Text>
      </div>

      <div className="text-center mt-2">
        <Text variant="secondary" size="sm">
          Chưa có tài khoản?{' '}
          <Text
            asLink
            href="register"
            variant="primary"
            size="sm"
            customClassName="hover:underline font-medium"
          >
            Đăng Ký Ngay
          </Text>
        </Text>
      </div>
    </AuthTemplate>
  );
};

export default ForgotPasswordForm;
