// Clearly define the validation result interface
interface ValidationResult {
  isValid: boolean;
  message?: string;
}

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  pattern?: RegExp;
  match?: string;
  matchFieldValue?: string;
  matchFieldName?: string;
  customValidator?: (value: string) => ValidationResult | boolean;
}

interface ValidationMessages {
  required?: string;
  minLength?: string;
  pattern?: string;
  match?: string;
}

export const useFormValidation = () => {
  const validateField = (
    value: string,
    rules: ValidationRules,
    messages?: ValidationMessages,
    fieldName: string = ''
  ): ValidationResult => {
    // Required validation
    if (rules.required && !value.trim()) {
      return {
        isValid: false,
        message: messages?.required || `${fieldName || 'Field'} không được để trống`,
      };
    }

    // Min length validation
    if (rules.minLength && value.trim().length < rules.minLength) {
      return {
        isValid: false,
        message: messages?.minLength || `${fieldName || 'Field'} phải có ít nhất ${rules.minLength} ký tự`,
      };
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
      return {
        isValid: false,
        message: messages?.pattern || `${fieldName || 'Field'} không hợp lệ`,
      };
    }

    // Match another field validation
    if (rules.match && rules.matchFieldValue !== undefined && value !== rules.matchFieldValue) {
      return {
        isValid: false,
        message: messages?.match || `${fieldName || 'Field'} không khớp với ${rules.matchFieldName || 'field khác'}`,
      };
    }

    // Custom validator
    if (rules.customValidator) {
      const customResult = rules.customValidator(value);
      if (typeof customResult === 'boolean') {
        return { isValid: customResult };
      } else {
        return customResult;
      }
    }

    return { isValid: true };
  };

  // Common validation functions
  const validateEmail = (email: string): ValidationResult => {
    return validateField(
      email,
      {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
      {
        required: 'Email không được để trống',
        pattern: 'Email không hợp lệ',
      },
      'Email'
    );
  };

  const validatePassword = (password: string): ValidationResult => {
    return validateField(
      password,
      {
        required: true,
        minLength: 6,
      },
      {
        required: 'Mật khẩu không được để trống',
        minLength: 'Mật khẩu phải có ít nhất 6 ký tự',
      },
      'Mật khẩu'
    );
  };

  const validateConfirmPassword = (
    confirmPassword: string,
    password: string
  ): ValidationResult => {
    return validateField(
      confirmPassword,
      {
        required: true,
        match: 'password',
        matchFieldValue: password,
        matchFieldName: 'mật khẩu',
      },
      {
        required: 'Xác nhận mật khẩu không được để trống',
        match: 'Mật khẩu không khớp',
      },
      'Xác nhận mật khẩu'
    );
  };

  const validateName = (name: string): ValidationResult => {
    return validateField(
      name,
      {
        required: true,
        minLength: 2,
      },
      {
        required: 'Tên không được để trống',
        minLength: 'Tên phải có ít nhất 2 ký tự',
      },
      'Tên'
    );
  };

  const validateOtp = (otp: string): ValidationResult => {
    return validateField(
      otp,
      {
        required: true,
        customValidator: (value) => {
          if (value.length !== 6 || !/^\d+$/.test(value)) {
            return { isValid: false, message: 'Mã OTP phải gồm 6 chữ số' };
          }
          return { isValid: true };
        },
      },
      {
        required: 'Mã OTP không được để trống',
      },
      'OTP'
    );
  };

  return {
    validateField,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateName,
    validateOtp
  };
};
