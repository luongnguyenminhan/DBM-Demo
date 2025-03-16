'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { IconDefinition, faPaperPlane, faPlus, faMicrophone, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import Input from '../atomic/input';
import Button from '../atomic/button';
import { IconButton } from '../atomic/icon';
import Typography from '../atomic/typo';

export interface ChatInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSend?: (message: string) => void;
  onAttach?: () => void;
  onVoice?: () => void;
  onMore?: () => void;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'primary' | 'secondary' | 'outlined' | 'ghost';
  isFullWidth?: boolean;
  isDisabled?: boolean;
  withAttachButton?: boolean;
  withVoiceButton?: boolean;
  withMoreButton?: boolean;
  withAnimation?: boolean;
  className?: string;
  customClassName?: string;
  disableIfEmpty?: boolean;
  autoFocus?: boolean;
  maxLength?: number;
  isLoading?: boolean;
  showCharCount?: boolean;
  multiline?: boolean;
  rows?: number;
  actionButtons?: React.ReactNode;
  sendButtonIcon?: IconDefinition;
  sendButtonText?: string;
  showSendButton?: boolean;
  onKeyPress?: (e: React.KeyboardEvent) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  placeholder = 'Type a message...',
  value: propValue,
  onChange,
  onSend,
  onAttach,
  onVoice,
  onMore,
  size = 'medium',
  variant = 'default',
  isFullWidth = true,
  isDisabled = false,
  withAttachButton = false,
  withVoiceButton = false,
  withMoreButton = false,
  withAnimation = true,
  className,
  customClassName,
  disableIfEmpty = true,
  autoFocus = false,
  maxLength,
  isLoading = false,
  showCharCount = false,
  multiline = false,
  rows = 3,
  actionButtons,
  sendButtonIcon = faPaperPlane,
  sendButtonText,
  showSendButton = true,
  onKeyPress,
}) => {
  const [internalValue, setInternalValue] = useState(propValue || '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Use controlled or uncontrolled pattern based on whether value prop is provided
  const isControlled = propValue !== undefined;
  const value = isControlled ? propValue : internalValue;
  
  // Animation variants for the input
  const inputVariants = {
    idle: { 
      scale: 1,
    },
    active: { 
      scale: 1.01,
    },
  };
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    
    // Update internal state if uncontrolled
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    // Call onChange handler if provided
    if (onChange) {
      onChange(newValue);
    }
  };
  
  // Handle send message
  const handleSend = () => {
    if (!value || isDisabled) return;
    
    if (onSend) {
      onSend(value);
    }
    
    // Clear input if uncontrolled
    if (!isControlled) {
      setInternalValue('');
    }
    
    // Focus input after sending
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };
  
  // Handle key press events
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Custom key press handler
    if (onKeyPress) {
      onKeyPress(e);
    }
    
    // Send on Enter (without shift key for textarea)
    if (e.key === 'Enter' && !e.shiftKey && !multiline) {
      e.preventDefault();
      handleSend();
    } else if (e.key === 'Enter' && !e.shiftKey && multiline) {
      e.preventDefault();
      handleSend();
    }
  };
  
  // Container classes
  const containerClasses = classNames(
    'flex items-end rounded-lg bg-white',
    {
      'w-full': isFullWidth,
      'border border-gray-200': variant === 'default' || variant === 'outlined',
      'bg-transparent': variant === 'ghost',
      'p-2': variant !== 'ghost',
    },
    customClassName,
    className
  );
  
  // Character count display
  const renderCharCount = () => {
    if (!showCharCount || !maxLength) return null;
    
    const count = value?.length || 0;
    const isNearLimit = count > maxLength * 0.8;
    
    return (
      <Typography.Text
        size="xs"
        variant={isNearLimit ? 'error' : 'muted'}
        className="mr-2 self-center"
      >
        {count}/{maxLength}
      </Typography.Text>
    );
  };
  
  // Action buttons
  const renderActionButtons = () => {
    if (actionButtons) {
      return actionButtons;
    }
    
    return (
      <>
        {withAttachButton && (
          <IconButton
            icon={faPlus}
            variant="default"
            size="sm"
            onClick={onAttach}
            withBorder={false}
            isDisabled={isDisabled}
          />
        )}
        
        {withVoiceButton && (
          <IconButton
            icon={faMicrophone}
            variant="primary"
            size="sm"
            onClick={onVoice}
            withBorder={false}
            isDisabled={isDisabled}
          />
        )}
        
        {withMoreButton && (
          <IconButton
            icon={faEllipsisH}
            variant="secondary"
            size="sm"
            onClick={onMore}
            withBorder={false}
            isDisabled={isDisabled}
          />
        )}
      </>
    );
  };
  
  // Send button
  const renderSendButton = () => {
    if (!showSendButton) return null;
    
    return (
      <Button
        variant="primary"
        size={size === 'large' ? 'medium' : 'small'}
        rounded
        leftIcon={sendButtonIcon}
        isDisabled={(disableIfEmpty && !value) || isDisabled}
        isLoading={isLoading}
        onClick={handleSend}
      >
        {sendButtonText}
      </Button>
    );
  };
  
  // Main render
  const inputComponent = (
    <div className={containerClasses}>
      <div className="flex-1">
        <Input
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
          size={size}
          variant="ghost"
          isFullWidth
          isDisabled={isDisabled}
          autoFocus={autoFocus}
          maxLength={maxLength}
          asTextArea={multiline}
          rows={rows}
          customClassName="border-none shadow-none focus:border-none focus:shadow-none"
        />
      </div>
      
      <div className="flex items-center gap-2 ml-2">
        {renderCharCount()}
        {renderActionButtons()}
        {renderSendButton()}
      </div>
    </div>
  );
  
  // Apply animation if needed
  if (withAnimation) {
    return (
      <motion.div
        variants={inputVariants}
        initial="idle"
        whileFocus="active"
        transition={{ duration: 0.2 }}
      >
        {inputComponent}
      </motion.div>
    );
  }
  
  return inputComponent;
};

export default ChatInput;
