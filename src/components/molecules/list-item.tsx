'use client';

import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Typography from '../atomic/typo';
import Badge from '../atomic/badge';
import Avatar from '../atomic/avatar';
import Icon from '../atomic/icon';
import Image from 'next/image';

export type ListItemVariant = 'default' | 'primary' | 'secondary' | 'outline' | 'ghost';
export type ListItemSize = 'small' | 'medium' | 'large';

export interface ListItemProps {
  title: string;
  description?: string;
  icon?: IconDefinition;
  image?: string;
  avatar?: string;
  initials?: string;
  variant?: ListItemVariant;
  size?: ListItemSize;
  isActive?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  href?: string;
  badge?: string | number;
  badgeVariant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  actions?: React.ReactNode;
  rightIcon?: IconDefinition;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  customClassName?: string;
  className?: string;
  withHover?: boolean;
  withDivider?: boolean;
  withAnimation?: boolean;
  withRipple?: boolean;
  highlightText?: string;
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  description,
  icon,
  image,
  avatar,
  variant = 'default',
  size = 'medium',
  isActive = false,
  isSelected = false,
  isDisabled = false,
  onClick,
  href,
  badge,
  badgeVariant = 'primary',
  actions,
  rightIcon,
  leftContent,
  rightContent,
  customClassName = '',
  className,
  withHover = true,
  withDivider = false,
  withAnimation = true,
  withRipple = false,
  highlightText = '',
}) => {
  // Size classes
  const sizeClasses = {
    small: 'py-2 px-3 text-sm',
    medium: 'py-3 px-4',
    large: 'py-4 px-5 text-lg',
  };

  // Variant classes
  const getVariantClasses = () => {
    // Base styles
    const baseClasses = 'transition-all duration-200';
    
    // Active/selected styles
    if (isActive || isSelected) {
      switch (variant) {
        case 'primary':
          return `${baseClasses} bg-[var(--color-primary-light)] text-[var(--color-primary)]`;
        case 'secondary':
          return `${baseClasses} bg-[var(--color-secondary-light)] text-[var(--color-secondary)]`;
        case 'outline':
          return `${baseClasses} border-l-4 border-[var(--color-primary)] bg-primary-50/10`;
        case 'ghost':
          return `${baseClasses} bg-gray-50`;
        default:
          return `${baseClasses} bg-gray-100`;
      }
    }
    
    // Normal styles with hover
    return `${baseClasses} ${withHover && !isDisabled ? getHoverClasses() : ''}`;
  };
  
  // Hover classes based on variant
  const getHoverClasses = () => {
    switch (variant) {
      case 'primary':
        return 'hover:bg-[var(--color-primary-light)] hover:bg-opacity-30';
      case 'secondary':
        return 'hover:bg-[var(--color-secondary-light)] hover:bg-opacity-30';
      case 'outline':
        return 'hover:border-l-4 hover:border-[var(--color-primary)] hover:bg-gray-50';
      case 'ghost':
        return 'hover:bg-gray-50';
      default:
        return 'hover:bg-gray-50';
    }
  };
  
  // Container classes
  const containerClasses = classNames(
    'flex items-center w-full rounded-md',
    sizeClasses[size],
    getVariantClasses(),
    {
      'cursor-pointer': onClick && !isDisabled,
      'opacity-50 cursor-not-allowed': isDisabled,
      'border-b': withDivider,
    },
    customClassName,
    className
  );
  
  // Animation variants
  const listItemVariants = {
    initial: { 
      opacity: 0,
      y: 10
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2
      }
    },
    hover: { 
      scale: withRipple ? 1.02 : 1,
      transition: {
        duration: 0.2
      }
    },
    tap: { 
      scale: withRipple ? 0.98 : 1 
    }
  };
  
  // Highlight matching text in title if highlightText is provided
  const renderHighlightedTitle = () => {
    if (!highlightText) {
      return <Typography.Text weight={isActive || isSelected ? 'medium' : 'regular'}>{title}</Typography.Text>;
    }
    
    const parts = title.split(new RegExp(`(${highlightText})`, 'gi'));
    
    return (
      <Typography.Text weight={isActive || isSelected ? 'medium' : 'regular'}>
        {parts.map((part, i) => 
          part.toLowerCase() === highlightText.toLowerCase() ? (
            <mark key={i} className="bg-yellow-200 rounded px-0.5">{part}</mark>
          ) : (
            part
          )
        )}
      </Typography.Text>
    );
  };

  const handleClick = () => {
    if (!isDisabled && onClick) {
      onClick();
    }
  };

  const renderLeftContent = () => {
    if (leftContent) {
      return <div className="mr-3 flex-shrink-0">{leftContent}</div>;
    }
    
    if (avatar) {
      return (
        <div className="mr-3 flex-shrink-0">
          <Avatar src={avatar} name={title} size={size === 'small' ? 'xs' : size === 'large' ? 'md' : 'sm'} />
        </div>
      );
    }
    
    if (image) {
      return (
        <div className="mr-3 flex-shrink-0">
          <Image src={image} alt={title} className={classNames(
            'rounded-md object-cover',
            {
              'w-8 h-8': size === 'small',
              'w-10 h-10': size === 'medium',
              'w-12 h-12': size === 'large',
            }
          )} />
        </div>
      );
    }
    
    if (icon) {
      return (
        <div className="mr-3 flex-shrink-0">
          <Icon 
            icon={icon}
            size={size === 'small' ? 'xs' : size === 'large' ? 'md' : 'sm'}
            variant={isActive || isSelected ? 'primary' : 'default'}
          />
        </div>
      );
    }
    
    return null;
  };

  const renderContent = () => (
    <>
      <div className="flex-grow min-w-0">
        <div className="flex items-center">
          <div className="flex-grow truncate">
            {renderHighlightedTitle()}
          </div>
          {badge && (
            <div className="ml-2 flex-shrink-0">
              <Badge
                content={badge}
                variant={badgeVariant}
                size={size === 'small' ? 'xs' : 'sm'}
              />
            </div>
          )}
        </div>
        {description && (
          <Typography.Text 
            variant="muted" 
            size={size === 'small' ? 'xs' : size === 'large' ? 'base' : 'sm'}
            className="line-clamp-1"
          >
            {description}
          </Typography.Text>
        )}
      </div>
      
      {(rightContent || actions || rightIcon) && (
        <div className="flex items-center ml-2 flex-shrink-0">
          {rightContent}
          {actions}
          {rightIcon && (
            <Icon 
              icon={rightIcon}
              size={size === 'small' ? 'xs' : size === 'large' ? 'md' : 'sm'}
              variant="default"
            />
          )}
        </div>
      )}
    </>
  );

  const item = (
    <div className={containerClasses} onClick={handleClick}>
      {renderLeftContent()}
      {renderContent()}
    </div>
  );

  if (withAnimation) {
    return (
      <motion.div
        variants={listItemVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
      >
        {href && !isDisabled ? (
          <a href={href} className="block no-underline text-inherit">
            {item}
          </a>
        ) : (
          item
        )}
      </motion.div>
    );
  }

  if (href && !isDisabled) {
    return (
      <a href={href} className="block no-underline text-inherit">
        {item}
      </a>
    );
  }

  return item;
};

export default ListItem;
