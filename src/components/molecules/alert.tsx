'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button, { ButtonVariant } from '../atomic/button';
import Icon from '../atomic/icon';
import Typography from '../atomic/typo';
import { useAlert } from '@/hooks/use-alert';
import { 
    faCheckCircle, 
    faExclamationTriangle, 
    faInfoCircle, 
    faTimesCircle,
    faTimes,
    IconDefinition
} from '@fortawesome/free-solid-svg-icons';

export type AlertVariant = 'success' | 'error' | 'warning' | 'info';
export type AlertSize = 'small' | 'medium' | 'large';
export type AlertPosition = 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type AlertBorderRadius = 'none' | 'small' | 'medium' | 'large' | 'full';

export interface AlertProps {
    message: string | React.ReactNode;
    description?: string | React.ReactNode;
    variant?: AlertVariant;
    size?: AlertSize;
    icon?: IconDefinition;
    showIcon?: boolean;
    closable?: boolean;
    isOpen?: boolean;
    onClose?: () => void;
    action?: React.ReactNode;
    actionLabel?: string;
    actionVariant?: ButtonVariant;
    onAction?: () => void;
    autoClose?: boolean;
    autoCloseDuration?: number;
    fullWidth?: boolean;
    customClassName?: string;
    withAnimation?: boolean;
    rounded?: boolean;
    withBorder?: boolean;
    withBackground?: boolean;
    position?: AlertPosition;
    isFloating?: boolean;
    withShadow?: boolean;
    borderRadius?: AlertBorderRadius;
}

const Alert: React.FC<AlertProps> = ({
    message,
    description,
    variant = 'info',
    size = 'medium',
    icon,
    showIcon = true,
    closable = true,
    isOpen = true,
    onClose,
    action,
    actionLabel,
    actionVariant = 'outline',
    onAction,
    autoClose = false,
    autoCloseDuration = 5000,
    fullWidth = false,
    customClassName = '',
    withAnimation = true,
    rounded = false,
    withBorder = true,
    withBackground = true,
    position = 'top',
    isFloating = false,
    withShadow = false,
    borderRadius = 'none',
}) => {
    const { visible, handleClose } = useAlert({
        isOpen,
        autoClose,
        autoCloseDuration,
        onClose
    });

    // Get variant icon based on variant
    const getVariantIcon = (): IconDefinition => {
        if (icon) return icon;
        
        switch (variant) {
            case 'success': return faCheckCircle;
            case 'error': return faTimesCircle;
            case 'warning': return faExclamationTriangle;
            case 'info':
            default: return faInfoCircle;
        }
    };

    // Handle custom action
    const handleAction = () => {
        onAction?.();
    };

    // Size mapping
    const sizeClasses = {
        small: 'p-2 text-sm',
        medium: 'p-3',
        large: 'p-4 text-lg',
    };

    // Variant background classes
    const variantBackgroundClasses = {
        success: 'bg-green-50 text-green-800',
        error: 'bg-red-50 text-red-800',
        warning: 'bg-yellow-50 text-yellow-800',
        info: 'bg-blue-50 text-blue-800',
    };

    // Variant transparent classes
    const variantTransparentClasses = {
        success: 'text-[var(--color-success)]',
        error: 'text-[var(--color-error)]',
        warning: 'text-[var(--color-warning)]',
        info: 'text-[var(--color-info)]',
    };

    // Variant border classes
    const variantBorderClasses = {
        success: 'border border-green-200',
        error: 'border border-red-200',
        warning: 'border border-yellow-200',
        info: 'border border-blue-200',
    };

    // Icon color classes
    const iconColorClasses = {
        success: '!text-[var(--color-success)]',
        error: '!text-[var(--color-error)]',
        warning: '!text-[var(--color-warning)]',
        info: '!text-[var(--color-info)]',
    };

    // Position classes for floating alerts
    const positionClasses = {
        'top': 'top-4 left-1/2 transform -translate-x-1/2',
        'bottom': 'bottom-4 left-1/2 transform -translate-x-1/2',
        'top-left': 'top-4 left-4',
        'top-right': 'top-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'bottom-right': 'bottom-4 right-4',
    };

    // Border radius classes
    const borderRadiusClasses = {
        'none': '',
        'small': 'rounded',
        'medium': 'rounded-md',
        'large': 'rounded-lg',
        'full': 'rounded-full'
    };

    // Container classes
    const alertClasses = classNames(
        'flex items-start gap-3',
        sizeClasses[size],
        borderRadiusClasses[borderRadius],
        {
            [variantBackgroundClasses[variant]]: withBackground,
            [variantTransparentClasses[variant]]: !withBackground,
            [variantBorderClasses[variant]]: withBorder,
            'rounded-md': rounded, // keep for backward compatibility
            'w-full': fullWidth,
            'shadow-md': withShadow,
            'fixed z-50': isFloating,
            [positionClasses[position]]: isFloating,
            'max-w-md': isFloating && !fullWidth,
        },
        customClassName
    );

    // Animation variants
    const alertVariants = {
        hidden: { 
            opacity: 0,
            y: position.includes('top') ? -20 : 20,
            x: position.includes('left') ? -20 : position.includes('right') ? 20 : 0
        },
        visible: { 
            opacity: 1, 
            y: 0,
            x: 0
        },
        exit: { 
            opacity: 0,
            y: position.includes('top') ? -20 : 20,
            x: position.includes('left') ? -20 : position.includes('right') ? 20 : 0
        }
    };

    // Don't render if not visible
    if (!visible) return null;

    const alertContent = (
        <div className={alertClasses}>
            {showIcon && (
                <div className="flex-shrink-0">
                    <Icon 
                        icon={getVariantIcon()} 
                        size={size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md'} 
                        className={iconColorClasses[variant]}
                    />
                </div>
            )}
            
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        {typeof message === 'string' ? (
                            <Typography.Text 
                                weight="medium" 
                                size={size === 'small' ? 'xs' : size === 'large' ? 'base' : 'sm'}
                            >
                                {message}
                            </Typography.Text>
                        ) : message}
                        
                        {description && (
                            <div className="mt-1">
                                {typeof description === 'string' ? (
                                    <Typography.Text 
                                        variant="secondary"
                                        size={size === 'small' ? 'xs' : size === 'large' ? 'base' : 'sm'}
                                    >
                                        {description}
                                    </Typography.Text>
                                ) : description}
                            </div>
                        )}
                    </div>
                </div>
                
                {(action || actionLabel || onAction) && (
                    <div className="mt-2">
                        {action ? (
                            action
                        ) : actionLabel && onAction ? (
                            <Button
                                variant={actionVariant}
                                size={size === 'small' ? 'small' : size === 'large' ? 'large' : 'medium'}
                                onClick={handleAction}
                                rounded={rounded}
                            >
                                {actionLabel}
                            </Button>
                        ) : null}
                    </div>
                )}
            </div>
            
            {closable && (
                <button 
                    onClick={handleClose} 
                    className="flex-shrink-0 text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Close"
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            )}
        </div>
    );

    return withAnimation ? (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={alertVariants}
                    transition={{ duration: 0.3 }}
                >
                    {alertContent}
                </motion.div>
            )}
        </AnimatePresence>
    ) : alertContent;
};

// Toast notification system to show floating alerts
interface ToastOptions extends Omit<AlertProps, 'isOpen' | 'onClose'> {
    id?: string;
    duration?: number;
}

export class Toast {
    static success(message: string, options?: Partial<ToastOptions>) {
        return Toast.show(message, { variant: 'success', ...options });
    }

    static error(message: string, options?: Partial<ToastOptions>) {
        return Toast.show(message, { variant: 'error', ...options });
    }

    static warning(message: string, options?: Partial<ToastOptions>) {
        return Toast.show(message, { variant: 'warning', ...options });
    }

    static info(message: string, options?: Partial<ToastOptions>) {
        return Toast.show(message, { variant: 'info', ...options });
    }

    static show(message: string, options?: Partial<ToastOptions>) {
        // In a real implementation, this would use a global toast manager
        // This is a placeholder for demonstration
        console.log(`Toast: ${message}`, options);
        return 'toast-id';
    }

    static dismiss(id?: string) {
        // Dismiss a specific toast or all if no ID provided
        console.log(`Dismissing toast: ${id || 'all'}`);
    }
}

export default Alert;