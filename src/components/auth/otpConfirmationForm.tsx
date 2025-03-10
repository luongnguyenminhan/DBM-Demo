'use client';

import React, { useEffect } from 'react';
import Button from '../atomic/button';
import Input from '../atomic/input';
import Typography from '../atomic/typo';
import { Toast } from '../molecules/alert';
import { faEnvelope, faKey, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import useOtpConfirmation from '../../hooks/use-otpConfirmation';
import AuthLayout from './authLayout';
const { Heading, Text } = Typography;

interface OtpConfirmationFormProps {
  onSubmit: (otp: string, email: string) => Promise<void>;
  email?: string;
  isLoading?: boolean;
  resendOTP?: () => Promise<void>;
  purpose?: 'registration' | 'passwordReset' | 'login';
}

const OtpConfirmationForm: React.FC<OtpConfirmationFormProps> = ({ 
  onSubmit, 
  email = '', 
  isLoading = false,
  resendOTP,
  purpose = 'registration'
}) => {
  const {
    otp,
    userEmail,
    error,
    setError,
    success,
    isSubmitting,
    isResending,
    otpError,
    emailError,
    resendTimeout,
    canResend,
    inputRefs,
    handleEmailChange,
    handleInputChange,
    handleDigitInput,
    handleKeyDown,
    handlePaste,
    handleSubmit,
    handleResendOtp
  } = useOtpConfirmation({ onSubmit, email, resendOTP });

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
  
  let purposeTitle = 'Xác Thực OTP';
  let purposeDescription = 'Vui lòng nhập mã OTP đã được gửi đến email của bạn';
  let sideTitle = 'Verify your identity';
  let sideDescription = 'Xác thực danh tính của bạn để tiếp tục sử dụng dịch vụ.';
  
  if (purpose === 'registration') {
    purposeTitle = 'Xác Thực Tài Khoản';
    purposeDescription = 'Vui lòng nhập mã OTP đã được gửi đến email của bạn để hoàn tất đăng ký';
    sideTitle = 'Almost there!';
    sideDescription = 'Chỉ còn một bước nữa để hoàn tất quá trình đăng ký tài khoản.';
  } else if (purpose === 'passwordReset') {
    purposeTitle = 'Xác Thực Đặt Lại Mật Khẩu';
    purposeDescription = 'Vui lòng nhập mã OTP đã được gửi đến email của bạn để đặt lại mật khẩu';
    sideTitle = 'Reset your password';
    sideDescription = 'Xác thực danh tính của bạn để đặt lại mật khẩu an toàn.';
  }

  return (
    <AuthLayout
      sideTitle={sideTitle}
      sideDescription={sideDescription}
      sideTag="EnterViu"
    >
      <div className="text-center mb-6">
        <Heading level="h1" size="2xl" withGradient className="mb-2">
          {purposeTitle}
        </Heading>
        <Text variant="secondary" size="base">
          {purposeDescription}
        </Text>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {!email && (
          <Input
            label="Địa chỉ Email"
            type="email"
            placeholder="Nhập email của bạn"
            value={userEmail}
            onChange={handleEmailChange}
            leftIcon={faEnvelope}
            isRequired
            variant="outlined"
            withFloatingLabel
            isFullWidth
            isDisabled={isProcessing || !!success}
            isError={!!emailError}
            errorMessage={emailError}
          />
        )}
        
        <div className="mb-2">
          <Text variant="secondary" size="sm">
            Mã OTP
            <span className="text-[var(--color-error)] ml-1">*</span>
          </Text>
        </div>
        
        {/* Hidden input for form submission */}
        <input 
          type="hidden"
          name="otp"
          value={otp}
        />
        
        {/* OTP input grid with individual digit inputs */}
        <div className="grid grid-cols-6 gap-2 mb-2">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              className={`w-full h-14 text-center text-xl font-semibold border rounded-md focus:outline-none focus:ring-2 
                ${otpError ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]' : 'focus:ring-[var(--color-primary)] border-gray-300'}
                ${isProcessing || !!success ? 'opacity-70 cursor-not-allowed' : ''}`}
              value={otp[index] || ''}
              onChange={(e) => handleDigitInput(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              disabled={isProcessing || !!success}
              inputMode="numeric"
            />
          ))}
        </div>
        
        {/* Error message for OTP */}
        {otpError && (
          <div className="text-xs mt-1 text-[var(--color-error)]">
            {otpError}
          </div>
        )}
        
        {/* Legacy single input for fallback */}
        <div className="hidden">
          <Input
            type="text"
            placeholder="Nhập mã xác thực 6 số"
            value={otp}
            onChange={handleInputChange}
            leftIcon={faKey}
            variant="outlined"
            isError={!!otpError}
            errorMessage={otpError}
            isFullWidth
            isDisabled={isProcessing || !!success}
            maxLength={6}
          />
        </div>

        <div className="pt-2">
          <Button
            htmltype="submit"
            variant="gradient"
            isFullWidth
            isLoading={isProcessing}
            size="large"
            rightIcon={!isProcessing ? faShieldAlt : undefined}
            rounded
            disabled={isProcessing || !!success}
          >
            <div className="flex items-center justify-center">
              {isProcessing ? null : 'Xác Thực'}
            </div>
          </Button>
        </div>

        <div className="flex justify-center mt-4">
          <Button
            variant="primary"
            size="small"
            isLoading={isResending}
            disabled={!canResend || isResending || isProcessing}
            onClick={handleResendOtp}
          >
            {isResending ? 'Đang gửi lại...' : canResend ? 'Gửi lại mã OTP' : `Gửi lại sau ${resendTimeout}s`}
          </Button>
        </div>
      </form>

      <div className="text-center mt-6">
        <Text variant="secondary" size="sm">
          Quay lại{' '}
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

export default OtpConfirmationForm;
