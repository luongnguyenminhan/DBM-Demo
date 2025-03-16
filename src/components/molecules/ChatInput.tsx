'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { 
    IconDefinition, 
    faPaperPlane, 
    faMicrophone, 
    faEllipsisH, 
    faSmile, 
    faPaperclip, 
    faImage,
    faTimes
} from '@fortawesome/free-solid-svg-icons';
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
    onAttachmentUpload?: (files: FileList) => void;
    onVoice?: () => void;
    onMore?: () => void;
    size?: 'small' | 'medium' | 'large';
    variant?: 'default' | 'primary' | 'secondary' | 'outlined' | 'ghost';
    isFullWidth?: boolean;
    isDisabled?: boolean;
    withAttachButton?: boolean;
    withVoiceButton?: boolean;
    withMoreButton?: boolean;
    withEmoji?: boolean;
    withAnimation?: boolean;
    className?: string;
    customClassName?: string;
    customInputClassName?: string;
    customButtonClassName?: string;
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
    attachmentTypes?: string;
    allowedFileTypes?: string[];
    maxFileSize?: number; // in MB
    clearOnSubmit?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
    value: propValue,
    onChange,
    onSend,
    onAttach,
    onAttachmentUpload,
    onVoice,
    onMore,
    size = 'medium',
    variant = 'default',
    isFullWidth = true,
    isDisabled = false,
    withAttachButton = false,
    withVoiceButton = false,
    withMoreButton = false,
    withEmoji = false,
    withAnimation = true,
    className,
    customClassName,
    customInputClassName = '',
    customButtonClassName = '',
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
    attachmentTypes = 'image/*,application/pdf',
    allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
    maxFileSize = 10, // Default 10MB
    clearOnSubmit = true,
}) => {
    const [internalValue, setInternalValue] = useState(propValue || '');
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inputComponentRef = useRef<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Use controlled or uncontrolled pattern based on whether value prop is provided
    const isControlled = propValue !== undefined;
    const value = isControlled ? propValue : internalValue;
    
    // Animation variants for the input
    const inputVariants = {
        idle: { scale: 1 },
        active: { scale: 1.01 },
    };
    
    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        
        if (maxLength && newValue.length > maxLength) return;
        
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
        if ((!value || value.trim() === '') && selectedFiles.length === 0 || isDisabled) return;
        
        if (onSend && value.trim() !== '') {
            onSend(value);
        }
        
        // Handle file attachments
        if (selectedFiles.length > 0 && onAttachmentUpload) {
            const fileList = Object.assign(new DataTransfer(), {
                files: selectedFiles
            }).files;
            onAttachmentUpload(fileList);
            setSelectedFiles([]);
        }
        
        // Clear input if uncontrolled and clearOnSubmit is true
        if (!isControlled && clearOnSubmit) {
            setInternalValue('');
        }
        
        // Focus input after sending
        if (inputComponentRef.current) {
            inputComponentRef.current.focus();
        }
    }; // Added missing closing bracket here
    
    // Handle key press events
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // Custom key press handler
        if (onKeyPress) {
            onKeyPress(e);
        }
        
        // Send on Enter (without shift key for textarea)
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    
    // Handle emoji button click
    const handleEmojiToggle = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };
    
    // Handle file selection
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        
        if (files && files.length > 0) {
            // Validate file types and sizes
            const validFiles: File[] = [];
            
            Array.from(files).forEach((file) => {
                const isValidType = allowedFileTypes.includes(file.type);
                const isValidSize = file.size / 1024 / 1024 <= maxFileSize;
                
                if (isValidType && isValidSize) {
                    validFiles.push(file);
                } else {
                    console.warn(`Invalid file: ${file.name}. Type: ${file.type}, Size: ${file.size / 1024 / 1024}MB`);
                }
            });
            
            setSelectedFiles((prev) => [...prev, ...validFiles]);
        }
        
        // Clear the input
        if (e.target) {
            e.target.value = '';
        }
    };
    
    // Open file dialog
    const openFileDialog = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        } else if (onAttach) {
            onAttach();
        }
    };
    
    // Toggle voice recording
    const toggleVoiceRecording = () => {
        setIsRecording((prev) => !prev);
        if (onVoice) {
            onVoice();
        }
    };
    
    // Remove selected file
    const removeFile = (index: number) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
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
    
    // Render selected files
    const renderSelectedFiles = () => {
        if (selectedFiles.length === 0) return null;
        
        return (
            <div className="flex flex-wrap gap-2 mb-2">
                {selectedFiles.map((file, index) => (
                    <div 
                        key={index} 
                        className="group flex items-center bg-gray-100 rounded px-2 py-1 text-sm"
                    >
                        <IconButton
                            icon={file.type.includes('image') ? faImage : faPaperclip}
                            size="xs"
                            variant="default"
                            withBorder={false}
                            className="mr-1"
                        />
                        <span className="truncate max-w-[100px]">{file.name}</span>
                        <IconButton
                            icon={faTimes}
                            size="xs"
                            variant="default"
                            withBorder={false}
                            className="ml-1 text-gray-500 hover:text-red-500"
                            onClick={() => removeFile(index)}
                        />
                    </div>
                ))}
            </div>
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
                    <>
                        <IconButton
                            icon={faPaperclip}
                            variant="default"
                            size="sm"
                            onClick={openFileDialog}
                            withBorder={false}
                            isDisabled={isDisabled}
                        />
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="sr-only"
                            onChange={handleFileSelect}
                            disabled={isDisabled}
                            multiple
                            accept={attachmentTypes}
                        />
                    </>
                )}
                
                {withEmoji && (
                    <IconButton
                        icon={faSmile}
                        variant="default"
                        size="sm"
                        onClick={handleEmojiToggle}
                        withBorder={false}
                        isDisabled={isDisabled}
                    />
                )}
                
                {withVoiceButton && (
                    <IconButton
                        icon={faMicrophone}
                        variant={isRecording ? "primary" : "default"}
                        size="sm"
                        onClick={toggleVoiceRecording}
                        withBorder={false}
                        isDisabled={isDisabled}
                        withAnimation={isRecording}
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
                isDisabled={(disableIfEmpty && (!value || value.trim() === '') && selectedFiles.length === 0) || isDisabled}
                isLoading={isLoading}
                onClick={handleSend}
                className={customButtonClassName}
                withRipple
            >
                {size === 'small' && !sendButtonText ? '' : sendButtonText}
            </Button>
        );
    };
    
    // Main render
    const inputComponent = (
        <div className="relative">
            {renderSelectedFiles()}
            <div className={containerClasses}>
                <div className="flex-1">
                    <Input
                        ref={inputComponentRef}
                        value={value}
                        onChange={handleChange}
                        variant="ghost"
                        isFullWidth
                        isDisabled={isDisabled}
                        autoFocus={autoFocus}
                        maxLength={maxLength}
                        asTextArea={multiline}
                        rows={rows}
                        customClassName={`border-none shadow-none focus:border-none focus:shadow-none ${customInputClassName}`}
                    />
                </div>
                
                <div className="flex items-center gap-2 ml-2">
                    {renderCharCount()}
                    {renderActionButtons()}
                    {renderSendButton()}
                </div>
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
