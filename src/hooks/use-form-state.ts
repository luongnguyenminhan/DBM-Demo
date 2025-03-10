import { useState } from 'react';

// Import or define the ValidationResult interface
interface ValidationResult {
  isValid: boolean;
  message?: string;
}

// Generic type for form field values
type FieldValue = string | number | boolean | Date | null | undefined;

// interface FormField<T extends FieldValue = string> {
//   value: T;
//   error?: string;
//   validate?: (value: T) => ValidationResult;
// }

// type FormFields<T extends Record<string, FieldValue>> = {
//   [K in keyof T]: FormField<T[K]>;
// };

interface UseFormStateOptions<T extends Record<string, FieldValue>> {
  initialValues: T;
  onSubmit: (values: T) => Promise<void>;
  validators?: Partial<Record<keyof T, (value: T[keyof T]) => ValidationResult>>;
}

export const useFormState = <T extends Record<string, FieldValue>>({ 
  initialValues, 
  onSubmit,
  validators = {}
}: UseFormStateOptions<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Create initial field states with validators
//   const createFields = <F extends Record<string, FieldValue>>(
//     fields: F, 
//     fieldValidators: Partial<Record<keyof F, (value: any) => ValidationResult>>
//   ): FormFields<F> => {
//     const fieldStates: Partial<FormFields<F>> = {};
    
//     for (const key in fields) {
//       fieldStates[key] = {
//         value: fields[key],
//         error: undefined,
//         // Type assertion is necessary because TypeScript can't infer the proper type relationship
//         validate: fieldValidators[key] as unknown as (value: F[typeof key]) => ValidationResult | undefined
//       };
//     }
    
//     return fieldStates as FormFields<F>;
//   };

  const setValue = <K extends keyof T>(field: K, value: T[K]) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Clear error when field is changed
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateField = <K extends keyof T>(field: K): boolean => {
    const validator = validators[field] as unknown as ((value: T[K]) => ValidationResult) | undefined;
    
    if (!validator) return true;
    
    const result = validator(values[field]);
    
    if (!result.isValid) {
      setErrors(prev => ({ ...prev, [field]: result.message || 'Invalid value' }));
      return false;
    }
    
    setErrors(prev => ({ ...prev, [field]: undefined }));
    return true;
  };

  const validateAll = (fields?: Array<keyof T>): boolean => {
    let isValid = true;
    const fieldsToValidate = fields || Object.keys(validators) as Array<keyof T>;
    
    for (const field of fieldsToValidate) {
      const fieldIsValid = validateField(field);
      isValid = isValid && fieldIsValid;
    }
    
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields with validators
    const isValid = validateAll();
    if (!isValid) return;
    
    setError(null);
    setSuccess(null);
    
    try {
      setIsSubmitting(true);
      await onSubmit(values);
    } catch (err: unknown) {
      console.error(err);
      setError((err as Error)?.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    isSubmitting,
    error,
    success,
    setValue,
    setValues,
    setError,
    setSuccess,
    validateField,
    validateAll,
    handleSubmit
  };
};
