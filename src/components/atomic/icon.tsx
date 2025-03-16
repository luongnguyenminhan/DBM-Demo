'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'custom';
export type IconVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'light' | 'dark';

export interface IconProps {
    icon: IconDefinition;
    size?: IconSize;
    variant?: IconVariant;
    customSize?: string;
    className?: string;
    customClassName?: string;
    withAnimation?: boolean;
    animationVariant?: 'pulse' | 'spin' | 'bounce' | 'shake';
    onClick?: () => void;
    isButton?: boolean;
    isDisabled?: boolean;
    tooltip?: string;
    customColor?: string;
    fixedWidth?: boolean;
    rotate?: number;
    flip?: 'horizontal' | 'vertical' | 'both';
    withRipple?: boolean;
    withBackground?: boolean;
    backgroundOpacity?: number;
    backgroundSize?: 'sm' | 'md' | 'lg';
    isRounded?: boolean;
    roundedSize?: 'sm' | 'md' | 'lg' | 'full';
}

const Icon: React.FC<IconProps> = ({
    icon,
    size = 'md',
    variant = 'default',
    customSize,
    className,
    customClassName,
    withAnimation = false,
    animationVariant = 'pulse',
    onClick,
    isButton = false,
    isDisabled = false,
    tooltip,
    customColor,
    fixedWidth = false,
    rotate,
    flip,
    withRipple = false,
    withBackground = false,
    backgroundOpacity = 0.1,
    backgroundSize = 'md',
    isRounded = true,
    roundedSize = 'full',
}) => {
    // Size classes
    const sizeClasses = {
        xs: 'w-3 h-3',
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
        xl: 'w-8 h-8',
        '2xl': 'w-10 h-10',
        custom: customSize || 'w-5 h-5',
    };

    // Variant classes (colors)
    const variantClasses = {
        default: 'text-[var(--text-primary)]',
        primary: 'text-[var(--color-primary)]',
        secondary: 'text-[var(--color-secondary)]',
        success: 'text-[var(--color-success)]',
        warning: 'text-[var(--color-warning)]',
        error: 'text-[var(--color-error)]',
        info: 'text-[var(--color-info)]',
        light: 'text-white',
        dark: 'text-gray-900',
    };

    // Animation classes
    const animationClasses = {
        pulse: 'animate-pulse',
        spin: 'animate-spin',
        bounce: 'animate-bounce',
        shake: 'animate-shake', // You may need to define this in tailwind.config.js
    };

    // Background colors based on variant
    const backgroundColors = {
        default: 'bg-gray-200',
        primary: 'bg-[var(--color-primary)]',
        secondary: 'bg-[var(--color-secondary)]',
        success: 'bg-[var(--color-success)]',
        warning: 'bg-[var(--color-warning)]',
        error: 'bg-[var(--color-error)]',
        info: 'bg-[var(--color-info)]',
        light: 'bg-white',
        dark: 'bg-gray-900',
    };

    // Background size classes
    const backgroundSizeClasses = {
        sm: 'p-1',
        md: 'p-2',
        lg: 'p-3',
    };

    // Rounded corner classes
    const roundedClasses = {
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
    };

    // Container classes
    const containerClasses = classNames(
        'inline-flex items-center justify-center transition-all duration-200',
        {
            [sizeClasses[size]]: !withBackground, // Apply size directly to icon if no background
            'cursor-pointer hover:opacity-80': (isButton || onClick) && !isDisabled,
            'opacity-50 cursor-not-allowed': isDisabled,
            [animationClasses[animationVariant]]: animationVariant && withAnimation,
            [backgroundColors[variant]]: withBackground,
            [`bg-opacity-${backgroundOpacity * 100}`]: withBackground && variant !== 'light' && variant !== 'dark',
            [backgroundSizeClasses[backgroundSize]]: withBackground,
            [roundedClasses[roundedSize]]: isRounded && withBackground,
        },
        className,
        customClassName
    );

    // Custom styles
    const customStyles: React.CSSProperties = {
        color: customColor,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
    };

    if (flip) {
        switch (flip) {
            case 'horizontal':
                customStyles.transform = `${customStyles.transform || ''} scaleX(-1)`;
                break;
            case 'vertical':
                customStyles.transform = `${customStyles.transform || ''} scaleY(-1)`;
                break;
            case 'both':
                customStyles.transform = `${customStyles.transform || ''} scale(-1)`;
                break;
        }
    }

    // Animation variants for framer-motion
    const iconVariants = {
        hover: { scale: 1.1 },
        tap: { scale: 0.95 },
    };

    const handleClick = (e: React.MouseEvent) => {
        if (isDisabled) return;
        
        if (withRipple) {
            const button = e.currentTarget;
            const circle = document.createElement('span');
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.nativeEvent.offsetX - radius}px`;
            circle.style.top = `${e.nativeEvent.offsetY - radius}px`;
            circle.classList.add('ripple');

            const ripple = button.querySelector('.ripple');
            if (ripple) {
                ripple.remove();
            }

            button.appendChild(circle);

            setTimeout(() => {
                circle.remove();
            }, 600);
        }

        if (onClick) {
            onClick();
        }
    };

    // Icon color class - if background is used, we might want to adjust the icon color
    const iconColorClass = withBackground && variant !== 'default' ? 'text-white' : variantClasses[variant];

    const iconElement = (
        <FontAwesomeIcon
            icon={icon}
            fixedWidth={fixedWidth}
            className={!withBackground ? iconColorClass : undefined}
            style={{ 
                width: '100%', 
                height: '100%',
                ...(withBackground ? { color: variantClasses[variant] } : {})
            }}
        />
    );

    if ((onClick || isButton) && !isDisabled) {
        return (
            <motion.div
                className={containerClasses}
                onClick={handleClick}
                title={tooltip}
                style={customStyles}
                whileHover={withAnimation || withRipple ? "hover" : undefined}
                whileTap={withAnimation || withRipple ? "tap" : undefined}
                variants={iconVariants}
                role="button"
                tabIndex={!isDisabled ? 0 : undefined}
                aria-label={icon.iconName}
            >
                {iconElement}
            </motion.div>
        );
    }

    return (
        <div 
            className={containerClasses} 
            style={customStyles} 
            role="img" 
            title={tooltip}
            aria-label={icon.iconName}
        >
            {iconElement}
        </div>
    );
};

// Define a helper component for icon buttons
export const IconButton: React.FC<
    Omit<IconProps, 'isButton'> & {
        withRipple?: boolean;
        rounded?: boolean;
        padding?: 'none' | 'sm' | 'md' | 'lg';
        withBackground?: boolean;
        backgroundVariant?: IconVariant;
        withBorder?: boolean;
        borderVariant?: IconVariant;
    }
> = ({
    withRipple = true,
    rounded = true,
    padding = 'md',
    withBackground = false,
    backgroundVariant = 'default',
    withBorder = false,
    borderVariant = 'default',
    ...props
}) => {
    // Padding classes
    const paddingClasses = {
        none: 'p-0',
        sm: 'p-1',
        md: 'p-2',
        lg: 'p-3',
    };

    // Background classes
    const backgroundClasses = {
        default: 'bg-gray-100 hover:bg-gray-200',
        primary: 'bg-[var(--color-primary-light)] hover:bg-[var(--color-primary)]',
        secondary: 'bg-[var(--color-secondary-light)] hover:bg-[var(--color-secondary)]',
        success: 'bg-green-100 hover:bg-green-200',
        warning: 'bg-yellow-100 hover:bg-yellow-200',
        error: 'bg-red-100 hover:bg-red-200',
        info: 'bg-blue-100 hover:bg-blue-200',
        light: 'bg-white hover:bg-gray-50',
        dark: 'bg-gray-800 hover:bg-gray-700',
    };

    // Border classes
    const borderClasses = {
        default: 'border border-gray-300',
        primary: 'border border-[var(--color-primary)]',
        secondary: 'border border-[var(--color-secondary)]',
        success: 'border border-[var(--color-success)]',
        warning: 'border border-[var(--color-warning)]',
        error: 'border border-[var(--color-error)]',
        info: 'border border-[var(--color-info)]',
        light: 'border border-white',
        dark: 'border border-gray-900',
    };

    const buttonClasses = classNames(
        'transition-all duration-200 inline-flex items-center justify-center',
        paddingClasses[padding],
        {
            'rounded-full': rounded,
            'rounded-md': !rounded,
            [backgroundClasses[backgroundVariant]]: withBackground,
            [borderClasses[borderVariant]]: withBorder,
        }
    );

    // Handler for ripple effect
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (props.isDisabled || !withRipple) return;
        
        if (withRipple) {
            const button = e.currentTarget;
            const circle = document.createElement('span');
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
            circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
            circle.classList.add('ripple');

            const ripple = button.querySelector('.ripple');
            if (ripple) {
                ripple.remove();
            }

            button.appendChild(circle);
            
            setTimeout(() => {
                circle.remove();
            }, 600);
        }
        
        if (props.onClick) {
            props.onClick();
        }
    };

    return (
        <div className={buttonClasses} onClick={handleClick}>
            <Icon {...props} isButton={true} withRipple={withRipple} />
        </div>
    );
};

export default Icon;
