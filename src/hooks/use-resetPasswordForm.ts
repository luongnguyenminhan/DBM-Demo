import { useState } from 'react';

interface UseResetPasswordFormProps {
  onSubmit: (passwordData: { password: string; email: string }) => Promise<void>;
  email?: string;
}

const useResetPasswordForm = ({ onSubmit, email = '' }: UseResetPasswordFormProps) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userEmail] = useState<string>(email);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation states
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | undefined>(undefined);

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError('Mật khẩu không được để trống');
      return false;
    }
    if (value.length < 6) {
      setPasswordError('Mật khẩu phải có ít nhất 6 ký tự');
      return false;
    }
    setPasswordError(undefined);
    return true;
  };

  const validateConfirmPassword = (value: string) => {
    if (!value) {
      setConfirmPasswordError('Xác nhận mật khẩu không được để trống');
      return false;
    }
    if (value !== password) {
      setConfirmPasswordError('Mật khẩu không khớp');
      return false;
    }
    setConfirmPasswordError(undefined);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    if (!isPasswordValid || !isConfirmPasswordValid) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      await onSubmit({ password, email: userEmail });
      setSuccess('Mật khẩu đã được đặt lại thành công!');
    } catch (err: unknown) {
      console.error(err);
      setError('Đã xảy ra lỗi khi đặt lại mật khẩu');
      setSuccess(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    userEmail,
    error,
    setError,
    success,
    setSuccess,
    isSubmitting,
    setIsSubmitting,
    passwordError,
    confirmPasswordError,
    validatePassword,
    validateConfirmPassword,
    handleSubmit
  };
};

export default useResetPasswordForm;
