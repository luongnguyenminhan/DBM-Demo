'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faTimes, 
  // faBell,
  faSignOutAlt,
  // faUserCircle,
  // faCog,
  // faQuestionCircle,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { logout } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';

import Button from '../atomic/button';
import Avatar from '../atomic/avatar';
import Typography from '../atomic/typo';
import { IconButton } from '../atomic/icon';
import DropdownMenu from '../molecules/dropdown';
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
}

const Header: React.FC<HeaderProps> = ({
  logo,
  logoText = 'Meobeo.ai',
  navItems = [],
  isLoggedIn: propsIsLoggedIn = false,
  user: propsUser,
  onLogout,
  onMenuToggle,
  hideMenu = false,
  actions,
  variant = 'default',
  position = 'sticky',
  className = '',
  logoHref = '/',
  logoImageSrc,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  
  // Get auth state from Redux
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  
  // Use either props or Redux state for authentication status
  const isLoggedIn = isAuthenticated || propsIsLoggedIn;
  
  // Merge user data from props and Redux state, with Redux taking precedence
  const userData = isAuthenticated ? user : propsUser;

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (onMenuToggle) onMenuToggle();
  };

  // Handle logout
  const handleLogout = () => {
    // Clear tokens
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    
    // Clear cookies
    document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    
    // Dispatch logout action
    dispatch(logout());
    
    // Call onLogout prop if provided
    if (onLogout) onLogout();
    
    // Redirect to login page
    router.push('/auth/login');
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
    // {
    //   key: 'profile',
    //   label: 'Thông tin cá nhân',
    //   icon: faUserCircle as IconDefinition,
    //   onClick: () => { console.log('Profile clicked') }
    // },
    // {
    //   key: 'settings',
    //   label: 'Cài đặt',
    //   icon: faCog as IconDefinition,
    //   onClick: () => { console.log('Settings clicked') }
    // },
    // {
    //   key: 'help',
    //   label: 'Trợ giúp',
    //   icon: faQuestionCircle as IconDefinition,
    //   onClick: () => { console.log('Help clicked') }
    // },
    // {
    //   key: 'divider',
    //   divider: true,
    //   label: '' // Add a label, even if it's an empty string for dividers
    // },
    {
      key: 'logout',
      label: 'Đăng xuất',
      icon: faSignOutAlt as IconDefinition,
      onClick: handleLogout
    }
  ];

  return (
    <header 
      className={`${headerStyles[variant]} ${position === 'sticky' ? 'sticky top-0' : position === 'fixed' ? 'fixed top-0 left-0 right-0' : ''} z-30 ${className}`}
    >
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
              {/* <div className="hidden md:block mr-4">
                <IconButton 
                  icon={faBell}
                  variant={variant === 'colored' ? 'default' : 'primary'}
                  className=""
                  withBackground={variant !== 'colored'}
                  customColor={variant === 'colored' ? 'white' : undefined}
                />
              </div> */}
              <DropdownMenu
                items={userDropdownItems}
                placement="bottom"
                closeOnSelect={true}
                trigger={
                  <div className="flex items-center cursor-pointer">
                    <Avatar 
                      name={userData?.name || 'User'}
                      size="sm"
                      withBorder
                      className="mr-2"
                    />
                    <span className={`hidden md:block ${variant === 'colored' ? 'text-white' : ''}`}>
                      {userData?.name || 'User'}
                    </span>
                  </div>
                }
              />
            </div>
          ) : (
            <div className="flex items-center">
              <Link href="/auth/login" className={variant === 'colored' ? 'text-white' : 'text-gray-600 hover:text-gray-900'}>
                Đăng nhập
              </Link>
              <div className="ml-4">
                <Button variant="primary" size="small" href="/auth/register">
                  Đăng ký
                </Button>
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          {!hideMenu && (
            <div className="md:hidden ml-4">
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
    </header>
  );
};

export default Header;
