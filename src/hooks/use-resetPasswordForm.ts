import { useState } from 'react';
import { useFormValidation } from './use-form-validation';

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

  // Use our common validation hook
  const { validatePassword: commonValidatePassword, validateConfirmPassword: commonValidateConfirmPassword } = useFormValidation();

  const validatePassword = (value: string) => {
    const result = commonValidatePassword(value);
    setPasswordError(result.message);
    return result.isValid;
  };

  const validateConfirmPassword = (value: string) => {
    const result = commonValidateConfirmPassword(value, password);
    setConfirmPasswordError(result.message);
    return result.isValid;
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
