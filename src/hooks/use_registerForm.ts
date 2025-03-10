import { useState } from 'react';

interface UseRegisterFormProps {
  onSubmit: (userData: { name: string; email: string; password: string }) => Promise<void>;
}

const useRegisterForm = ({ onSubmit }: UseRegisterFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation states
  const [nameError, setNameError] = useState<string | undefined>(undefined);
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | undefined>(undefined);

  const validateName = (value: string) => {
    if (!value.trim()) {
      setNameError('Tên không được để trống');
      return false;
    }
    if (value.trim().length < 2) {
      setNameError('Tên phải có ít nhất 2 ký tự');
      return false;
    }
    setNameError(undefined);
    return true;
  };

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

    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit({ name, email, password });
    } catch (err: unknown) {
      console.error(err);
      setError( 'Đã xảy ra lỗi khi đăng ký');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    setError,
    isSubmitting,
    setIsSubmitting,
    nameError,
    emailError,
    passwordError,
    confirmPasswordError,
    validateName,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    handleSubmit
  };
};

export default useRegisterForm;
