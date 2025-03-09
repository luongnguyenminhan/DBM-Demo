import { useState } from 'react';

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
  emailError: string;
  passwordError: string;
  validateEmail: (email: string) => boolean;
  validatePassword: (password: string) => boolean;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export const useLoginForm = ({ onSubmit }: UseLoginFormProps): UseLoginFormReturn => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email validation
  const validateEmail = (email: string): boolean => {
    if (!email) {
      setEmailError('Email không được để trống');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Email không đúng định dạng');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Password validation
  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError('Mật khẩu không được để trống');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('Mật khẩu phải có ít nhất 6 ký tự');
      return false;
    }
    setPasswordError('');
    return true;
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
