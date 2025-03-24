'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { 
    faBars, 
    faTimes, 
    faBell,
    faSignOutAlt,
    faUserCircle,
    faCog,
    faQuestionCircle,
    IconDefinition
} from '@fortawesome/free-solid-svg-icons';

import Button from '../atomic/button';
import Avatar from '../atomic/avatar';
import Typography from '../atomic/typo';
import { IconButton } from '../atomic/icon';
import DropdownMenu from '../molecules/dropdown';
import SearchBar from '../molecules/searchBar';
import Badge from '../atomic/badge';
import Image from 'next/image';

export interface NavItem {
    label: string;
    href: string;
    isActive?: boolean;
    icon?: IconDefinition;
}

export interface HeaderProps {
    logo?: React.ReactNode;
    logoText?: string;
    navItems?: NavItem[];
    isLoggedIn?: boolean;
    user?: {
        name?: string;
        avatar?: string;
        role?: string;
    };
    onLogout?: () => void;
    onMenuToggle?: () => void;
    hideMenu?: boolean;
    actions?: React.ReactNode;
    variant?: 'default' | 'transparent' | 'colored';
    position?: 'static' | 'sticky' | 'fixed';
    className?: string;
    logoHref?: string;
    showMobileMenu?: boolean;
    logoImageSrc?: string;
    // PageHeader props
    title?: string;
    subtitle?: string;
    withSearch?: boolean;
    searchPlaceholder?: string;
    onSearch?: (value: string) => void;
    pageVariant?: 'default' | 'compact' | 'full';
    size?: 'sm' | 'md' | 'lg';
    withAnimation?: boolean;
    customClassName?: string;
    withBorder?: boolean;
    withBackground?: boolean;
    withShadow?: boolean;
    notificationCount?: number;
    onNotificationClick?: () => void;
    onUserClick?: () => void;
    headerIcon?: IconDefinition;
    sticky?: boolean;
}

const Header: React.FC<HeaderProps> = ({
    logo,
    logoText = 'ENTERVIU',
    navItems = [],
    isLoggedIn = false,
    user,
    onLogout,
    onMenuToggle,
    hideMenu = false,
    actions,
    variant = 'default',
    position = 'sticky',
    className = '',
    logoHref = '/',
    logoImageSrc,
    // PageHeader props
    title,
    subtitle,
    withSearch = false,
    searchPlaceholder = 'Search...',
    onSearch,
    pageVariant = 'default',
    size = 'md',
    withAnimation = false,
    customClassName,
    withBorder = true,
    withBackground = true,
    withShadow = false,
    notificationCount = 0,
    onNotificationClick,
    onUserClick,
    sticky = true,
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (onMenuToggle) onMenuToggle();
    };

    // Determine navigation item active state based on current path
    const getNavItems = () => {
        return navItems.map(item => ({
            ...item,
            isActive: item.isActive !== undefined ? 
                item.isActive : 
                pathname === item.href || pathname?.startsWith(`${item.href}/`)
        }));
    };

    const updatedNavItems = getNavItems();

    // Header background and styles based on variant
    const headerStyles = {
        default: 'bg-white border-b border-gray-200',
        transparent: 'bg-transparent',
        colored: 'bg-[var(--color-primary)] text-white',
    };

    // User dropdown items
    const userDropdownItems = [
        {
            key: 'profile',
            label: 'Thông tin cá nhân',
            icon: faUserCircle as IconDefinition,
            onClick: () => { console.log('Profile clicked') }
        },
        {
            key: 'settings',
            label: 'Cài đặt',
            icon: faCog as IconDefinition,
            onClick: () => { console.log('Settings clicked') }
        },
        {
            key: 'help',
            label: 'Trợ giúp',
            icon: faQuestionCircle as IconDefinition,
            onClick: () => { console.log('Help clicked') }
        },
        {
            key: 'divider',
            divider: true,
            label: '' // Add a label, even if it's an empty string for dividers
        },
        {
            key: 'logout',
            label: 'Đăng xuất',
            icon: faSignOutAlt as IconDefinition,
            onClick: onLogout
        }
    ];

    // Size classes from PageHeader
    const sizeClasses = {
        sm: 'py-3',
        md: 'py-4',
        lg: 'py-6',
    };

    // Animation variants for PageHeader
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

    // PageHeader content rendering
    const renderPageHeaderContent = () => {
        if (!title) return null;

        switch (pageVariant) {
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
                            {actions && <div className="hidden md:flex">{actions}</div>}
                            {renderPageHeaderUserSection()}
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
                                {renderPageHeaderUserSection()}
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
                                {renderPageHeaderUserSection()}
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

    // Page header user section
    const renderPageHeaderUserSection = () => {
        if (!user?.avatar && !notificationCount && !onMenuToggle) return null;

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
                {user?.avatar && (
                    <div className="cursor-pointer" onClick={onUserClick}>
                        <Avatar
                            src={user.avatar}
                            name={user.name || ''}
                            size="sm"
                            withBorder
                        />
                    </div>
                )}

                {/* Mobile menu toggle */}
                {hideMenu === false && onMenuToggle && (
                    <IconButton
                        icon={isMobileMenuOpen ? faTimes : faBars}
                        variant="default"
                        size="sm"
                        onClick={handleMobileMenuToggle}
                        className="md:hidden"
                    />
                )}
            </div>
        );
    };

    // Combine PageHeader with regular Header
    const renderMainContent = () => {
        // If title is provided, render PageHeader instead of normal header content
        if (title) {
            const pageHeaderClasses = classNames(
                'px-4 md:px-6',
                sizeClasses[size],
                {
                    'border-b border-gray-200': withBorder,
                    'bg-white': withBackground,
                    'shadow-sm': withShadow,
                },
                className,
                customClassName
            );

            const content = renderPageHeaderContent();

            if (withAnimation) {
                return (
                    <motion.div
                        className={pageHeaderClasses}
                        initial="hidden"
                        animate="visible"
                        variants={headerVariants}
                    >
                        {content}
                    </motion.div>
                );
            }

            return <div className={pageHeaderClasses}>{content}</div>;
        }

        // Otherwise render the normal header content
        return (
            <>
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <Link href={logoHref} className="flex items-center">
                            {logoImageSrc ? (
                                <Image src={logoImageSrc} alt={logoText} className="h-8 w-auto mr-2" />
                            ) : logo ? (
                                logo
                            ) : (
                                <Typography.Heading level="h1" size="xl" className="font-bold mr-10">
                                    {logoText}
                                </Typography.Heading>
                            )}
                        </Link>

                        {/* Desktop Navigation */}
                        {!hideMenu && (
                            <nav className="hidden md:block ml-6">
                                <ul className="flex space-x-6">
                                    {updatedNavItems.map((item) => (
                                        <li key={item.href}>
                                            <Link 
                                                href={item.href} 
                                                className={`py-2 text-base transition-colors duration-200 ${
                                                    item.isActive 
                                                        ? variant === 'colored' 
                                                            ? 'text-white font-semibold' 
                                                            : 'text-[var(--color-primary)] font-semibold'
                                                        : variant === 'colored'
                                                            ? 'text-white/80 hover:text-white'
                                                            : 'text-gray-600 hover:text-gray-900'
                                                }`}
                                            >
                                                {item.icon && (
                                                    <span className="mr-2">
                                                        <FontAwesomeIcon icon={item.icon} />
                                                    </span>
                                                )}
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        )}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">
                        {actions && <div className="hidden md:flex">{actions}</div>}

                        {/* User Menu or Login Button */}
                        {isLoggedIn ? (
                            <div className="flex items-center">
                                <div className="hidden md:block mr-4">
                                    <IconButton 
                                        icon={faBell}
                                        variant={variant === 'colored' ? 'default' : 'primary'}
                                        className=""
                                        withBackground={variant !== 'colored'}
                                        customColor={variant === 'colored' ? 'white' : undefined}
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
                                <DropdownMenu
                                    items={userDropdownItems}
                                    placement="bottom"
                                    closeOnSelect={true}
                                    trigger={
                                        <div className="flex items-center cursor-pointer" onClick={onUserClick}>
                                            <Avatar 
                                                src={user?.avatar}
                                                name={user?.name || 'User'}
                                                size="sm"
                                                withBorder
                                                className="mr-2"
                                            />
                                            <span className={`hidden md:block ${variant === 'colored' ? 'text-white' : ''}`}>
                                                {user?.name || 'User'}
                                            </span>
                                        </div>
                                    }
                                />
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link href="/auth/login" className={variant === 'colored' ? 'text-white' : 'text-gray-600 hover:text-gray-900'}>
                                    Đăng nhập
                                </Link>
                                <Button variant="primary" size="small" href="/auth/register">
                                    Đăng ký
                                </Button>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        {!hideMenu && (
                            <div className="md:hidden">
                                <IconButton
                                    icon={isMobileMenuOpen ? faTimes : faBars}
                                    variant={variant === 'colored' ? 'default' : 'primary'}
                                    customColor={variant === 'colored' ? 'white' : undefined}
                                    onClick={handleMobileMenuToggle}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {!hideMenu && isMobileMenuOpen && (
                    <div className="md:hidden bg-white border-b border-gray-200">
                        <nav className="container mx-auto px-4 py-3">
                            <ul className="space-y-2">
                                {updatedNavItems.map((item) => (
                                    <li key={item.href}>
                                        <Link 
                                            href={item.href}
                                            className={`block py-2 ${item.isActive ? 'text-[var(--color-primary)] font-semibold' : 'text-gray-600'}`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.icon && (
                                                <span className="mr-2">
                                                    <FontAwesomeIcon icon={item.icon} />
                                                </span>
                                            )}
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                                {actions && <div className="pt-2">{actions}</div>}
                            </ul>
                        </nav>
                    </div>
                )}
            </>
        );
    };

    // Final header rendering
    return (
        <header 
            className={`${!title ? headerStyles[variant] : ''} ${position === 'sticky' || sticky ? 'sticky top-0' : position === 'fixed' ? 'fixed top-0 left-0 right-0' : ''} z-30 ${className}`}
        >
            {renderMainContent()}
        </header>
    );
};

export default Header;
