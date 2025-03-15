'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  faChevronDown, 
  faChevronLeft, 
  faChevronRight, 
  faTimes,
  faStar, // Import the star icon
  IconDefinition, 
  faCrown
} from '@fortawesome/free-solid-svg-icons';
import Typography from '../atomic/typo';
import Icon, { IconButton } from '../atomic/icon';
import Avatar from '../atomic/avatar';
import Tooltip from '../atomic/tooltip';

export interface SidebarItemProps {
  key: string;
  label: string;
  href?: string;
  icon?: IconDefinition;
  children?: SidebarItemProps[];
  badge?: string | number;
  onClick?: () => void;
}

export interface SidebarProps {
  items: SidebarItemProps[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  isCollapsible?: boolean;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  variant?: 'light' | 'dark' | 'primary';
  width?: string;
  collapsedWidth?: string;
  className?: string;
  overlayMode?: boolean;
  activeItemKey?: string;
  onActiveItemChange?: (key: string) => void;
  userProfile?: {
    name: string;
    role?: string;
    avatar?: string;
  };
  logoText?: string;
  logoImageSrc?: string;
  logoHref?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  items,
  header,
  footer,
  isOpen = true,
  onToggle,
  isCollapsible = true,
  collapsed = false,
  onCollapsedChange,
  variant = 'light',
  width = '240px',
  collapsedWidth = '64px',
  className = '',
  overlayMode = false,
  activeItemKey,
  onActiveItemChange,
  userProfile,
  logoText,
  logoImageSrc,
  logoHref = '/',
}) => {
  const [expandedItems, setExpandedItems] = useState<{[key: string]: boolean}>({});
  const pathname = usePathname();
  
  const isItemActive = (item: SidebarItemProps): boolean => {
    if (activeItemKey) {
      return item.key === activeItemKey;
    }
    
    const isCurrentPath = item.href === pathname;
    const isParentOfCurrentPath = item.href && pathname ? pathname.startsWith(`${item.href}/`) : false;
    
    const hasActiveChild = item.children?.some(child => isItemActive(child));
    
    return isCurrentPath || isParentOfCurrentPath || !!hasActiveChild;
  };

  // Mark and expand items that contain the active path
  React.useEffect(() => {
    if (isOpen && !collapsed) {
      const newExpandedItems = {...expandedItems};
      
      const checkAndExpandParent = (items: SidebarItemProps[]) => {
        items.forEach(item => {
          if (item.children) {
            if (item.children.some(child => 
              isItemActive(child) || 
              (child.children && checkIfChildrenActive(child.children))
            )) {
              newExpandedItems[item.key] = true;
            }
            checkAndExpandParent(item.children);
          }
        });
      };
      
      const checkIfChildrenActive = (children: SidebarItemProps[]): boolean => {
        return children.some(child => isItemActive(child) || 
          (child.children && checkIfChildrenActive(child.children)));
      };
      
      checkAndExpandParent(items);
      setExpandedItems(newExpandedItems);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, isOpen, collapsed]);

  const toggleItem = (key: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleItemClick = (item: SidebarItemProps) => {
    if (item.onClick) {
      item.onClick();
    }
    
    if (item.children && item.children.length > 0) {
      toggleItem(item.key);
    } else if (onActiveItemChange) {
      onActiveItemChange(item.key);
    }
  };

  const toggleCollapsed = () => {
    if (onCollapsedChange) {
      onCollapsedChange(!collapsed);
    }
  };

  // Styles based on variant
  const variantStyles = {
    light: {
      background: 'bg-white',
      text: 'text-gray-800',
      activeItem: 'bg-[var(--color-primary-light)] text-[var(--color-primary)]',
      hoverItem: 'hover:bg-gray-100',
      border: 'border-r border-gray-200',
    },
    dark: {
      background: 'bg-gray-900',
      text: 'text-gray-100',
      activeItem: 'bg-gray-700 text-white',
      hoverItem: 'hover:bg-gray-800',
      border: '',
    },
    primary: {
      background: 'bg-[var(--color-primary)]',
      text: 'text-white',
      activeItem: 'bg-[rgba(255,255,255,0.15)] text-white',
      hoverItem: 'hover:bg-[rgba(255,255,255,0.1)]',
      border: '',
    },
  };

  // Animation variants
  const sidebarVariants = {
    open: { width: width, transition: { duration: 0.2 } },
    collapsed: { width: collapsedWidth, transition: { duration: 0.2 } },
  };
  
  const overlayVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const renderSidebarItems = (items: SidebarItemProps[], level = 0) => {
    return items.map(item => {
      const isActive = isItemActive(item);
      const isExpanded = expandedItems[item.key];
      const hasChildren = item.children && item.children.length > 0;
      
      const itemClasses = `flex items-center p-2 rounded-md my-1 cursor-pointer transition-all
        ${isActive ? variantStyles[variant].activeItem : `${variantStyles[variant].hoverItem}`}
        ${collapsed && level === 0 ? 'justify-center' : 'justify-between'}
        ${level > 0 ? 'pl-' + (level * 4 + 2) : ''}
      `;

      return (
        <React.Fragment key={item.key}>
          {item.href && !hasChildren ? (
            <Link href={item.href} className={itemClasses} onClick={() => handleItemClick(item)}>
              <div className="flex items-center">
                {item.icon && (
                  <Icon
                    icon={item.icon}
                    size={collapsed ? 'md' : 'sm'}
                    className={`${collapsed && level === 0 ? '' : 'mr-3'}`}
                  />
                )}
                {(!collapsed || level > 0) && (
                  <Typography.Text size="sm" className={level === 0 ? 'font-medium' : ''}>
                    {item.label}
                  </Typography.Text>
                )}
              </div>
              
              {item.badge && !collapsed && (
                <span className="px-2 py-0.5 text-xs bg-[var(--color-primary-light)] text-[var(--color-primary)] rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ) : (
            <>
              <div className={itemClasses} onClick={() => handleItemClick(item)}>
                <div className="flex items-center">
                  {item.icon && (
                    <Icon
                      icon={item.icon}
                      size={collapsed ? 'md' : 'sm'}
                      className={`${collapsed && level === 0 ? '' : 'mr-3'}`}
                    />
                  )}
                  {(!collapsed || level > 0) && (
                    <Typography.Text size="sm" className={level === 0 ? 'font-medium' : ''}>
                      {item.label}
                    </Typography.Text>
                  )}
                </div>
                
                <div className="flex items-center">
                  {item.badge && !collapsed && (
                    <span className="px-1.5 py-0.5 text-xs bg-[var(--color-primary-light)] text-[var(--color-primary)] rounded-full mr-1.5">
                      {item.badge}
                    </span>
                  )}
                  
                  {hasChildren && !collapsed && (
                    <Icon
                      icon={isExpanded ? faChevronDown : faChevronRight}
                      size="xs"
                    />
                  )}
                </div>
              </div>
              
              {/* Collapsed children will not be rendered */}
              {hasChildren && !collapsed && (
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      {renderSidebarItems(item.children as SidebarItemProps[], level + 1)}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </>
          )}
        </React.Fragment>
      );
    });
  };

  const renderLogo = () => {
    if (!logoText && !logoImageSrc) return null;
    
    return (
      <Link href={logoHref} className="flex items-center justify-center p-4">
        {logoImageSrc ? (
          <motion.div 
            className={`relative flex items-center justify-center ${!collapsed ? 'w-[120px] h-[120px]' : 'w-[32px] h-[32px]'}`}
            animate={{ 
              width: collapsed ? 32 : 120,
              height: collapsed ? 32 : 120,
            }}
            transition={{ duration: 0.2 }}
          >
            <Image 
              src={logoImageSrc} 
              alt={logoText || 'Logo'} 
              width={collapsed ? 32 : 120}
              height={collapsed ? 32 : 120}
              className="object-contain"
              priority
            />
          </motion.div>
        ) : (
          <Typography.Heading level="h1" size="lg" className="font-bold">
            {collapsed ? logoText?.charAt(0) : logoText}
          </Typography.Heading>
        )}
      </Link>
    );
  };

  const renderUserProfile = () => {
    if (!userProfile) return null;

    return (
      <div className={`p-4 border-t ${variantStyles[variant].border === '' ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center">
          <Avatar
            src={userProfile.avatar}
            name={userProfile.name}
            size={collapsed ? "sm" : "md"}
          />
          
          {!collapsed && (
            <div className="ml-2 overflow-hidden">
              <Typography.Text weight="semibold" truncate>
                {userProfile.name}
              </Typography.Text>
              {userProfile.role && (
                <div className="flex items-center">
                  {userProfile.role === "free" ? (
                    <Tooltip content={"Người dùng miễn phí"}>
                      <Icon icon={faStar} size="xs" className="ml-1 text-yellow-500" />
                    </Tooltip>
                  ) : (
                    userProfile.role === "pro" ? (
                      <Tooltip content={"Người dùng Pro"}>
                        <Icon icon={faCrown} size="sm" className="ml-1 text-yellow-500" />
                      </Tooltip>
                    ) : null
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const sidebarContent = (
    
    <motion.div
      className={`h-screen flex flex-col ${variantStyles[variant].background} ${variantStyles[variant].text} ${variantStyles[variant].border} ${className}`}
      variants={sidebarVariants}
      animate={collapsed ? "collapsed" : "open"}
      style={{ width: isOpen ? (collapsed ? collapsedWidth : width) : 0 }}
    >
      {/* Sidebar Header */}
      <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-center'}`}>
        {renderLogo()}
        
        {isCollapsible && !collapsed && (
          <IconButton
            icon={faTimes}
            onClick={onToggle}
            className="md:hidden m-2"
            size="sm"
          />
        )}
      </div>
      
      {/* Custom Header Component */}
      {header && <div className={collapsed ? "px-2" : "px-4"}>{header}</div>}
      {/* Collapse Toggle Button */}
      {isCollapsible && (
      <div className="p-2 border-t border-gray-200 flex justify-center">
        <IconButton
        icon={collapsed ? faChevronRight : faChevronLeft}
        onClick={toggleCollapsed}
        size="sm"
        variant={variant === 'dark' || variant === 'primary' ? 'default' : 'primary'}
        customColor={variant === 'dark' || variant === 'primary' ? 'white' : undefined}
        />
      </div>
      )}

      {/* Sidebar Items */}
      <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
      {renderSidebarItems(items)}
      </div>

      {/* User Profile */}
      {renderUserProfile()}

      {/* Custom Footer Component */}
      {footer && <div className={collapsed ? "p-2" : "p-4"}>{footer}</div>}
      
      
    </motion.div>
  );

  // For overlay mode (mobile)
  if (overlayMode) {
    return (
      <>
        {/* Dark overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={overlayVariants}
              onClick={onToggle}
            />
          )}
        </AnimatePresence>
        
        {/* Sidebar */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed left-0 top-0 z-50 h-screen"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {sidebarContent}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return sidebarContent;
};

export default Sidebar;
