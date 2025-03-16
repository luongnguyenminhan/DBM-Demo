'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Button from './button';
import { createPortal } from 'react-dom';

export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'full';
export type ModalPosition = 'center' | 'top' | 'right' | 'bottom' | 'left';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string | ReactNode;
  size?: ModalSize;
  position?: ModalPosition;
  closeOnEsc?: boolean;
  closeOnOutsideClick?: boolean;
  showCloseButton?: boolean;
  hideOverlay?: boolean;
  preventScroll?: boolean;
  footer?: ReactNode;
  headerIcon?: IconDefinition;
  headerAction?: ReactNode;
  footerAlign?: 'left' | 'center' | 'right' | 'between';
  withAnimation?: boolean;
  animationType?: 'fade' | 'slide' | 'scale' | 'slideInPosition';
  customClassName?: string;
  overlayClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  zIndex?: number;
  isDismissable?: boolean;
  fullScreenOnMobile?: boolean;
  autoFocus?: boolean;
  onAnimationComplete?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  position = 'center',
  closeOnEsc = true,
  closeOnOutsideClick = true,
  showCloseButton = true,
  hideOverlay = false,
  preventScroll = true,
  footer,
  headerIcon,
  headerAction,
  footerAlign = 'right',
  withAnimation = true,
  animationType = 'fade',
  customClassName = '',
  overlayClassName = '',
  contentClassName = '',
  headerClassName = '',
  footerClassName = '',
  zIndex = 50,
  isDismissable = true,
  fullScreenOnMobile = false,
  autoFocus = true,
  onAnimationComplete,
}) => {
  const [mounted, setMounted] = useState(false);

  // Size classes for modal
  const sizeClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    xxl: 'max-w-5xl',
    full: 'max-w-full min-h-screen w-screen',
  };

  // Position classes
  const positionWrapperClasses = {
    center: 'items-center justify-center',
    top: 'items-start justify-center pt-16',
    right: 'items-center justify-end',
    bottom: 'items-end justify-center pb-16',
    left: 'items-center justify-start',
  };

  // Footer alignment classes
  const footerAlignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between',
  };

  // Animation variants based on animationType
  const animationVariants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 },
    },
    slide: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
    slideInPosition: {
      hidden: position === 'top' ? { opacity: 0, y: -100 } :
             position === 'bottom' ? { opacity: 0, y: 100 } :
             position === 'left' ? { opacity: 0, x: -100 } :
             position === 'right' ? { opacity: 0, x: 100 } :
             { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, y: 0, x: 0, scale: 1 },
      exit: position === 'top' ? { opacity: 0, y: -100 } :
            position === 'bottom' ? { opacity: 0, y: 100 } :
            position === 'left' ? { opacity: 0, x: -100 } :
            position === 'right' ? { opacity: 0, x: 100 } :
            { opacity: 0, scale: 0.9 },
    }
  };

  // Modal container classes
  const modalClasses = classNames(
    'bg-white rounded-lg shadow-lg relative flex flex-col overflow-hidden mx-4',
    sizeClasses[size],
    {
      'w-full': size === 'full',
      'h-full': size === 'full',
      'sm:mx-0': position !== 'center',
      'md:mx-0': position === 'center',
      'sm:w-full sm:h-screen sm:rounded-none': fullScreenOnMobile,
    },
    contentClassName
  );

  // Header classes
  const headerClasses = classNames(
    'flex items-center justify-between p-4 border-b',
    {
      'bg-[var(--color-primary)] text-white': size === 'full',
      'bg-white': size !== 'full',
    },
    headerClassName
  );

  // Footer classes
  const footerClasses = classNames(
    'flex items-center p-4 border-t',
    footerAlignClasses[footerAlign],
    footerClassName
  );

  // Handle escape key press
  useEffect(() => {
    setMounted(true);

    if (closeOnEsc) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isDismissable) {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEsc);
      return () => {
        document.removeEventListener('keydown', handleEsc);
      };
    }
  }, [closeOnEsc, onClose, isDismissable]);

  // Handle body scroll lock
  useEffect(() => {
    if (preventScroll && isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = 'var(--scrollbar-width, 0)';

      // Calculate scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    }

    return () => {
      if (preventScroll) {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }
    };
  }, [preventScroll, isOpen]);

  // Auto focus the modal when it opens
  useEffect(() => {
    if (isOpen && autoFocus && mounted) {
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstFocusable = Array.from(focusableElements).find(
        el => el instanceof HTMLElement && el.closest('[role="dialog"]')
      );

      if (firstFocusable instanceof HTMLElement) {
        firstFocusable.focus();
      }
    }
  }, [isOpen, autoFocus, mounted]);

  // If not mounted yet or not open, don't render
  if (!mounted || !isOpen) return null;

  // Portal for rendering the modal at the document body
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div 
          className={classNames(
            'fixed inset-0 z-[var(--modal-z-index)] flex',
            positionWrapperClasses[position],
            customClassName
          )} 
          style={{ zIndex }}
        >
          {/* Backdrop/Overlay */}
            {!hideOverlay && (
              <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={classNames(
                'absolute inset-0 bg-black/50 backdrop-blur-md', // Added backdrop-blur-md and background color with opacity
              overlayClassName
              )}
              onClick={closeOnOutsideClick && isDismissable ? onClose : undefined}
              />
            )}

                {/* Modal Content */}
          <motion.div
            role="dialog"
            aria-modal="true"
            className={modalClasses}
            initial={withAnimation ? "hidden" : undefined}
            animate={withAnimation ? "visible" : undefined}
            exit={withAnimation ? "exit" : undefined}
            variants={animationType ? animationVariants[animationType] : undefined}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            onAnimationComplete={() => onAnimationComplete?.()}
          >
            {/* Modal Header */}
            {(title || showCloseButton) && (
              <div className={headerClasses}>
                <div className="flex items-center gap-2">
                  {headerIcon && (
                    <FontAwesomeIcon 
                      icon={headerIcon} 
                      className="text-[var(--color-primary)]"
                    />
                  )}
                  <div className="font-semibold">{title}</div>
                </div>
                
                <div className="flex items-center gap-2">
                  {headerAction}
                  
                  {showCloseButton && isDismissable && (
                    <button 
                      onClick={onClose}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none p-1"
                      aria-label="Close"
                    >
                      <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Modal Body */}
            <div className="p-4 overflow-auto flex-1">
              {children}
            </div>

            {/* Modal Footer */}
            {(footer !== undefined) && (
              <div className={footerClasses}>
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  // Use portal to render modal at document body
  return createPortal(modalContent, document.body);
};

// Confirmation modal component based on the Modal component
export interface ConfirmModalProps extends Omit<ModalProps, 'footer' | 'children'> {
  message: string | ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  cancelVariant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  onConfirm: () => void;
  isLoading?: boolean;
  confirmIcon?: IconDefinition;
  cancelIcon?: IconDefinition;
  messageClassName?: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmVariant = 'primary',
  cancelVariant = 'outline',
  onConfirm,
  isLoading = false,
  confirmIcon,
  cancelIcon,
  messageClassName = '',
  ...modalProps
}) => {
  return (
    <Modal
      {...modalProps}
      footer={
        <div className="flex items-center !gap-4">
          <Button
            variant={cancelVariant}
            onClick={modalProps.onClose}
            leftIcon={cancelIcon}
            isDisabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={confirmVariant}
            onClick={onConfirm}
            leftIcon={confirmIcon}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </div>
      }
    >
      <div className={messageClassName}>{message}</div>
    </Modal>
  );
};

export default Modal;
