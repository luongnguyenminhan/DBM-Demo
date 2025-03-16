'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import { faFileAlt, faCheckCircle, faSpinner, faExclamationCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Typography from '../atomic/typo';
import Card from '../atomic/card';
import FileUpload from '../molecules/file-upload';
import Button from '../atomic/button';
import { Toast } from '../molecules/alert';
import Icon from '../atomic/icon';

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export interface CVUploadAreaProps {
  onFileUpload?: (files: File[]) => void;
  onFileRemove?: (file: File) => void;
  onClearFiles?: () => void;
  title?: string;
  description?: string;
  allowedFileTypes?: string[];
  maxFileSize?: number;
  maxFiles?: number;
  withAnimation?: boolean;
  variant?: 'default' | 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  customClassName?: string;
  headerAction?: React.ReactNode;
  uploadStatus?: UploadStatus;
  errorMessage?: string;
  successMessage?: string;
  showActionButtons?: boolean;
  actionButtons?: React.ReactNode;
  acceptedFileDescription?: string;
  uploadIcon?: IconDefinition;
  withInfoPanel?: boolean;
  infoPanelContent?: React.ReactNode;
  initialFiles?: File[];
  onAnalyze?: () => void;
}

const CVUploadArea: React.FC<CVUploadAreaProps> = ({
  onFileUpload,
  onFileRemove,
  onClearFiles,
  title = 'Upload Your CV',
  description = 'Upload your CV to help us personalize interview questions',
  allowedFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  maxFileSize = 10,
  maxFiles = 1,
  withAnimation = true,
  variant = 'default',
  size = 'medium',
  className,
  customClassName,
  headerAction,
  uploadStatus = 'idle',
  errorMessage = 'Failed to upload file. Please try again.',
  successMessage = 'CV uploaded successfully!',
  showActionButtons = true,
  actionButtons,
  acceptedFileDescription = 'Accepted file types: PDF, DOC, DOCX (max 10MB)',
  uploadIcon = faFileAlt,
  withInfoPanel = true,
  infoPanelContent,
  initialFiles,
  onAnalyze,
}) => {
  const [files, setFiles] = useState<File[]>(initialFiles || []);
  const [status, setStatus] = useState<UploadStatus>(uploadStatus);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  
  // Update status when uploadStatus prop changes
  useEffect(() => {
    setStatus(uploadStatus);
  }, [uploadStatus]);
  
  // Size classes
  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };
  
  // Container classes
  const containerClasses = classNames(
    'flex flex-col h-full',
    sizeClasses[size],
    customClassName,
    className
  );
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  // Handle file selection
  const handleFileSelect = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    
    if (onFileUpload) {
      onFileUpload(selectedFiles);
    }
    
    // Simulate upload process
    if (selectedFiles.length > 0) {
      setStatus('uploading');
      
      // Simulate network request
      setTimeout(() => {
        setStatus('success');
        Toast.success(successMessage);
      }, 1500);
    }
  };
  
  // Handle file removal
  const handleFileRemove = (file: File) => {
    if (onFileRemove) {
      onFileRemove(file);
    }
    
    if (files.length <= 1) {
      setStatus('idle');
    }
  };
  
  // Handle clear all
  const handleClearAll = () => {
    setFiles([]);
    setStatus('idle');
    
    if (onClearFiles) {
      onClearFiles();
    }
  };
  
  // Handle analyze
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      if (onAnalyze) {
        onAnalyze();
      }
      Toast.success('CV analyzed successfully!');
    }, 2000);
  };
  
  // Render status indicator
  const renderStatusIndicator = () => {
    switch (status) {
      case 'uploading':
        return (
          <div className="flex items-center space-x-2 text-blue-500">
            <Icon icon={faSpinner} withAnimation animationVariant="spin" />
            <Typography.Text>Uploading...</Typography.Text>
          </div>
        );
      case 'success':
        return (
          <div className="flex items-center space-x-2 text-green-500">
            <Icon icon={faCheckCircle} />
            <Typography.Text variant="success">{successMessage}</Typography.Text>
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center space-x-2 text-red-500">
            <Icon icon={faExclamationCircle} />
            <Typography.Text variant="error">{errorMessage}</Typography.Text>
          </div>
        );
      default:
        return null;
    }
  };
  
  // Render action buttons
  const renderActionButtons = () => {
    if (!showActionButtons) return null;
    
    if (actionButtons) {
      return actionButtons;
    }
    
    return (
      <div className="flex justify-end gap-3 mt-4">
        {status === 'success' && (
          <Button
            variant="primary"
            onClick={handleAnalyze}
            isLoading={isAnalyzing}
          >
            Analyze CV
          </Button>
        )}
        
        {status !== 'idle' && (
          <Button
            variant="outline"
            onClick={handleClearAll}
          >
            Clear
          </Button>
        )}
      </div>
    );
  };
  
  // Render info panel
  const renderInfoPanel = () => {
    if (!withInfoPanel) return null;
    
    if (infoPanelContent) {
      return infoPanelContent;
    }
    
    return (
      <Card 
        variant="outlined"
        size="small"
        className="mt-6"
      >
        <div className="text-sm space-y-3">
          <Typography.Text weight="medium">Tips for a great CV:</Typography.Text>
          <ul className="list-disc pl-5 space-y-1">
            <li>Keep it concise and relevant</li>
            <li>Highlight your achievements and skills</li>
            <li>Use keywords relevant to the job</li>
            <li>Double-check for spelling and grammar errors</li>
            <li>Make sure your contact information is up-to-date</li>
          </ul>
          
          <Typography.Text size="xs" variant="muted" className="block pt-2">
            Your CV will be analyzed to customize interview questions based on your experience and skills.
          </Typography.Text>
        </div>
      </Card>
    );
  };

  return (
    <motion.div
      className={containerClasses}
      variants={withAnimation ? containerVariants : undefined}
      initial={withAnimation ? 'hidden' : undefined}
      animate={withAnimation ? 'visible' : undefined}
      transition={{ duration: 0.3 }}
    >
      <Card
        title={title}
        subtitle={description}
        withShadow
        withBorder
        headerAction={headerAction}
        variant={variant === 'outline' ? 'outlined' : 'default'}
      >
        <div className="space-y-4">
          {/* File upload component */}
          <FileUpload
            onFileSelect={handleFileSelect}
            onFileRemove={handleFileRemove}
            onClearAll={handleClearAll}
            multiple={maxFiles > 1}
            maxFiles={maxFiles}
            maxSize={maxFileSize}
            allowedFileTypes={allowedFileTypes}
            variant={variant === 'outline' ? 'outline' : variant}
            size={size}
            withAnimation
            withDragDrop
            icon={uploadIcon}
            value={files}
            disabled={status === 'uploading'}
          />
          
          {/* Accepted file types */}
          <Typography.Text size="xs" variant="muted">
            {acceptedFileDescription}
          </Typography.Text>
          
          {/* Status indicator */}
          <AnimatePresence mode="wait">
            {status !== 'idle' && (
              <motion.div
                key={status}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                {renderStatusIndicator()}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Action buttons */}
          {renderActionButtons()}
          
          {/* Info panel */}
          {renderInfoPanel()}
        </div>
      </Card>
    </motion.div>
  );
};

export default CVUploadArea;
