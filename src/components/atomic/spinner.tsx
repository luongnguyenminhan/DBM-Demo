'use client';

import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'custom';
export type SpinnerVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'light';
export type SpinnerType = 'border' | 'icon';

export interface SpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  customSize?: string;
  type?: SpinnerType;
  icon?: IconDefinition;
  speed?: 'slow' | 'normal' | 'fast';
  text?: string;
  textPlacement?: 'left' | 'right' | 'top' | 'bottom';
  fullScreen?: boolean;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  customClassName?: string;
  className?: string;
  withAnimation?: boolean;
  isVisible?: boolean;
  dotsCount?: number;
  customColor?: string;
  label?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'primary',
  customSize,
  type = 'icon',
  icon = faCircleNotch,
  speed = 'normal',
  text,
  textPlacement = 'right',
  fullScreen = false,
  overlay = false,
  overlayColor = 'white',
  overlayOpacity = 0.7,
  customClassName = '',
  className,
  isVisible = true,
  customColor,
  label,
}) => {
  if (!isVisible) return null;

  const sizeClasses = {
    xs: 'w-3 h-3 text-xs',
    sm: 'w-4 h-4 text-sm',
    md: 'w-6 h-6 text-base',
    lg: 'w-8 h-8 text-lg',
    xl: 'w-10 h-10 text-xl',
    '2xl': 'w-12 h-12 text-2xl',
    custom: customSize || 'w-6 h-6',
  };

  const variantClasses = {
    default: 'text-gray-600',
    primary: 'text-[var(--color-primary)]',
    secondary: 'text-[var(--color-secondary)]',
    success: 'text-[var(--color-success)]',
    warning: 'text-[var(--color-warning)]',
    error: 'text-[var(--color-error)]',
    info: 'text-[var(--color-info)]',
    light: 'text-white',
  };

  const speedClasses = {
    slow: 'animate-spin-slow',
    normal: 'animate-spin',
    fast: 'animate-spin-fast', 
  };

  const textPlacementClasses = {
    left: 'flex-row-reverse items-center',
    right: 'flex-row items-center',
    top: 'flex-col-reverse items-center',
    bottom: 'flex-col items-center',
  };

  const containerClasses = classNames(
    'flex gap-2',
    textPlacementClasses[textPlacement],
    {
      'fixed inset-0 z-50 flex justify-center items-center': fullScreen,
      'relative flex justify-center items-center': !fullScreen,
    },
    customClassName,
    className
  );

  const overlayClasses = classNames(
    'absolute inset-0',
    {
      'bg-white': overlayColor === 'white',
      'bg-black': overlayColor === 'black',
      'bg-gray-800': overlayColor === 'gray',
      'opacity-70': overlayOpacity === 0.7,
      [`opacity-${Math.round(overlayOpacity * 100)}`]: overlayOpacity !== 0.7,
    }
  );

  const customStyles = customColor ? { color: customColor } : {};


  const renderBorder = () => {
    return (
      <div 
        className={classNames(
          'rounded-full border-2 border-t-transparent',
          sizeClasses[size],
          variantClasses[variant],
          speedClasses[speed]
        )}
        style={{
          ...customStyles,
          borderTopColor: 'transparent',
        }}
      />
    );
  };

  const renderIcon = () => {
    return (
      <FontAwesomeIcon
        icon={icon}
        className={classNames(
          sizeClasses[size],
          variantClasses[variant],
          speedClasses[speed]
        )}
        style={customStyles}
        aria-hidden="true"
      />
    );
  };


  const getSpinner = () => {
    switch (type) {
      case 'border': return renderBorder();
      case 'icon':
      default: return renderIcon();
    }
  };

  const spinnerElement = (
    <div className={containerClasses} role="status" aria-label={label || "Loading"}>
      {text && textPlacement === 'left' && <span className="text-sm">{text}</span>}
      {text && textPlacement === 'top' && <span className="text-sm">{text}</span>}
      
      {getSpinner()}
      
      {text && textPlacement === 'right' && <span className="text-sm">{text}</span>}
      {text && textPlacement === 'bottom' && <span className="text-sm">{text}</span>}
      
      <span className="sr-only">{label || "Loading"}</span>
    </div>
  );

  if (fullScreen || overlay) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {(fullScreen || overlay) && (
          <div className={overlayClasses} />
        )}
        {spinnerElement}
      </div>
    );
  }
  
  return spinnerElement;
};

export const Loader: React.FC<{
  isLoading: boolean;
  children: React.ReactNode;
  spinnerProps?: SpinnerProps;
  overlay?: boolean;
  fullPage?: boolean;
  height?: string;
  minHeight?: string;
  fallback?: React.ReactNode;
}> = ({
  isLoading,
  children,
  spinnerProps,
  overlay = false,
  fullPage = false,
  height,
  minHeight = '200px',
  fallback,
}) => {
  if (!isLoading) return <>{children}</>;
  
  if (fallback) return <>{fallback}</>;
  
  if (overlay) {
    return (
      <div className="relative" style={{ minHeight }}>
        <div className={isLoading ? 'opacity-30' : ''}>{children}</div>
        {isLoading && (
          <Spinner
            overlay
            {...spinnerProps}
            fullScreen={fullPage}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center" style={{ height, minHeight }}>
      <Spinner {...spinnerProps} fullScreen={fullPage} />
    </div>
  );
};


export default Spinner;
