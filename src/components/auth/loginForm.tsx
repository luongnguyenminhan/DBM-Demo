'use client';

import React, { useEffect } from 'react';
import Button from '../atomic/button';
import Input from '../atomic/input';
import Typography from '../atomic/typo';
import { Toast } from '../molecules/alert';
import { faEnvelope, faLock, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import Card from '../atomic/card';
import useLoginForm from '../../hooks/use_loginForm';
const { Heading, Text } = Typography;

interface LoginFormProps {
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
  isLoading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading = false }) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    handleSubmit,
    emailError,
    passwordError,
    validateEmail,
    validatePassword,
    isSubmitting,
    setIsSubmitting
  } = useLoginForm({ onSubmit });

  // Show toast when error changes
  useEffect(() => {
    if (error) {
      Toast.error(error, {
        position: "top-right",
        autoCloseDuration: 6000,
        withAnimation: true,
        withShadow: true,
        onClose: () => setError(null)
      });
    }
  }, [error, setError]);

  // Combine parent loading state with local submitting state
  const isProcessing = isLoading || isSubmitting;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    setIsSubmitting(true);
    await handleSubmit(e);
    setIsSubmitting(false);
  };

  return (
    <Card
      variant="default"
      withShadow
      shadowSize="lg"
      rounded
      roundedSize="lg"
      padding="xl"
      className="backdrop-blur-sm bg-white/90"
      withAnimation
    >
      <div className="text-center mb-12">
        <Heading level="h1" size="3xl" withGradient className="mb-4">
          Chào Mừng Trở Lại
        </Heading>
        <Text variant="secondary" size="lg">
          Vui lòng đăng nhập để tiếp tục
        </Text>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-8">
        <Input
          label="Địa chỉ Email"
          type="email"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={handleEmailChange}
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

        <div className="pt-2">
          <Button
            htmlType="submit"
            variant="gradient"
            isFullWidth
            isLoading={isProcessing}
            loadingText="Đang đăng nhập..."
            size="large"
            rightIcon={!isProcessing ? faSignInAlt : undefined}
            rounded
            disabled={isProcessing}
            className="relative"
          >
            <div className="flex items-center justify-center">
              {isProcessing ? (
                  null
              ) : (
                'Đăng Nhập'
              )}
            </div>
          </Button>
        </div>

        <div className="text-center mt-4">
          <Text variant="secondary" size="sm">
            Chưa có tài khoản?{' '}
            <Text
              asLink
              href="/register"
              variant="primary"
              size="sm"
              customClassName="hover:underline"
            >
              Đăng Ký
            </Text>
          </Text>
        </div>
      </form>
    </Card>
  );
};

export default LoginForm;
