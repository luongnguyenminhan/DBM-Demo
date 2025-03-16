'use client';

import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import {faBars, faBell, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Typography from '@/components/atomic/typo';
import Badge from '@/components/atomic/badge';
import SearchBar from '@/components/molecules/SearchBar';
import Avatar from '@/components/atomic/avatar';
import { IconButton } from '@/components/atomic/icon';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  withSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  actions?: React.ReactNode;
  variant?: 'default' | 'compact' | 'full';
  size?: 'sm' | 'md' | 'lg';
  withAnimation?: boolean;
  className?: string;
  customClassName?: string;
  withBorder?: boolean;
  withBackground?: boolean;
  withShadow?: boolean;
  userAvatar?: string;
  userName?: string;
  userRole?: string;
  notificationCount?: number;
  onNotificationClick?: () => void;
  onMenuToggle?: () => void;
  showMobileMenu?: boolean;
  icon?: IconDefinition;
  onUserClick?: () => void;
  sticky?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  withSearch = true,
  searchPlaceholder = 'Search...',
  onSearch,
  actions,
  variant = 'default',
  size = 'md',
  withAnimation = true,
  className,
  customClassName,
  withBorder = true,
  withBackground = true,
  withShadow = false,
  userAvatar,
  userName,
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  userRole,
  notificationCount = 0,
  onNotificationClick,
  onMenuToggle,
  showMobileMenu = false,
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  icon,
  onUserClick,
  sticky = true,
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'py-3',
    md: 'py-4',
    lg: 'py-6',
  };

  // Container classes
  const containerClasses = classNames(
    'px-4 md:px-6',
    sizeClasses[size],
    {
      'border-b border-gray-200': withBorder,
      'bg-white': withBackground,
      'shadow-sm': withShadow,
      'sticky top-0 z-10': sticky
    },
    className,
    customClassName
  );

  // Animation variants for header
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    }
  };


  // Render user section with avatar and notifications
  const renderUserSection = () => {
    if (!userAvatar && !notificationCount && !onMenuToggle) return null;

    return (
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        {onNotificationClick && (
          <div className="relative">
            <IconButton
              icon={faBell}
              variant="default"
              size="sm"
              onClick={onNotificationClick}
            />
            {notificationCount > 0 && (
              <Badge
                content={notificationCount > 9 ? '9+' : notificationCount}
                variant="error"
                size="xs"
                className="absolute -top-1 -right-1"
              />
            )}
          </div>
        )}

        {/* User avatar */}
        {userAvatar && (
          <div className="cursor-pointer" onClick={onUserClick}>
            <Avatar
              src={userAvatar}
              name={userName || ''}
              size="sm"
              withBorder
              withShadow={false}
            />
          </div>
        )}

        {/* Mobile menu toggle */}
        {showMobileMenu && onMenuToggle && (
          <IconButton
            icon={faBars}
            variant="default"
            size="sm"
            onClick={onMenuToggle}
            className="md:hidden"
          />
        )}
      </div>
    );
  };

  // Main header content based on variant
  const renderHeaderContent = () => {
    switch (variant) {
      case 'compact':
        return (
          <div className="w-full flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-3">
              <Typography.Heading level="h1" size="lg" weight="semibold">
                {title}
              </Typography.Heading>
            </div>
            
            <div className="flex items-center space-x-3">
              {withSearch && (
                <div className="hidden md:block w-64">
                  <SearchBar
                    placeholder={searchPlaceholder}
                    onSearch={onSearch}
                    size="small"
                  />
                </div>
              )}
              {actions}
              {renderUserSection()}
            </div>
          </div>
        );
      
      case 'full':
        return (
          <>
            <div className="w-full flex flex-wrap items-center justify-between mb-4">
              <div className="flex-1">
                <Typography.Heading level="h1" size="xl" weight="semibold" className="mb-1">
                  {title}
                </Typography.Heading>
                {subtitle && (
                  <Typography.Text variant="muted" size="base">
                    {subtitle}
                  </Typography.Text>
                )}
              </div>

              <div className="flex items-center space-x-3 mt-4 md:mt-0">
                {renderUserSection()}
              </div>
            </div>

            <div className="w-full flex flex-wrap items-center justify-between">
              {withSearch && (
                <div className="w-full md:w-96">
                  <SearchBar
                    placeholder={searchPlaceholder}
                    onSearch={onSearch}
                    size="medium"
                  />
                </div>
              )}
              
              <div className="flex items-center mt-3 md:mt-0">
                {actions}
              </div>
            </div>
          </>
        );
      
      case 'default':
      default:
        return (
          <>
            <div className="w-full flex flex-wrap items-center justify-between">
              <div>
                <Typography.Heading level="h1" size="xl" weight="semibold">
                  {title}
                </Typography.Heading>
                {subtitle && (
                  <Typography.Text variant="muted" size="base">
                    {subtitle}
                  </Typography.Text>
                )}
              </div>
              
              <div className="flex items-center space-x-3 mt-4 md:mt-0">
                {withSearch && (
                  <div className="hidden md:block w-64">
                    <SearchBar
                      placeholder={searchPlaceholder}
                      onSearch={onSearch}
                      size="small"
                    />
                  </div>
                )}
                {actions}
                {renderUserSection()}
              </div>
            </div>
            
            {withSearch && (
              <div className="md:hidden w-full mt-4">
                <SearchBar
                  placeholder={searchPlaceholder}
                  onSearch={onSearch}
                  size="small"
                />
              </div>
            )}
          </>
        );
    }
  };

  // Wrap with animation if enabled
  if (withAnimation) {
    return (
      <motion.header
        className={containerClasses}
        initial="hidden"
        animate="visible"
        variants={headerVariants}
      >
        {renderHeaderContent()}
      </motion.header>
    );
  }

  return (
    <header className={containerClasses}>
      {renderHeaderContent()}
    </header>
  );
};

export default PageHeader;
