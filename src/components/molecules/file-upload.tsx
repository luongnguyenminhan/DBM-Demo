'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCloudUploadAlt, 
  faFile, 
  faFileImage, 
  faFilePdf, 
  faFileWord, 
  faFileExcel,
  faFileAlt,
  faTrash, 
  faExclamationTriangle,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import Typography from '../atomic/typo';
import Button from '../atomic/button';
import { Toast } from './alert';
import Icon from '../atomic/icon';
import Image from 'next/image';

export type FileUploadVariant = 'default' | 'primary' | 'secondary' | 'outline' | 'minimal';
export type FileUploadSize = 'small' | 'medium' | 'large';

export interface FileUploadProps {
  onFileSelect?: (files: File[]) => void;
  onFileRemove?: (file: File) => void;
  onClearAll?: () => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  maxFiles?: number;
  allowedFileTypes?: string[];
  variant?: FileUploadVariant;
  size?: FileUploadSize;
  label?: string;
  description?: string;
  showFileList?: boolean;
  showFilePreview?: boolean;
  withBorder?: boolean;
  withAnimation?: boolean;
  withDragDrop?: boolean;
  disabled?: boolean;
  icon?: IconDefinition;
  customActionButtons?: React.ReactNode;
  customIconColor?: string;
  customClassName?: string;
  className?: string;
  uploadButtonText?: string;
  dropzoneText?: string;
  errorText?: string;
  value?: File[];
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  onFileRemove,
  onClearAll,
  accept = '*',
  multiple = false,
  maxSize = 10, // Default 10MB
  maxFiles = 5,
  allowedFileTypes = [],
  variant = 'default',
  size = 'medium',
  label,
  description,
  showFileList = true,
  showFilePreview = true,
  withBorder = true,
  withAnimation = true,
  withDragDrop = true,
  disabled = false,
  icon = faCloudUploadAlt,
  customActionButtons,
  customClassName = '',
  className,
  uploadButtonText = 'Choose Files',
  dropzoneText = 'Drag and drop files here, or click to select files',
  errorText = 'Some files could not be uploaded due to size or format restrictions',
  value,
}) => {
  const [files, setFiles] = useState<File[]>(value || []);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [rejectedFiles, setRejectedFiles] = useState<{name: string, reason: string}[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Size classes
  const sizeClasses = {
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8',
  };
  
  // Icon size classes
  const iconSizeClasses = {
    small: 'text-3xl',
    medium: 'text-4xl',
    large: 'text-5xl',
  };
  
  // Variant classes
  const variantClasses = {
    default: 'bg-gray-50 hover:bg-gray-100',
    primary: 'bg-[var(--color-primary-light)] hover:bg-[var(--color-primary-light)] hover:bg-opacity-70',
    secondary: 'bg-[var(--color-secondary-light)] hover:bg-[var(--color-secondary-light)] hover:bg-opacity-70',
    outline: 'bg-white',
    minimal: 'bg-transparent',
  };
  
  // Icon color classes
  const iconColorClasses = {
    default: 'text-gray-400',
    primary: 'text-[var(--color-primary)]',
    secondary: 'text-[var(--color-secondary)]',
    outline: 'text-gray-400',
    minimal: 'text-gray-400',
  };
  
  // Border classes
  const borderClasses = {
    default: withBorder ? 'border-2 border-dashed border-gray-300' : '',
    primary: withBorder ? 'border-2 border-dashed border-[var(--color-primary-light)]' : '',
    secondary: withBorder ? 'border-2 border-dashed border-[var(--color-secondary-light)]' : '',
    outline: withBorder ? 'border-2 border-dashed border-gray-300' : '',
    minimal: '',
  };
  
  // Container classes
  const containerClasses = classNames(
    'transition-all duration-200 rounded-lg relative',
    sizeClasses[size],
    variantClasses[variant],
    borderClasses[variant],
    {
      'opacity-50 cursor-not-allowed': disabled,
      'cursor-pointer': !disabled,
    },
    customClassName,
    className
  );
  
  // Animation variants
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const containerVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };
  
  // Drag and drop animations
  const dragVariants = {
    dragging: {
      scale: 1.02,
      boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
      borderColor: 'var(--color-primary)',
    },
    idle: {
      scale: 1,
      boxShadow: '0px 0px 0px 0px rgba(0,0,0,0)',
      borderColor: '',
    },
  };
  
  // File type icon mapping
  const getFileIcon = (fileType: string): IconDefinition => {
    if (fileType.includes('image')) return faFileImage;
    if (fileType.includes('pdf')) return faFilePdf;
    if (fileType.includes('word') || fileType.includes('document')) return faFileWord;
    if (fileType.includes('excel') || fileType.includes('sheet')) return faFileExcel;
    return faFileAlt;
  };
  
  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Handle file selection
  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    
    const newFiles: File[] = [];
    const rejected: {name: string, reason: string}[] = [];
    
    Array.from(selectedFiles).forEach(file => {
      // Check if max files has been reached
      if (files.length + newFiles.length >= maxFiles) {
        rejected.push({ name: file.name, reason: 'Maximum number of files exceeded' });
        return;
      }
      
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        rejected.push({ name: file.name, reason: `File size exceeds ${maxSize}MB limit` });
        return;
      }
      
      // Check file type if allowedFileTypes is specified
      if (allowedFileTypes.length > 0 && !allowedFileTypes.includes(file.type)) {
        rejected.push({ name: file.name, reason: 'File type not allowed' });
        return;
      }
      
      // Check if file already exists
      if (files.some(existingFile => existingFile.name === file.name)) {
        rejected.push({ name: file.name, reason: 'File already selected' });
        return;
      }
      
      newFiles.push(file);
    });
    
    if (newFiles.length > 0) {
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      
      if (onFileSelect) {
        onFileSelect(updatedFiles);
      }
    }
    
    if (rejected.length > 0) {
      setRejectedFiles(rejected);
      Toast.warning(errorText, { duration: 5000 });
    }
  };

  // Handle file removal
  const handleFileRemove = (index: number) => {
    const removedFile = files[index];
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    
    if (onFileRemove && removedFile) {
      onFileRemove(removedFile);
    }
    
    if (onFileSelect) {
      onFileSelect(updatedFiles);
    }
  };

  // Handle clear all files
  const handleClearAll = () => {
    setFiles([]);
    
    if (onClearAll) {
      onClearAll();
    }
    
    if (onFileSelect) {
      onFileSelect([]);
    }
  };

  // Handle click on drop zone
  const handleDropZoneClick = () => {
    if (disabled) return;
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle drag events
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled || !withDragDrop) return;
    setIsDragging(true);
  }, [disabled, withDragDrop]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled || !withDragDrop) return;
    setIsDragging(false);
  }, [disabled, withDragDrop]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled || !withDragDrop) return;
    setIsDragging(true);
  }, [disabled, withDragDrop]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled || !withDragDrop) return;
    setIsDragging(false);
    
    const droppedFiles = e.dataTransfer.files;
    handleFileSelect(droppedFiles);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, withDragDrop]);

  // Render file preview
  const renderFilePreview = (file: File, index: number) => {
    const isImage = file.type.startsWith('image/');
    
    return (
      <motion.div
        key={`${file.name}-${index}`}
        className="relative border rounded-lg overflow-hidden bg-white mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center p-3">
          <div className="mr-3 flex-shrink-0">
            {isImage && showFilePreview ? (
              <div className="w-10 h-10 rounded overflow-hidden bg-gray-100">
                <Image 
                  src={URL.createObjectURL(file)} 
                  alt={file.name} 
                  className="w-full h-full object-cover"
                  onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))}
                />
              </div>
            ) : (
              <div className="w-10 h-10 flex items-center justify-center rounded bg-gray-100">
                <FontAwesomeIcon 
                  icon={getFileIcon(file.type)} 
                  className="text-gray-500" 
                />
              </div>
            )}
          </div>
          
          <div className="flex-grow min-w-0">
            <Typography.Text size="sm" weight="medium" className="truncate block">
              {file.name}
            </Typography.Text>
            <Typography.Text size="xs" variant="muted">
              {formatFileSize(file.size)}
            </Typography.Text>
          </div>
          
          <button
            type="button"
            className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleFileRemove(index);
            }}
            disabled={disabled}
            aria-label="Remove file"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </motion.div>
    );
  };

  const renderDropZone = () => {
    const content = (
      <div className="flex flex-col items-center justify-center text-center">
        <div className={classNames('mb-3', iconColorClasses[variant])}>
          <Icon 
            icon={icon} 
            size="2xl" 
            variant={variant === 'default' ? 'default' : variant === 'minimal' ? 'dark' : variant === 'outline' ? 'primary' : variant} 
            withAnimation={isDragging} 
            customClassName={iconSizeClasses[size]}
          />
        </div>
        <Typography.Text weight="medium" size={size === 'small' ? 'xs' : size === 'large' ? 'base' : 'sm'}>
          {dropzoneText}
        </Typography.Text>
        {description && (
          <Typography.Text variant="muted" size="xs" className="mt-1">
            {description}
          </Typography.Text>
        )}
        
        <div className="mt-4">
          <Button
            variant={variant === 'default' ? 'primary' : variant === 'minimal' ? 'ghost' : variant} 
            size={size === 'small' ? 'small' : size === 'large' ? 'large' : 'medium'}
            leftIcon={faFile}
            isDisabled={disabled}
            onClick={(e) => e.stopPropagation()} // Prevent double trigger
          >
            {uploadButtonText}
          </Button>
        </div>

        {rejectedFiles.length > 0 && (
          <div className="mt-3 text-left w-full">
            <div className="flex items-center text-yellow-500 mb-1">
              <FontAwesomeIcon icon={faExclamationTriangle} className="mr-1" />
              <Typography.Text size="xs" variant="warning">Files not uploaded:</Typography.Text>
            </div>
            {rejectedFiles.map((file, index) => (
              <div key={index} className="text-xs text-red-500 mt-1">
                {file.name}: {file.reason}
              </div>
            ))}
          </div>
        )}
      </div>
    );
    
    if (withAnimation) {
      return (
        <motion.div
          className={containerClasses}
          variants={dragVariants}
          animate={isDragging ? 'dragging' : 'idle'}
          onClick={handleDropZoneClick}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {content}
        </motion.div>
      );
    }
    
    return (
      <div
        className={containerClasses}
        onClick={handleDropZoneClick}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {content}
      </div>
    );
  };

  return (
    <div>
      {label && (
        <Typography.Text weight="medium" size={size === 'small' ? 'xs' : size === 'large' ? 'base' : 'sm'} className="mb-2 block">
          {label}
        </Typography.Text>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={(e) => handleFileSelect(e.target.files)}
        disabled={disabled}
      />
      
      {renderDropZone()}
      
      {showFileList && files.length > 0 && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <Typography.Text weight="medium" size={size === 'small' ? 'xs' : size === 'large' ? 'base' : 'sm'}>
              Selected Files ({files.length}/{maxFiles})
            </Typography.Text>
            {files.length > 1 && (
              <Button
                variant="ghost"
                size="small"
                onClick={handleClearAll}
                isDisabled={disabled}
              >
                Clear All
              </Button>
            )}
          </div>
          
          <AnimatePresence mode="sync">
            {files.map((file, index) => renderFilePreview(file, index))}
          </AnimatePresence>
        </div>
      )}
      
      {customActionButtons}
    </div>
  );
};

export default FileUpload;
