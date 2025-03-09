'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, type IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type BadgeVariant = 
  | 'default' 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info' 
  | 'dark' 
  | 'light';

export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';
export type BadgeShape = 'square' | 'rounded' | 'pill';

export interface BadgeProps {
  children?: ReactNode;
  content?: string | number | ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  shape?: BadgeShape;
  withAnimation?: boolean;
  customClassName?: string;
  className?: string;
  leftIcon?: IconDefinition;
  rightIcon?: IconDefinition;
  isDisabled?: boolean;
  onClick?: () => void;
  isDot?: boolean;
  withBorder?: boolean;
  borderColor?: string;
  withShadow?: boolean;
  asCounter?: boolean;
  maxCount?: number;
  showZero?: boolean;
  isFloating?: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  offset?: [number, number];
}

const Badge: React.FC<BadgeProps> = ({
  children,
  content,
  variant = 'primary',
  size = 'md',
  shape = 'pill',
  withAnimation = false,
  customClassName = '',
  className,
  leftIcon,
  rightIcon,
  isDisabled = false,
  onClick,
  isDot = false,
  withBorder = false,
  borderColor,
  withShadow = false,
  asCounter = false,
  maxCount = 99,
  showZero = false,
  isFloating = false,
  position = 'top-right',
  offset = [0, 0],
}) => {
  // Base variant colors
  const variantClasses = {
    default: 'bg-gray-50 text-gray-800',
    primary: 'bg-[var(--color-primary)] text-white',
    secondary: 'bg-[var(--color-secondary)] text-white',
    success: 'bg-[var(--color-success)] text-white',
    warning: 'bg-[var(--color-warning)] text-[var(--text-primary)]',
    error: 'bg-[var(--color-error)] text-white',
    info: 'bg-[var(--color-info)] text-white',
    dark: 'bg-[var(--color-dark)] text-white',
    light: 'bg-[var(--color-off-white)] text-[var(--text-primary)]',
  };

  // Size classes
  const sizeClasses = {
    xs: isDot ? 'w-1.5 h-1.5' : 'text-xs py-0 px-1.5 min-w-[18px] h-[18px]',
    sm: isDot ? 'w-2 h-2' : 'text-xs py-0.5 px-2 min-w-[20px] h-[20px]',
    md: isDot ? 'w-2.5 h-2.5' : 'text-sm py-0.5 px-2 min-w-[22px] h-[22px]',
    lg: isDot ? 'w-3 h-3' : 'text-sm py-1 px-2.5 min-w-[24px] h-[24px]',
  };

  // Shape classes
  const shapeClasses = {
    square: 'rounded-none',
    rounded: 'rounded',
    pill: 'rounded-full',
  };

  // Position classes for floating badges
  const positionClasses = {
    'top-right': 'top-[-5px] right-[-5px]',
    'top-left': 'top-[-5px] left-[-5px]',
    'bottom-right': 'bottom-[-5px] right-[-5px]',
    'bottom-left': 'bottom-[-5px] left-[-5px]',
  };

  // Default position offset classes
  const offsetPositionStyles = {
    'top-right': { transform: `translate(${offset[0]}px, ${-offset[1]}px)` },
    'top-left': { transform: `translate(${-offset[0]}px, ${-offset[1]}px)` },
    'bottom-right': { transform: `translate(${offset[0]}px, ${offset[1]}px)` },
    'bottom-left': { transform: `translate(${-offset[0]}px, ${offset[1]}px)` },
  };

  // Format content for counters (e.g. 99+ for values > maxCount)
    const formattedContent = () => {
    if (isDot) return null;
    
    if (asCounter && typeof content === 'number') {
      if (content > maxCount) {
        return `${maxCount}+`;
      }
      if (content === 0 && !showZero) {
        return null;
      }
    }
    return content;
  };

  // Badge classes
  const badgeClasses = classNames(
    'inline-flex items-center justify-center font-medium',
    sizeClasses[size],
    shapeClasses[shape],
    variantClasses[variant],
    {
      'cursor-pointer': onClick && !isDisabled,
      'opacity-60 cursor-not-allowed': isDisabled,
      'shadow-sm': withShadow,
      'border-2': withBorder,
      'border-white': withBorder && !borderColor,
      'absolute': isFloating,
      [positionClasses[position]]: isFloating,
    },
    customClassName,
    className
  );

  // Animation variants
  const badgeVariants = {
    initial: { scale: 0.6, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.6, opacity: 0 },
    pulse: {
      scale: [1, 1.05, 1],
      transition: { 
        duration: 0.6,
        repeat: Infinity,
        repeatType: "loop" as const,
      }
    }
  };

  // Handle click events
  const handleClick = () => {
    if (!isDisabled && onClick) {
      onClick();
    }
  };

  // Render the badge content
  const badgeContent = (
    <span
      className={badgeClasses}
      onClick={handleClick}
      style={{
        ...(isFloating ? offsetPositionStyles[position] : {}),
        ...(withBorder && borderColor ? { borderColor } : {})
      }}
    >
        {leftIcon && (
          <FontAwesomeIcon icon={leftIcon} className={classNames('inline-block', {
            'mr-1': formattedContent(),
          })} />
        )}
      
      {formattedContent()}
      
      {rightIcon && !isDot && (
        <FontAwesomeIcon icon={rightIcon} className={classNames('inline-block', {
          'ml-1': formattedContent(),
        })} />
      )}
    </span>
  );

  // If it's a standalone badge (not attached to children)
  if (!children) {
    // Apply animations if needed
    if (withAnimation) {
      return (
        <motion.span
          initial="initial"
          animate="animate"
          exit="exit"
          variants={badgeVariants}
          whileHover={onClick && !isDisabled ? { scale: 1.1 } : undefined}
          whileTap={onClick && !isDisabled ? { scale: 0.95 } : undefined}
        >
          {badgeContent}
        </motion.span>
      );
    }
    return badgeContent;
  }

  // If it's a badge attached to children
  return (
    <div className="relative inline-flex">
      {children}
      
      {withAnimation ? (
        <motion.span
          className="absolute"
          initial="initial"
          animate={content || isDot ? "animate" : "exit"}
          exit="exit"
          variants={badgeVariants}
          style={isFloating ? offsetPositionStyles[position] : undefined}
        >
          {badgeContent}
        </motion.span>
      ) : (
        <>
          {(content || isDot || showZero) && badgeContent}
        </>
      )}
    </div>
  );
};

// Tag component - a variation of Badge for tagging items
export const Tag: React.FC<
  Omit<BadgeProps, 'isDot' | 'asCounter' | 'maxCount' | 'showZero' | 'isFloating' | 'position' | 'offset'> & {
    onClose?: () => void;
    closable?: boolean;
  }
> = ({ 
  variant = 'default',
  size = 'md',
  shape = 'rounded',
  onClose,
  closable = false,
  ...props 
}) => {
  return (
    <Badge
      variant={variant}
      size={size}
      shape={shape}
      rightIcon={closable ? faTimes as IconDefinition : undefined}
      onClick={closable ? onClose : props.onClick}
      {...props}
    />
  );
};

export default Badge;
