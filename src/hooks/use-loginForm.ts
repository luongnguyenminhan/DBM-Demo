import { useState } from 'react';
import { useFormValidation } from './use-form-validation';

interface LoginCredentials {
  email: string;
  password: string;
}

interface UseLoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<void>;
}

interface UseLoginFormReturn {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  emailError: string | undefined;
  passwordError: string | undefined;
  validateEmail: (email: string) => boolean;
  validatePassword: (password: string) => boolean;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export const useLoginForm = ({ onSubmit }: UseLoginFormProps): UseLoginFormReturn => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use our common validation hook
  const { validateEmail: commonValidateEmail, validatePassword: commonValidatePassword } = useFormValidation();

  // Updated validation methods to use the common validators
  const validateEmail = (email: string): boolean => {
    const result = commonValidateEmail(email);
    setEmailError(result.message);
    return result.isValid;
  };

  const validatePassword = (password: string): boolean => {
    const result = commonValidatePassword(password);
    setPasswordError(result.message);
    return result.isValid;
  };

  // Form validation
  const isFormValid = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    return isEmailValid && isPasswordValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isFormValid()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit({ email, password });
    } catch (err) {
      setError((err as Error).message || 'Đã xảy ra lỗi khi đăng nhập');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
  };
};

export default useLoginForm;
