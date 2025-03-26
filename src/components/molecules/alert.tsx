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

    const handleAction = () => {
        onAction?.();
    };

    const sizeClasses = {
        small: 'p-2 text-sm',
        medium: 'p-3',
        large: 'p-4 text-lg',
    };

    const variantBackgroundClasses = {
        success: 'bg-green-50 text-green-800',
        error: 'bg-red-50 text-red-800',
        warning: 'bg-yellow-50 text-yellow-800',
        info: 'bg-blue-50 text-blue-800',
    };

    const variantTransparentClasses = {
        success: 'text-[var(--color-success)]',
        error: 'text-[var(--color-error)]',
        warning: 'text-[var(--color-warning)]',
        info: 'text-[var(--color-info)]',
    };

    const variantBorderClasses = {
        success: 'border border-green-200',
        error: 'border border-red-200',
        warning: 'border border-yellow-200',
        info: 'border border-blue-200',
    };

    const iconColorClasses = {
        success: '!text-[var(--color-success)]',
        error: '!text-[var(--color-error)]',
        warning: '!text-[var(--color-warning)]',
        info: '!text-[var(--color-info)]',
    };

    const positionClasses = {
        'top': 'top-4 left-1/2',
        'bottom': 'bottom-4 left-1/2',
        'top-left': 'top-4 left-4',
        'top-right': 'top-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'bottom-right': 'bottom-4 right-4',
    };

    const borderRadiusClasses = {
        'none': '',
        'small': 'rounded',
        'medium': 'rounded-md',
        'large': 'rounded-lg',
        'full': 'rounded-full'
    };

    const alertClasses = classNames(
        'flex items-center gap-3',
        sizeClasses[size],
        borderRadiusClasses[borderRadius],
        {
            [variantBackgroundClasses[variant]]: withBackground,
            [variantTransparentClasses[variant]]: !withBackground,
            [variantBorderClasses[variant]]: withBorder,
            'rounded-md': rounded, 
            'w-full': fullWidth,
            'shadow-md': withShadow,
            'fixed z-50': isFloating,
            [positionClasses[position]]: isFloating,
            'max-w-md': isFloating && !fullWidth,
        },
        customClassName
    );

    const alertVariants = {
        hidden: { 
            opacity: 0
        },
        visible: { 
            opacity: 1
        },
        exit: { 
            opacity: 0
        }
    };

    if (!visible) return null;

    const alertContent = (
        <div className={alertClasses}>
            {showIcon && (
            <div className="flex-shrink-0 flex items-center justify-center">
                <Icon 
                icon={getVariantIcon()} 
                size={size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md'} 
                className={iconColorClasses[variant]}
                />
            </div>
            )}
            
            <div className="flex-1">
            <div className="flex justify-between items-center">
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

interface ToastOptions extends Omit<AlertProps, 'isOpen' | 'onClose'> {
    id?: string;
    duration?: number;
}

export class Toast {
    private static toasts: Map<string, NodeJS.Timeout> = new Map();
    private static counter: number = 0;
    private static container: HTMLDivElement | null = null;

    private static createContainer() {
        if (typeof document === 'undefined') return null;
        
        if (!Toast.container) {
            const div = document.createElement('div');
            div.id = 'toast-container';
            div.style.position = 'fixed';
            div.style.zIndex = '9999';
            div.style.top = '0';
            div.style.right = '0';
            div.style.padding = '1rem';
            div.style.pointerEvents = 'none';
            document.body.appendChild(div);
            Toast.container = div;
        }
        return Toast.container;
    }

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

    static show(message: string, options: Partial<ToastOptions> = {}) {
        if (typeof window === 'undefined') {
            console.log(`Toast: ${message}`, options);
            return 'toast-id';
        }

        const id = options.id || `toast-${++Toast.counter}`;
        
        const container = Toast.createContainer();
        if (!container) return id;

        const duration = options.duration || options.autoCloseDuration || 5000;
        const position = options.position || 'top-right';
        
        Toast.dismiss(id);
        
        const toastEl = document.createElement('div');
        toastEl.id = id;
        toastEl.style.pointerEvents = 'auto';
        toastEl.style.marginBottom = '0.5rem';
        toastEl.style.transition = 'opacity 0.3s ease';
        container.appendChild(toastEl);
        
        if (typeof window !== 'undefined') {
            import('react-dom/client').then((ReactDOMClient) => {
                try {
                    const root = ReactDOMClient.createRoot(toastEl);
                    
                    const alertComponent = (
                        <Alert
                            message={message}
                            {...options}
                            isOpen={true}
                            autoClose={true}
                            autoCloseDuration={duration}
                            position={position}
                            isFloating={true}
                            withShadow={true}
                            borderRadius="medium"
                            withAnimation={true}
                            onClose={() => Toast.dismiss(id)}
                        />
                    );
                    
                    root.render(alertComponent);
                } catch (error) {
                    console.error('Failed to render toast:', error);
                    import('react-dom/client').then((ReactDOMClient) => {
                        try {
                            console.warn('Attempting alternative createRoot approach');
                            const fallbackRoot = ReactDOMClient.createRoot(toastEl);
                            fallbackRoot.render(
                                <Alert
                                    message={message}
                                    {...options}
                                    isOpen={true}
                                    autoClose={true}
                                    autoCloseDuration={duration}
                                    position={position}
                                    isFloating={true}
                                    withShadow={true}
                                    borderRadius="medium"
                                    withAnimation={true}
                                    onClose={() => Toast.dismiss(id)}
                                />
                            );
                        } catch (fallbackError) {
                            console.error('All rendering attempts failed:', fallbackError);
                        }
                    });
                }
            }).catch((error) => {
                console.error('Failed to import ReactDOM/client:', error);
            });
        }
        
        if (duration > 0) {
            const timeout = setTimeout(() => {
                Toast.dismiss(id);
            }, duration);
            
            Toast.toasts.set(id, timeout);
        }
        
        return id;
    }

    static dismiss(id?: string) {
        if (typeof window === 'undefined') return;
        
        const fadeOut = (element: HTMLElement, callback: () => void) => {
            element.style.opacity = '0';
            setTimeout(() => {
                callback();
            }, 300); 
        };
        
        if (id) {
            const timeout = Toast.toasts.get(id);
            if (timeout) {
                clearTimeout(timeout);
                Toast.toasts.delete(id);
            }
            
            const toastEl = document.getElementById(id);
            if (toastEl && toastEl.parentNode) {
                fadeOut(toastEl, () => {
                    if (toastEl.parentNode) {
                        toastEl.parentNode.removeChild(toastEl);
                    }
                });
            }
        } else {
            Toast.toasts.forEach(timeout => clearTimeout(timeout));
            Toast.toasts.clear();
            
            if (Toast.container) {
                Array.from(Toast.container.children).forEach((child: Element) => {
                    if (child instanceof HTMLElement) {
                        fadeOut(child, () => {
                            if (child.parentNode) {
                                child.parentNode.removeChild(child);
                            }
                        });
                    }
                });
            }
        }
    }
}

export default Alert;