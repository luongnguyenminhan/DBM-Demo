'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type AvatarShape = 'circle' | 'square' | 'rounded';
export type AvatarVariant = 'default' | 'primary' | 'secondary' | 'light' | 'dark';

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  icon?: IconDefinition;
  withBorder?: boolean;
  borderColor?: string;
  borderWidth?: string;
  isDisabled?: boolean;
  withAnimation?: boolean;
  customClassName?: string;
  className?: string;
  variant?: AvatarVariant;
  onClick?: () => void;
  onError?: () => void;
  withShadow?: boolean;
  shadowSize?: 'sm' | 'md' | 'lg';
  fallbackSrc?: string;
  showFallback?: boolean;
  customInitialsColors?: string[];
  children?: ReactNode;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  name,
  size = 'md',
  shape = 'circle',
  icon = faUser,
  withBorder = false,
  borderColor,
  borderWidth = '2px',
  isDisabled = false,
  withAnimation = false,
  customClassName = '',
  className,
  variant = 'default',
  onClick,
  onError,
  withShadow = false,
  shadowSize = 'md',
  fallbackSrc,
  showFallback = true,
  customInitialsColors = ['#FD2B7B', '#3E63DD', '#FF8C42', '#0CA678', '#7048E8', '#A64D79'],
  children,
}) => {
  const [error, setError] = useState(false);
  const [initials, setInitials] = useState('');
  const [initialsColor, setInitialsColor] = useState<string>('');

  useEffect(() => {
    if (name) {
      const nameParts = name.trim().split(' ');
      if (nameParts.length === 1) {
        setInitials(nameParts[0].charAt(0).toUpperCase());
      } else if (nameParts.length > 1) {
        setInitials(
          (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase()
        );
      }
      
      if (customInitialsColors && customInitialsColors.length > 0) {
        const colorIndex = name
          .split('')
          .reduce((acc, char) => acc + char.charCodeAt(0), 0) % customInitialsColors.length;
        setInitialsColor(customInitialsColors[colorIndex]);
      } else {
        setInitialsColor('#FD2B7B'); 
      }
    }
  }, [name, customInitialsColors]);

  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl',
  };

  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg',
  };

  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-none',
    rounded: 'rounded-md',
  };

  const backgroundVariants = {
    default: 'bg-gray-200 text-gray-700',
    primary: 'bg-[var(--color-primary-light)] text-[var(--color-primary)]',
    secondary: 'bg-[var(--color-secondary-light)] text-[var(--color-secondary)]',
    light: 'bg-gray-100 text-gray-600',
    dark: 'bg-gray-700 text-gray-100',
  };

  const handleError = () => {
    setError(true);
    if (onError) onError();
  };

  const avatarClasses = classNames(
    'relative flex items-center justify-center overflow-hidden',
    sizeClasses[size],
    shapeClasses[shape],
    {
      'opacity-60 cursor-not-allowed': isDisabled,
      'cursor-pointer': onClick && !isDisabled,
      [shadowClasses[shadowSize]]: withShadow,
    },
    !src || error ? backgroundVariants[variant] : '',
    customClassName,
    className
  );

  const borderStyles = withBorder
    ? {
        border: borderWidth,
        borderColor: borderColor || 'white',
      }
    : {};

  const avatarVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const handleClick = () => {
    if (!isDisabled && onClick) {
      onClick();
    }
  };

  const renderAvatarContent = () => {
    if (children) {
      return children;
    }
    
    if (src && !error) {
      return (
        <Image 
          src={src} 
          alt={alt} 
          fill 
          sizes="100%" 
          style={{ objectFit: 'cover' }} 
          onError={handleError}
        />
      );
    }

    if (fallbackSrc && error && showFallback) {
      return (
        <Image 
          src={fallbackSrc} 
          alt={alt} 
          fill 
          sizes="100%" 
          style={{ objectFit: 'cover' }} 
          onError={() => setError(true)} 
        />
      );
    }

    if (name && initials) {
      return (
        <span 
          className="font-medium"
          style={initialsColor ? { color: initialsColor === backgroundVariants[variant] ? 'white' : 'inherit' } : {}}
        >
          {initials}
        </span>
      );
    }

    return <FontAwesomeIcon icon={icon} />;
  };

  const avatarContent = (
    <div
      className={avatarClasses}
      style={borderStyles}
      onClick={handleClick}
    >
      {renderAvatarContent()}
    </div>
  );

  if (withAnimation) {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        whileHover={onClick && !isDisabled ? "hover" : undefined}
        whileTap={onClick && !isDisabled ? "tap" : undefined}
        variants={avatarVariants}
        transition={{ duration: 0.2 }}
      >
        {avatarContent}
      </motion.div>
    );
  }

  return avatarContent;
};

export interface AvatarGroupProps {
  avatars: Array<Omit<AvatarProps, 'size' | 'shape'> & { key?: string | number }>;
  max?: number;
  size?: AvatarSize;
  shape?: AvatarShape;
  spacing?: number;
  withBorder?: boolean;
  borderColor?: string;
  borderWidth?: string;
  showTotal?: boolean;
  customClassName?: string;
  className?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max,
  size = 'md',
  shape = 'circle',
  spacing = -3,
  withBorder = true,
  borderColor = 'white',
  borderWidth = '2px',
  showTotal = true,
  customClassName = '',
  className,
}) => {
  const displayAvatars = max ? avatars.slice(0, max) : avatars;
  const overflowCount = max && avatars.length > max ? avatars.length - max : 0;

  return (
    <div 
      className={classNames('flex items-center', customClassName, className)}
      style={{ marginLeft: `${-spacing}px` }}
    >
      {displayAvatars.map((avatar, index) => (
        <div 
          key={avatar.key || index} 
          className="relative inline-flex"
          style={{ marginLeft: index === 0 ? 0 : `${spacing}px` }}
        >
          <Avatar
            {...avatar}
            size={size}
            shape={shape}
            withBorder={withBorder}
            borderColor={borderColor}
            borderWidth={borderWidth}
          />
        </div>
      ))}

      {overflowCount > 0 && showTotal && (
        <div 
          className="relative inline-flex"
          style={{ marginLeft: `${spacing}px` }}
        >
          <Avatar
            size={size}
            shape={shape}
            variant="dark"
            withBorder={withBorder}
            borderColor={borderColor}
            borderWidth={borderWidth}
          >
            +{overflowCount}
          </Avatar>
        </div>
      )}
    </div>
  );
};

Avatar.displayName = 'Avatar';
AvatarGroup.displayName = 'AvatarGroup';

export default Avatar;
