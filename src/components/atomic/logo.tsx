'use client';

import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import Icon from './icon';
import Typography from './typo';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faBolt } from '@fortawesome/free-solid-svg-icons';

export type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'custom';
export type LogoVariant = 'default' | 'primary' | 'secondary' | 'light' | 'dark';
export type LogoOrientation = 'horizontal' | 'vertical' | 'icon-only' | 'text-only';

export interface LogoProps {
  size?: LogoSize;
  variant?: LogoVariant;
  orientation?: LogoOrientation;
  withAnimation?: boolean;
  animationType?: 'fade' | 'slide' | 'bounce';
  customClassName?: string;
  className?: string;
  onClick?: () => void;
  icon?: IconDefinition;
  text?: string;
  tagline?: string;
  customSize?: {
    icon?: string;
    text?: string;
  };
  iconPosition?: 'left' | 'right' | 'top' | 'bottom';
}

const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'primary',
  orientation = 'horizontal',
  withAnimation = false,
  animationType = 'fade',
  customClassName = '',
  className,
  onClick,
  icon = faBolt,
  text,
  tagline,
  customSize,
  iconPosition = 'left',
}) => {
  // Size mappings for icon and text
  const sizeClasses = {
    xs: {
      container: 'gap-1',
      icon: 'w-4 h-4',
      text: 'text-sm',
      tagline: 'text-xs',
    },
    sm: {
      container: 'gap-1.5',
      icon: 'w-5 h-5',
      text: 'text-base',
      tagline: 'text-xs',
    },
    md: {
      container: 'gap-2',
      icon: 'w-6 h-6',
      text: 'text-lg',
      tagline: 'text-xs',
    },
    lg: {
      container: 'gap-2.5',
      icon: 'w-7 h-7',
      text: 'text-xl',
      tagline: 'text-sm',
    },
    xl: {
      container: 'gap-3',
      icon: 'w-8 h-8',
      text: 'text-2xl',
      tagline: 'text-sm',
    },
    '2xl': {
      container: 'gap-3.5',
      icon: 'w-10 h-10',
      text: 'text-3xl',
      tagline: 'text-base',
    },
    custom: {
      container: 'gap-2',
      icon: customSize?.icon || 'w-6 h-6',
      text: customSize?.text || 'text-lg',
      tagline: 'text-xs',
    },
  };

  // Variant colors
  const variantClasses = {
    default: 'text-[var(--text-primary)]',
    primary: 'text-[var(--color-primary)]',
    secondary: 'text-[var(--color-secondary)]',
    light: 'text-white',
    dark: 'text-gray-900',
  };

  // Container classes based on orientation
  const containerClasses = classNames(
    'inline-flex items-center transition-all',
    sizeClasses[size].container,
    variantClasses[variant],
    {
      'flex-row': orientation === 'horizontal',
      'flex-col': orientation === 'vertical',
      'cursor-pointer': onClick,
    },
    customClassName,
    className
  );

  // Animation variants
  const animationVariants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slide: {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
    },
    bounce: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 10,
        }
      },
    },
  };

  // Order of elements based on icon position
  const renderContent = () => {
    // Just the icon
    if (orientation === 'icon-only') {
      return <Icon icon={icon} size={size} variant={'default'} customSize={sizeClasses[size].icon} />;
    }

    // Just the text
    if (orientation === 'text-only') {
      return (
        <div className="flex flex-col">
          <Typography.Heading 
            level={'h5'} 
            className={classNames(sizeClasses[size].text, variantClasses[variant])}
          >
            {text}
          </Typography.Heading>
          {tagline && (
            <Typography.Text 
              size="xs" 
              variant="muted" 
              className={sizeClasses[size].tagline}
            >
              {tagline}
            </Typography.Text>
          )}
        </div>
      );
    }

    // Icon and text in horizontal or vertical layout
    const iconElement = <Icon icon={icon} size={size} variant={'default'} customSize={sizeClasses[size].icon} />;
    const textElement = (
      <div className="flex flex-col">
        <Typography.Heading 
          level={'h5'} 
          className={classNames(sizeClasses[size].text, variantClasses[variant])}
        >
          {text}
        </Typography.Heading>
        {tagline && (
          <Typography.Text 
            size="xs" 
            variant="muted" 
            className={sizeClasses[size].tagline}
          >
            {tagline}
          </Typography.Text>
        )}
      </div>
    );

    // Position the elements based on orientation and iconPosition
    if (orientation === 'vertical') {
      return (
        <>
          {iconPosition === 'top' || iconPosition === 'left' ? (
            <>
              {iconElement}
              {textElement}
            </>
          ) : (
            <>
              {textElement}
              {iconElement}
            </>
          )}
        </>
      );
    }

    return (
      <>
        {iconPosition === 'left' ? (
          <>
            {iconElement}
            {textElement}
          </>
        ) : (
          <>
            {textElement}
            {iconElement}
          </>
        )}
      </>
    );
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  if (withAnimation) {
    return (
      <motion.div
        className={containerClasses}
        onClick={handleClick}
        initial="hidden"
        animate="visible"
        variants={animationVariants[animationType]}
        transition={{ duration: 0.5 }}
      >
        {renderContent()}
      </motion.div>
    );
  }

  return (
    <div className={containerClasses} onClick={handleClick}>
      {renderContent()}
    </div>
  );
};

export default Logo;
