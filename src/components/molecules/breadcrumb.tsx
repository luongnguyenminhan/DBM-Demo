'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight, faHome } from '@fortawesome/free-solid-svg-icons';
import Typography from '../atomic/typo';
import Icon from '../atomic/icon';
import Card from '../atomic/card';
import { useBreadcrumb } from '@/hooks/use-breadcrumb';

export type BreadcrumbVariant = 'default' | 'primary' | 'secondary' | 'minimal';
export type BreadcrumbSize = 'small' | 'medium' | 'large';
export type BreadcrumbSeparator = 'slash' | 'chevron' | 'dot' | string;

export interface BreadcrumbItem {
    key: string;
    label: string | React.ReactNode;
    icon?: IconDefinition;
    href?: string;
    onClick?: () => void;
    disabled?: boolean;
}

export interface BreadcrumbProps {
    items?: BreadcrumbItem[];
    variant?: BreadcrumbVariant;
    size?: BreadcrumbSize;
    separator?: BreadcrumbSeparator;
    isFullWidth?: boolean;
    isDisabled?: boolean;
    customClassName?: string;
    withAnimation?: boolean;
    withHomeIcon?: boolean;
    onClick?: (key: string) => void;
    maxItems?: number;
    collapsedLabel?: string;
    withCard?: boolean;
    cardProps?: Partial<React.ComponentProps<typeof Card>>;
    withDropdownCollapse?: boolean;
    itemsBeforeCollapse?: number;
    itemsAfterCollapse?: number;
    separatorIcon?: IconDefinition;
    loading?: boolean;
    loadingText?: string;
    onSeparatorClick?: (index: number) => void;
    renderSeparator?: (index: number) => React.ReactNode;
    itemRender?: (item: BreadcrumbItem, index: number) => React.ReactNode;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
    items = [],
    variant = 'default',
    size = 'medium',
    isFullWidth = false,
    isDisabled = false,
    customClassName = '',
    withAnimation = true,
    withHomeIcon = true,
    onClick,
    maxItems,
    collapsedLabel = '...',
    withCard = false,
    cardProps,
    separatorIcon = faChevronRight,
    loading = false,
    loadingText = 'Loading...',
    onSeparatorClick,
    renderSeparator,
}) => {
    const {
        items: breadcrumbItems,
        handleItemClick,
        activeKey,
    } = useBreadcrumb({
        items,
        onChange: onClick,
    });

    const containerClasses = classNames(
        'flex items-center flex-wrap gap-2',
        {
            'w-full': isFullWidth,
            'opacity-50 pointer-events-none': isDisabled,
        },
        customClassName
    );

    const getItemClasses = (item: BreadcrumbItem, isLast: boolean) => {
        return classNames(
            'flex items-center transition-colors duration-200',
            {
                'cursor-pointer hover:text-[var(--color-primary)]': !isLast && !item.disabled,
                'cursor-default': isLast || item.disabled,
                'opacity-50': item.disabled,
                'text-[var(--color-primary)]': activeKey === item.key && variant !== 'minimal',
                'font-semibold': isLast,
            }
        );
    };

    const getSeparator = (index: number) => {
        if (renderSeparator) {
            return renderSeparator(index);
        }

        const separatorContent = (
            <Icon 
                icon={separatorIcon} 
                size="sm" 
                className="mx-2 text-gray-400"
                onClick={() => onSeparatorClick?.(index)}
                isButton={!!onSeparatorClick}
            />
        );

        return separatorContent;
    };

    const renderItems = () => {
        let visibleItems = breadcrumbItems;

        if (maxItems && breadcrumbItems.length > maxItems) {
            const start = breadcrumbItems.slice(0, Math.ceil(maxItems / 2));
            const end = breadcrumbItems.slice(-Math.floor(maxItems / 2));
            visibleItems = [
                ...start,
                { key: 'collapse', label: collapsedLabel, disabled: true },
                ...end,
            ];
        }

        return visibleItems.map((item, index) => {
            const isLast = index === visibleItems.length - 1;
            const isCollapsed = item.key === 'collapse';

            return (
                <motion.div
                    key={item.key}
                    className="flex items-center"
                    initial={withAnimation ? { opacity: 0, x: -10 } : undefined}
                    animate={withAnimation ? { opacity: 1, x: 0 } : undefined}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                    <div
                        className={getItemClasses(item, isLast)}
                        onClick={() => !isLast && !item.disabled && handleItemClick(item.key)}
                    >
                        {index === 0 && withHomeIcon && !item.icon && (
                            <Icon icon={faHome} className="mr-1" />
                        )}
                        {item.icon && <Icon icon={item.icon} className="mr-1" />}
                        <Typography.Text
                            size={size === 'small' ? 'xs' : size === 'large' ? 'lg' : 'sm'}
                            variant={isCollapsed ? 'muted' : 'default'}
                        >
                            {item.label}
                        </Typography.Text>
                    </div>
                    {!isLast && getSeparator(index)}
                </motion.div>
            );
        });
    };

    const renderContent = () => (
        <nav aria-label="Breadcrumb" className={containerClasses}>
            <AnimatePresence>
                {loading ? (
                    <Typography.Text variant="muted">{loadingText}</Typography.Text>
                ) : (
                    renderItems()
                )}
            </AnimatePresence>
        </nav>
    );

    if (withCard) {
        return (
            <Card
                variant="default"
                size="medium"
                padding="sm"
                withBorder
                {...cardProps}
            >
                {renderContent()}
            </Card>
        );
    }

    return renderContent();
};

export default Breadcrumb;
