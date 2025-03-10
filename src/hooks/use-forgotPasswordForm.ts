import { useState } from 'react';

interface UseForgotPasswordFormProps {
  onSubmit: (email: string) => Promise<void>;
}

const useForgotPasswordForm = ({ onSubmit }: UseForgotPasswordFormProps) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation states
  const [emailError, setEmailError] = useState<string | undefined>(undefined);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) {
      setEmailError('Email không được để trống');
      return false;
    }
    if (!emailRegex.test(value)) {
      setEmailError('Email không hợp lệ');
      return false;
    }
    setEmailError(undefined);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);

    if (!isEmailValid) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(null);
      
      await onSubmit(email);
      
      setSuccess(`Liên kết đặt lại mật khẩu đã được gửi đến ${email}. Vui lòng kiểm tra hộp thư của bạn.`);
    } catch (err: unknown) {
      console.error(err);
      setError('Đã xảy ra lỗi khi gửi yêu cầu đặt lại mật khẩu');
      setSuccess(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email,
    setEmail,
    error,
    setError,
    success,
    setSuccess,
    isSubmitting,
    emailError,
    validateEmail,
    handleSubmit
  };
};

export default useForgotPasswordForm;
