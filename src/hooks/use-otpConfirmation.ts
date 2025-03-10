import { useState, useEffect } from 'react';

interface UseOtpConfirmationProps {
  onSubmit: (otp: string, email: string) => Promise<void>;
  email?: string;
  resendOTP?: () => Promise<void>;
}

const useOtpConfirmation = ({ onSubmit, email = '', resendOTP }: UseOtpConfirmationProps) => {
  const [otp, setOtp] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>(email);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [resendTimeout, setResendTimeout] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);

  // Validation states
  const [otpError, setOtpError] = useState<string | undefined>(undefined);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (resendTimeout > 0 && !canResend) {
      timer = setTimeout(() => {
        setResendTimeout((prev) => prev - 1);
      }, 1000);
    } else if (resendTimeout === 0 && !canResend) {
      setCanResend(true);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [resendTimeout, canResend]);

  const validateOtp = (value: string) => {
    if (!value.trim()) {
      setOtpError('Mã OTP không được để trống');
      return false;
    }
    
    if (value.length !== 6 || !/^\d+$/.test(value)) {
      setOtpError('Mã OTP phải gồm 6 chữ số');
      return false;
    }
    
    setOtpError(undefined);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isOtpValid = validateOtp(otp);
    
    if (!isOtpValid) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      await onSubmit(otp, userEmail);
      setSuccess('Xác thực OTP thành công!');
    } catch (err: unknown) {
      console.error(err);
      setError('Xác thực OTP thất bại. Vui lòng thử lại.');
      setSuccess(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend || !resendOTP) return;
    
    try {
      setIsResending(true);
      await resendOTP();
      setCanResend(false);
      setResendTimeout(60);
      setSuccess('Đã gửi lại mã OTP thành công!');
      
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    } catch (err: unknown) {
      console.error(err);
      setError('Không thể gửi lại mã OTP. Vui lòng thử lại sau.');
    } finally {
      setIsResending(false);
    }
  };

  return {
    otp,
    setOtp,
    userEmail,
    setUserEmail,
    error,
    setError,
    success,
    setSuccess,
    isSubmitting,
    isResending,
    otpError,
    resendTimeout,
    canResend,
    validateOtp,
    handleSubmit,
    handleResendOtp
  };
};

export default useOtpConfirmation;
