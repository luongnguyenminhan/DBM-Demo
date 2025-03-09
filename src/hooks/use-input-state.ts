import { useState, useCallback } from 'react';
import { ChangeEvent, FocusEvent } from 'react';

type InputElement = HTMLInputElement | HTMLTextAreaElement;

export const useInputState = <T extends string = string>(
  initialValue: T,
  onChangeProp?: (e: ChangeEvent<InputElement>) => void,
  onFocusProp?: (e: FocusEvent<InputElement>) => void,
  onBlurProp?: (e: FocusEvent<InputElement>) => void
) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(Boolean(initialValue));

  const handleFocus = useCallback(
    (e: FocusEvent<InputElement>) => {
      setIsFocused(true);
      onFocusProp?.(e);
    },
    [onFocusProp]
  );

  const handleBlur = useCallback(
    (e: FocusEvent<InputElement>) => {
      setIsFocused(false);
      onBlurProp?.(e);
    },
    [onBlurProp]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<InputElement>) => {
      setHasValue(e.target.value.length > 0);
      onChangeProp?.(e);
    },
    [onChangeProp]
  );

  return {
    isFocused,
    hasValue,
    handleFocus,
    handleBlur,
    handleChange,
  };
};
