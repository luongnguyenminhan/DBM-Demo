'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import Input from '../atomic/input';

export type SearchBarSize = 'small' | 'medium' | 'large';
export type SearchBarVariant = 'default' | 'primary' | 'secondary' | 'outlined' | 'ghost';

export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  size?: SearchBarSize;
  variant?: SearchBarVariant;
  isFullWidth?: boolean;
  isDisabled?: boolean;
  rounded?: boolean;
  withAnimation?: boolean;
  withShadow?: boolean;
  customClassName?: string;
  className?: string;
  autoFocus?: boolean;
  isLoading?: boolean;
  debounceTime?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  value: propValue,
  onChange,
  onSearch,
  onClear,
  size = 'medium',
  variant = 'default',
  isFullWidth = false,
  isDisabled = false,
  rounded = false,
  withAnimation = true,
  withShadow = false,
  customClassName,
  className,
  autoFocus = false,
  debounceTime = 300,
}) => {
  const [internalValue, setInternalValue] = useState(propValue || '');
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Use controlled or uncontrolled pattern based on whether value prop is provided
  const isControlled = propValue !== undefined;
  const value = isControlled ? propValue : internalValue;
  
  // Animation variants for the search bar
  const containerVariants = {
    focused: { 
      scale: 1.01,
      boxShadow: withShadow ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none'
    },
    blurred: { 
      scale: 1,
      boxShadow: 'none'
    }
  };
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Update internal state if uncontrolled
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    // Call onChange handler if provided
    if (onChange) {
      onChange(newValue);
    }
    
    // Debounce search functionality
    if (onSearch && debounceTime > 0) {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      
      debounceTimerRef.current = setTimeout(() => {
        onSearch(newValue);
      }, debounceTime);
    }
  };
  
  // Handle search submission
  const handleSearch = () => {
    if (onSearch) {
      // Clear any pending debounce timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
      
      onSearch(value);
    }
  };
  
  // Handle key press for search submission
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  // Handle clearing the search
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleClear = () => {
    // Update internal state if uncontrolled
    if (!isControlled) {
      setInternalValue('');
    }
    
    // Call onChange handler if provided
    if (onChange) {
      onChange('');
    }
    
    // Call onClear handler if provided
    if (onClear) {
      onClear();
    }
    
    // Trigger search with empty string
    if (onSearch) {
      onSearch('');
    }
  };
  
  // Container classes
  const containerClasses = classNames(
    'relative',
    {
      'w-full': isFullWidth,
    },
    customClassName,
    className
  );
  
  return (
    <motion.div 
      className={containerClasses}
      variants={withAnimation ? containerVariants : undefined}
      initial="blurred"
    >
      <Input
        leftIcon={faSearch}
        rightIcon={value && value.length > 0 ? faTimes : undefined}
        value={value}
        onChange={e => handleChange(e)}
        onKeyDown={handleKeyPress}
        placeholder={placeholder}
        size={size}
        variant={variant}
        isFullWidth={isFullWidth}
        isDisabled={isDisabled}
        rounded={rounded}
        withAnimation={withAnimation}
        autoFocus={autoFocus}
      />
    </motion.div>
  );
};

export default SearchBar;
