import { useState } from 'react';
import { useFormValidation } from './use-form-validation';

interface UseForgotPasswordFormProps {
  onSubmit: (email: string) => Promise<void>;
}

const useForgotPasswordForm = ({ onSubmit }: UseForgotPasswordFormProps) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState<string | undefined>(undefined);

  // Use our common validation hook
  const { validateEmail: commonValidateEmail } = useFormValidation();

  const validateEmail = (value: string) => {
    const result = commonValidateEmail(value);
    setEmailError(result.message);
    return result.isValid;
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
