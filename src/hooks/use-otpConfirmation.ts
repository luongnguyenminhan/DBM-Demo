import { useState, useEffect, useRef } from 'react';
import { useFormValidation } from './use-form-validation';

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
  
  // Input refs for individual digit inputs
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

  // Validation states
  const [otpError, setOtpError] = useState<string | undefined>(undefined);
  const [emailError, setEmailError] = useState<string | undefined>(undefined);

  // Use our common validation hook
  const { validateOtp: commonValidateOtp, validateEmail: commonValidateEmail } = useFormValidation();

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
    const result = commonValidateOtp(value);
    setOtpError(result.message);
    return result.isValid;
  };

  const validateEmail = (value: string) => {
    const result = commonValidateEmail(value);
    setEmailError(result.message);
    return result.isValid;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserEmail(value);
    validateEmail(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Ensure input is numeric
    if (!/^\d*$/.test(value)) return;
    
    setOtp(value);
    validateOtp(value);
  };

  // Handle individual digit input
  const handleDigitInput = (index: number, value: string) => {
    // Allow only single digits
    if (!/^\d?$/.test(value)) return;
    
    // Create a new OTP string by replacing the digit at the specified index
    const newOtp = otp.padEnd(6, ' ').split('');
    newOtp[index] = value;
    const updatedOtp = newOtp.join('').trim();
    
    setOtp(updatedOtp);
    
    // Auto-focus next input if a digit was entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Validate if all digits have been entered
    if (updatedOtp.length === 6) {
      validateOtp(updatedOtp);
    }
  };
  
  // Handle backspace key
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous field on backspace if current field is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste event for OTP
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    // Check if pasted content is 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      setOtp(pastedData);
      validateOtp(pastedData);
      
      // Update individual inputs
      for (let i = 0; i < Math.min(6, pastedData.length); i++) {
        const inputRef = inputRefs.current[i];
        if (inputRef) {
          inputRef.value = pastedData[i];
        }
      }
      
      // Focus the last input
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email if it's required
    if (!email) {
      const isEmailValid = validateEmail(userEmail);
      if (!isEmailValid) return;
    }
    
    const isOtpValid = validateOtp(otp);
    if (!isOtpValid) return;
    
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
    setIsSubmitting,
    isResending,
    otpError,
    emailError,
    resendTimeout,
    canResend,
    inputRefs,
    validateOtp,
    validateEmail,
    handleEmailChange,
    handleInputChange,
    handleDigitInput,
    handleKeyDown,
    handlePaste,
    handleSubmit,
    handleResendOtp
  };
};

export default useOtpConfirmation;
