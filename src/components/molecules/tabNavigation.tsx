'use client';
import React from 'react';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import Typography from '../atomic/typo';
import Icon, { IconButton } from '../atomic/icon';
import Spinner from '../atomic/spinner';
import { useTabNavigation } from '@/hooks/use-tabNavigation';

export type TabVariant = 'default' | 'primary' | 'secondary' | 'outline' | 'minimal';
export type TabSize = 'small' | 'medium' | 'large';
export type TabAlignment = 'left' | 'center' | 'right' | 'stretch';
export type TabsOrientation = 'horizontal' | 'vertical';
export type TabBorderRadius = 'none' | 'small' | 'medium' | 'large' | 'full';

export interface TabItem {
    key: string;
    label: string | React.ReactNode;
    icon?: IconDefinition;
    content?: React.ReactNode;
    disabled?: boolean;
    tooltip?: string;
    badge?: number | string;
    badgeVariant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
    closable?: boolean;
}

export interface TabNavigationProps {
    tabs: TabItem[];
    defaultActiveKey?: string;
    activeKey?: string;
    onChange?: (activeKey: string) => void;
    variant?: TabVariant;
    size?: TabSize;
    alignment?: TabAlignment;
    orientation?: TabsOrientation;
    isFullWidth?: boolean;
    withAnimation?: boolean;
    animationType?: 'fade' | 'slide' | 'none';
    withIcon?: boolean;
    iconPosition?: 'left' | 'right' | 'top';
    withBorder?: boolean;
    withGradientIndicator?: boolean;
    withShadow?: boolean;
    customClassName?: string;
    tabClassName?: string;
    contentClassName?: string;
    renderTabBar?: (props: TabBarProps) => React.ReactNode;
    centered?: boolean;
    tabBarExtraContent?: React.ReactNode;
    tabBarGutter?: number;
    lazyLoad?: boolean;
    showContent?: boolean;
    isLoading?: boolean;
    loadingText?: string;
    onTabClose?: (key: string) => void;
    withScrollIndicators?: boolean;
    allowAddTab?: boolean;
    onAddTab?: () => void;
    borderRadius?: TabBorderRadius;
}

interface TabBarProps {
    activeKey: string;
    onTabClick: (key: string) => void;
    tabs: TabItem[];
    variant: TabVariant;
    size: TabSize;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
    tabs = [],
    defaultActiveKey,
    activeKey: propActiveKey,
    onChange,
    variant = 'default',
    size = 'medium',
    alignment = 'left',
    orientation = 'horizontal',
    isFullWidth = false,
    withAnimation = true,
    animationType = 'fade',
    withIcon = false,
    iconPosition = 'left',
    withBorder = true,
    withGradientIndicator = false,
    withShadow = false,
    customClassName = '',
    tabClassName = '',
    contentClassName = '',
    renderTabBar,
    centered = false,
    tabBarExtraContent,
    tabBarGutter,
    lazyLoad = true,
    showContent = true,
    isLoading = false,
    loadingText = 'Loading...',
    onTabClose,
    withScrollIndicators = false,
    allowAddTab = false,
    onAddTab,
    borderRadius = 'none'
}) => {
    const {
        activeKey,
        scrollPosition,
        tabsRef,
        tabsContainerRef,
        handleTabClick,
        handleTabClose: baseHandleTabClose,
        scrollToTab
    } = useTabNavigation({
        tabs,
        defaultActiveKey,
        activeKey: propActiveKey,
        onChange,
        lazyLoad,
        withScrollIndicators
    });

    const handleTabClose = (e: React.MouseEvent, key: string) => {
        baseHandleTabClose(e);
        onTabClose?.(key);
    };

    const sizeClasses = {
        small: 'text-xs py-1 px-2',
        medium: 'text-sm py-2 px-4',
        large: 'text-base py-3 px-6',
    };

    const directionalBorderRadiusClasses = {
        horizontal: {
            'none': '',
            'small': 'rounded-t-sm',
            'medium': 'rounded-t-md',
            'large': 'rounded-t-lg',
            'full': 'rounded-t-full',
        },
        vertical: {
            'none': '',
            'small': 'rounded-l-sm',
            'medium': 'rounded-l-md',
            'large': 'rounded-l-lg',
            'full': 'rounded-l-full',
        },
    };

    const containerClasses = classNames(
        'tabs-container',
        {
            'flex flex-col': orientation === 'horizontal',
            'flex flex-row': orientation === 'vertical',
            'w-full': isFullWidth,
        },
        customClassName
    );

    const tabBarClasses = classNames(
        'tabs-bar',
        'relative flex',
        {
            'flex-row': orientation === 'horizontal',
            'flex-col': orientation === 'vertical',
            'w-full': isFullWidth || orientation === 'horizontal',
            'justify-center': centered && orientation === 'horizontal',
            'justify-start': !centered && orientation === 'horizontal',
            'shadow-md': withShadow,
            'border-b border-gray-200': withBorder && orientation === 'horizontal',
            'border-r border-gray-200': withBorder && orientation === 'vertical',
            'overflow-x-auto scrollbar-hide': withScrollIndicators && orientation === 'horizontal',
            'overflow-y-auto scrollbar-hide': withScrollIndicators && orientation === 'vertical',
        }
    );

    const getTabClasses = (tab: TabItem) => {
        return classNames(
            'tab-item',
            'relative flex items-center transition-all cursor-pointer',
            sizeClasses[size],
            directionalBorderRadiusClasses[orientation][borderRadius],
            {
                'opacity-50 cursor-not-allowed': tab.disabled,
                'flex-col': iconPosition === 'top' && withIcon,
                'justify-center': iconPosition === 'top' || centered,
                'flex-1': alignment === 'stretch',
                'mx-1': tabBarGutter === undefined && orientation === 'horizontal',
                'my-1': tabBarGutter === undefined && orientation === 'vertical',
                [`mx-${tabBarGutter}`]: tabBarGutter !== undefined && orientation === 'horizontal',
                [`my-${tabBarGutter}`]: tabBarGutter !== undefined && orientation === 'vertical',
            },
            tabClassName
        );
    };

    const getActiveTabClasses = (isActive: boolean, variant: TabVariant) => {
        if (!isActive) return '';
        
        const borderClass = orientation === 'horizontal' ? 'border-b-2' : 'border-r-2';
        
        switch (variant) {
            case 'primary':
                return 'bg-[var(--color-primary)] !text-white';
            case 'secondary':
                return 'bg-[var(--color-secondary)] !text-white';
            case 'outline':
                return `border-[var(--color-primary)] ${borderClass} !text-[var(--color-primary)]`;
            case 'minimal':
                return '!text-[var(--color-primary)]';
            default:
                return withGradientIndicator 
                    ? '!text-[var(--color-primary)]' 
                    : `border-[var(--color-primary)] ${borderClass} !text-[var(--color-primary)]`;
        }
    };

    const contentAnimationVariants = {
        fade: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
        },
        slide: {
            hidden: { opacity: 0, x: 20 },
            visible: { opacity: 1, x: 0 },
        },
        none: {
            hidden: {},
            visible: {},
        },
    };

    const renderCustomTabBar = () => {
        if (renderTabBar) {
            const props: TabBarProps = {
                activeKey,
                onTabClick: handleTabClick,
                tabs,
                variant,
                size,
            };
            return renderTabBar(props);
        }
        return null;
    };

    const renderTabLabel = (tab: TabItem) => {
        const hasIcon = withIcon && tab.icon;
        
        const iconElement = hasIcon && (
            <Icon 
                icon={tab.icon!} 
                size={size === 'small' ? 'xs' : size === 'large' ? 'lg' : 'sm'}
                className={iconPosition === 'left' ? 'mr-2' : iconPosition === 'right' ? 'ml-2' : 'mb-1'}
            />
        );
        
        const labelElement = typeof tab.label === 'string' ? (
            <Typography.Text 
                size={size === 'small' ? 'xs' : size === 'large' ? 'lg' : 'sm'}
                className="whitespace-nowrap"
            >
                {tab.label}
            </Typography.Text>
        ) : tab.label;

        const badgeElement = tab.badge !== undefined && (
            <span className={`text-xs px-1.5 py-0.5 rounded-full ml-2 bg-${tab.badgeVariant || 'primary'}-500`}>
                {tab.badge}
            </span>
        );

        const closeButton = tab.closable && onTabClose && (
            <button
                className="ml-2 text-xs text-gray-500 hover:text-gray-700"
                onClick={(e) => handleTabClose(e, tab.key)}
                aria-label={`Close ${typeof tab.label === 'string' ? tab.label : 'tab'}`}
            >
                ×
            </button>
        );

        return (
            <>
                {iconPosition === 'left' && iconElement}
                {iconPosition === 'top' && iconElement}
                {labelElement}
                {iconPosition === 'right' && iconElement}
                {badgeElement}
                {closeButton}
            </>
        );
    };

    const renderActiveIndicator = () => {
        if (variant === 'primary' || variant === 'secondary') return null;
        
        if (withGradientIndicator) {
            const indicatorClass = orientation === 'horizontal' 
                ? 'bottom-0 left-0 w-full h-1 rounded-t' 
                : 'right-0 top-0 h-full w-1 rounded-r';
            
            const gradientClass = orientation === 'horizontal' 
                ? 'bg-gradient-to-r from-pink-500 to-indigo-500' 
                : 'bg-gradient-to-b from-pink-500 to-indigo-500';
            
            return (
                <motion.div
                    className={classNames('absolute', indicatorClass, gradientClass)}
                    layoutId="activeTabIndicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
            );
        }
        
        return null;
    };

    const renderTabContent = () => {
        if (!showContent) return null;
        
        if (isLoading) {
            return (
                <div className="flex items-center justify-center p-6">
                    <Spinner size="md" variant="primary" text={loadingText} />
                </div>
            );
        }

        const currentTab = tabs.find(tab => tab.key === activeKey);
        if (!currentTab || !currentTab.content) return null;

        if (!withAnimation) {
            return (
                <div className={classNames('tab-content', 'py-4', contentClassName)}>
                    {currentTab.content}
                </div>
            );
        }

        return (
            <div className={classNames('tab-content', 'py-4', contentClassName)}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeKey}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={contentAnimationVariants[animationType]}
                        transition={{ duration: 0.2 }}
                    >
                        {currentTab.content}
                    </motion.div>
                </AnimatePresence>
            </div>
        );
    };

    const renderScrollButtons = () => {
        return (
            <>
                {withScrollIndicators && scrollPosition.left && (
                    <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center">
                        <IconButton 
                            icon={faChevronLeft}
                            onClick={() => scrollToTab('left')}
                            variant="default"
                            withBackground
                            rounded
                        />
                    </div>
                )}
                
                {withScrollIndicators && scrollPosition.right && (
                    <div className="absolute right-0 top-0 bottom-0 z-10 flex items-center">
                        <IconButton 
                            icon={faChevronRight}
                            onClick={() => scrollToTab('right')}
                            variant="default"
                            withBackground
                            rounded
                        />
                    </div>
                )}
            </>
        );
    };

    const renderAddButton = () => {
        if (!allowAddTab) return null;
        
        return (
            <div 
                className={classNames(
                    'flex items-center cursor-pointer px-2',
                    {
                        'py-1': size === 'small',
                        'py-2': size === 'medium',
                        'py-3': size === 'large',
                    }
                )}
                onClick={onAddTab}
                title="Add new tab"
            >
                <IconButton 
                    icon={faPlus}
                    size="sm" 
                    variant="default"
                />
            </div>
        );
    };

    const renderTabs = () => {
        return (
            <div className="relative">
                {renderScrollButtons()}
                <div 
                    className={tabBarClasses}
                    ref={tabsRef}
                >
                    <div 
                        className={classNames(
                            'flex', 
                            orientation === 'horizontal' ? 'flex-row' : 'flex-col', 
                            isFullWidth ? 'w-full' : ''
                        )}
                        ref={tabsContainerRef}
                    >
                        {tabs.map(tab => (
                            <div
                                key={tab.key}
                                className={classNames(
                                    getTabClasses(tab),
                                    getActiveTabClasses(activeKey === tab.key, variant),
                                    {
                                        'hover:bg-gray-100': variant !== 'primary' && variant !== 'secondary' && !tab.disabled,
                                    }
                                )}
                                onClick={() => !tab.disabled && handleTabClick(tab.key)}
                                title={tab.tooltip}
                                role="tab"
                                aria-selected={activeKey === tab.key}
                                tabIndex={tab.disabled ? -1 : 0}
                            >
                                {renderTabLabel(tab)}
                                {activeKey === tab.key && renderActiveIndicator()}
                            </div>
                        ))}
                        
                        {renderAddButton()}
                    </div>
                    
                    {tabBarExtraContent && (
                        <div className="ml-auto flex items-center">
                            {tabBarExtraContent}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className={containerClasses}>
            {renderCustomTabBar() || renderTabs()}
            {renderTabContent()}
        </div>
    );
};

export default TabNavigation;