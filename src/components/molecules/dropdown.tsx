'use client';

import React, { useState, useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import Button, { ButtonProps } from '../atomic/button';
import Typography from '../atomic/typo';
import Card from '../atomic/card';
import { useClickOutside } from '../../hooks/use-click-outside';

export type DropdownVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
export type DropdownSize = 'small' | 'medium' | 'large';
export type DropdownPlacement = 'top' | 'bottom' | 'left' | 'right';

export type DropdownItem = {
    key: string;
    divider: true;
} | {
    key: string;
    label: string | ReactNode;
    icon?: IconDefinition;
    disabled?: boolean;
    danger?: boolean;
    divider?: false;
    onClick?: () => void;
};

export interface DropdownMenuProps {
    items: DropdownItem[];
    trigger?: ReactNode;
    buttonProps?: Omit<ButtonProps, 'onClick'>;
    variant?: DropdownVariant;
    size?: DropdownSize;
    label?: string;
    placement?: DropdownPlacement;
    isFullWidth?: boolean;
    isDisabled?: boolean;
    customClassName?: string;
    menuClassName?: string;
    withAnimation?: boolean;
    closeOnSelect?: boolean;
    defaultOpen?: boolean;
    rounded?: boolean;
    onVisibleChange?: (visible: boolean) => void;
    onSelect?: (key: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
    items,
    trigger,
    buttonProps,
    variant,
    size,
    label = 'Select',
    placement = 'bottom',
    isFullWidth = false,
    isDisabled = false,
    customClassName = '',
    menuClassName = '',
    withAnimation = true,
    closeOnSelect = true,
    defaultOpen = false,
    rounded = false,
    onVisibleChange,
    onSelect,
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const dropdownRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

    // Container classes
    const containerClasses = classNames(
        'relative inline-block',
        {
            'w-full': isFullWidth,
            'opacity-70 cursor-not-allowed': isDisabled,
        },
        customClassName
    );

    // Menu classes
    const menuClasses = classNames(
        'z-50 min-w-[200px]',
        {
            'w-full': isFullWidth,
        },
        menuClassName
    );

    // Menu item classes
    const getItemClasses = (item: DropdownItem) => {
        if ('divider' in item && item.divider === true) {
            return classNames(
                'border-t border-gray-200 my-1'
            );
        }

        return classNames(
            'flex items-center px-4 py-2 cursor-pointer transition-colors duration-200 text-[var(--text-primary)]',
            {
                'hover:bg-[rgba(253,43,123,0.1)] hover:text-[var(--color-primary)]': !item.disabled,
                'opacity-50 cursor-not-allowed': item.disabled,
                'text-[var(--color-error)]': item.danger,
                'rounded-t-md': items.indexOf(item) === 0 && rounded,
                'rounded-b-md': items.indexOf(item) === items.length - 1 && rounded,
            }
        );
    };

    // Animation variants
    const menuVariants = {
        top: {
            hidden: { opacity: 0, y: 10, transformOrigin: 'bottom' },
            visible: { opacity: 1, y: 0, transformOrigin: 'bottom' },
        },
        bottom: {
            hidden: { opacity: 0, y: -10, transformOrigin: 'top' },
            visible: { opacity: 1, y: 0, transformOrigin: 'top' },
        },
        left: {
            hidden: { opacity: 0, x: 10, transformOrigin: 'right' },
            visible: { opacity: 1, x: 0, transformOrigin: 'right' },
        },
        right: {
            hidden: { opacity: 0, x: -10, transformOrigin: 'left' },
            visible: { opacity: 1, x: 0, transformOrigin: 'left' },
        },
    };

    const getMenuPosition = () => {
        switch (placement) {
            case 'top':
                return 'bottom-full mb-1';
            case 'left':
                return 'right-full mr-1';
            case 'right':
                return 'left-full ml-1';
            default:
                return 'top-full mt-1';
        }
    };

    const toggleDropdown = () => {
        if (!isDisabled) {
            const newState = !isOpen;
            setIsOpen(newState);
            onVisibleChange?.(newState);
        }
    };

    const handleClickOutside = () => {
        setIsOpen(false);
        onVisibleChange?.(false);
    };

    const handleItemClick = (item: DropdownItem) => {
        if ('divider' in item && item.divider === true) return;
        
        if (item.disabled) {
            return;
        }
        
        if (closeOnSelect) {
            setIsOpen(false);
            onVisibleChange?.(false);
        }
        
        // Call the onSelect prop with the item key if provided
        onSelect?.(item.key);
        
        // Also call the item's onClick if provided
        item.onClick?.();
    };

    useClickOutside(dropdownRef, handleClickOutside);

    const renderTrigger = () => {
        if (trigger) return <div onClick={toggleDropdown}>{trigger}</div>;

        return (
            <Button
                variant={variant}
                size={size}
                isFullWidth={isFullWidth}
                isDisabled={isDisabled}
                rightIcon={faChevronDown}
                rounded={rounded}
                onClick={toggleDropdown}
                {...buttonProps}
            >
                {label}
            </Button>
        );
    };

    const renderMenuItems = () => {
        return items.map((item, index) => {
            if ('divider' in item && item.divider === true) {
                return <div key={`divider-${index}`} className={getItemClasses(item)} />;
            }

            return (
                <div
                    key={item.key}
                    className={getItemClasses(item)}
                    onClick={() => handleItemClick(item)}
                >
                    {item.icon && (
                        <span className="mr-2">
                            <FontAwesomeIcon icon={item.icon} />
                        </span>
                    )}
                    <Typography.Text 
                        variant={item.danger ? 'error' : 'default'} 
                        size={size === 'large' ? 'base' : size === 'small' ? 'xs' : 'sm'}
                    >
                        {item.label}
                    </Typography.Text>
                </div>
            );
        });
    };

    return (
        <div className={containerClasses} ref={dropdownRef}>
            {renderTrigger()}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={`absolute ${getMenuPosition()} ${menuClasses}`}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={withAnimation ? menuVariants[placement] : undefined}
                        transition={{ duration: 0.2 }}
                    >
                        <Card
                            variant="default"
                            size={size}
                            withShadow={true}
                            shadowSize="md"
                            rounded={rounded}
                            padding="none"
                            withBorder={true}
                            className="overflow-hidden"
                            withAnimation={false}
                        >
                            {renderMenuItems()}
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DropdownMenu;