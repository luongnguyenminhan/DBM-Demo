import { useState } from 'react';
import { useFormValidation } from './use-form-validation';

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

  // Use our common validation hook
  const { validateName, validateEmail, validatePassword, validateConfirmPassword } = useFormValidation();

  // Updated validation methods to use the common validators
  const validateNameField = (value: string) => {
    const result = validateName(value);
    setNameError(result.message);
    return result.isValid;
  };

  const validateEmailField = (value: string) => {
    const result = validateEmail(value);
    setEmailError(result.message);
    return result.isValid;
  };

  const validatePasswordField = (value: string) => {
    const result = validatePassword(value);
    setPasswordError(result.message);
    return result.isValid;
  };

  const validateConfirmPasswordField = (value: string) => {
    const result = validateConfirmPassword(value, password);
    setConfirmPasswordError(result.message);
    return result.isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isNameValid = validateNameField(name);
    const isEmailValid = validateEmailField(email);
    const isPasswordValid = validatePasswordField(password);
    const isConfirmPasswordValid = validateConfirmPasswordField(confirmPassword);

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit({ name, email, password });
    } catch (err: unknown) {
      console.error(err);
      setError('Đã xảy ra lỗi khi đăng ký');
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
    validateName: validateNameField,
    validateEmail: validateEmailField,
    validatePassword: validatePasswordField,
    validateConfirmPassword: validateConfirmPasswordField,
    handleSubmit
  };
};

export default useRegisterForm;
