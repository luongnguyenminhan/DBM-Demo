'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Avatar, { AvatarSize } from '../atomic/avatar';
import Typography, { TextSize } from '../atomic/typo';
import Badge from '../atomic/badge';
import Icon from '../atomic/icon';

export type ProfileInfoVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type ProfileInfoSize = 'small' | 'medium' | 'large';
export type ProfileInfoStatus = 'online' | 'offline' | 'busy' | 'away';

export interface ProfileInfoProps {
    name: string | ReactNode;
    title?: string | ReactNode;
    avatar?: string;
    avatarIcon?: IconDefinition;
    badges?: Array<{
        label: string;
        variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
        icon?: IconDefinition;
    }>;
    stats?: Array<{
        label: string;
        value: string | number;
        icon?: IconDefinition;
    }>;
    variant?: ProfileInfoVariant;
    size?: ProfileInfoSize;
    withAnimation?: boolean;
    animationType?: 'fade' | 'slide' | 'scale';
    withShadow?: boolean;
    shadowSize?: 'sm' | 'md' | 'lg';
    withBorder?: boolean;
    rounded?: boolean;
    customClassName?: string;
    className?: string;
    onClick?: () => void;
    status?: ProfileInfoStatus;
    withStatusIndicator?: boolean;
    actionButtons?: ReactNode;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
    name,
    title,
    avatar,
    avatarIcon,
    badges = [],
    stats = [],
    variant = 'default',
    size = 'medium',
    withAnimation = false,
    animationType = 'fade',
    withShadow = false,
    shadowSize = 'md',
    withBorder = false,
    rounded = true,
    customClassName = '',
    className,
    onClick,
    status,
    withStatusIndicator = true,
    actionButtons,
}) => {
    // Map sizes to avatar sizes
    const avatarSizes: Record<ProfileInfoSize, AvatarSize> = {
        small: 'sm',
        medium: 'md',
        large: 'lg',
    };

    // Size classes
    const sizeClasses = {
        small: 'p-2',
        medium: 'p-3',
        large: 'p-4',
    };

    // Shadow classes
    const shadowClasses = {
        sm: 'shadow-sm',
        md: 'shadow',
        lg: 'shadow-lg',
    };

    // Variant classes for different styling based on variant
    const variantClasses = {
        default: 'bg-white text-[var(--text-primary)]',
        primary: 'bg-[var(--color-primary)] text-white',
        secondary: 'bg-[var(--color-secondary)] text-white',
        success: 'bg-[var(--color-success)] text-white',
        warning: 'bg-[var(--color-warning)] text-[var(--text-primary)]',
        error: 'bg-[var(--color-error)] text-white',
        info: 'bg-[var(--color-info)] text-white',
    };

    // Border color classes based on variant
    const borderColorClasses = {
        default: 'border-gray-200',
        primary: 'border-[var(--color-primary)]',
        secondary: 'border-[var(--color-secondary)]',
        success: 'border-[var(--color-success)]',
        warning: 'border-[var(--color-warning)]',
        error: 'border-[var(--color-error)]',
        info: 'border-[var(--color-info)]',
    };

    // Status indicator colors
    const statusColors = {
        online: 'bg-green-500',
        offline: 'bg-gray-400',
        busy: 'bg-red-500',
        away: 'bg-yellow-500',
    };

    // Container classes
    const containerClasses = classNames(
        'flex',
        sizeClasses[size],
        variantClasses[variant],
        {
            'flex-row items-center': true,
            'cursor-pointer hover:bg-opacity-90 transition-colors duration-200': !!onClick,
            [shadowClasses[shadowSize]]: withShadow,
            ['border ' + borderColorClasses[variant]]: withBorder,
            'rounded-lg': rounded,
        },
        customClassName,
        className
    );

    // Animation variants
    const animationVariants = {
        fade: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
        },
        slide: {
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
        },
        scale: {
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1 },
        },
    };

    // Size mapping for text
    const textSizeMap = {
        small: { name: 'sm', title: 'xs', stats: 'xs' },
        medium: { name: 'base', title: 'sm', stats: 'sm' },
        large: { name: 'lg', title: 'base', stats: 'base' },
    };

    // Render badges if provided
    const renderBadges = () => {
        if (badges.length === 0) return null;

        return (
            <div className="flex flex-wrap gap-1.5 mt-1.5">
                {badges.map((badge, index) => (
                    <Badge
                        key={index}
                        content={badge.label}
                        variant={badge.variant || 'primary'}
                        leftIcon={badge.icon}
                        size={size === 'small' ? 'xs' : 'sm'}
                        shape="pill"
                    />
                ))}
            </div>
        );
    };

    // Render stats if provided
    const renderStats = () => {
        if (stats.length === 0) return null;

        return (
            <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-100 w-full">
                {stats.map((stat, index) => (
                    <div key={index} className="flex items-center">
                        {stat.icon && (
                            <Icon 
                                icon={stat.icon} 
                                size={size === 'small' ? 'xs' : 'sm'} 
                                className="mr-1.5 text-gray-500" 
                            />
                        )}
                        <div>
                            <Typography.Text size="xs" variant="muted">
                                {stat.label}
                            </Typography.Text>
                            <Typography.Text 
                                size={textSizeMap[size].stats as TextSize} 
                                weight="medium"
                            >
                                {stat.value}
                            </Typography.Text>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    // Render the status indicator
    const renderStatusIndicator = () => {
        if (!status || !withStatusIndicator) return null;

        return (
            <div className={classNames(
                'absolute bottom-0 right-0 rounded-full border-2 border-white',
                statusColors[status],
                {
                    'h-2.5 w-2.5': size === 'small',
                    'h-3 w-3': size === 'medium',
                    'h-4 w-4': size === 'large',
                }
            )} />
        );
    };

    // Content to be rendered
    const content = (
        <div className={containerClasses} onClick={onClick}>
            <div className="relative">
                <Avatar
                    src={avatar}
                    icon={avatarIcon}
                    name={typeof name === 'string' ? name : ''}
                    size={avatarSizes[size]}
                    shape="circle"
                    withShadow={false}
                    withBorder
                    withAnimation={false}
                />
                {renderStatusIndicator()}
            </div>

            <div className="ml-3 flex-1 min-w-0">
                <Typography.Text
                    weight="semibold"
                    size={textSizeMap[size].name as TextSize}
                    variant={variant !== 'default' ? 'default' : 'default'}
                    className="truncate"
                >
                    {name}
                </Typography.Text>

                {title && (
                    <Typography.Text
                        size={textSizeMap[size].title as TextSize}
                        variant={variant !== 'default' ? 'muted' : 'muted'}
                        className="truncate"
                    >
                        {title}
                    </Typography.Text>
                )}

                {renderBadges()}
            </div>

            {actionButtons && (
                <div className="ml-auto flex items-center">
                    {actionButtons}
                </div>
            )}

            {stats.length > 0 && renderStats()}
        </div>
    );

    // Apply animation if enabled
    if (withAnimation) {
        return (
            <motion.div
                initial="hidden"
                animate="visible"
                variants={animationVariants[animationType]}
                transition={{ duration: 0.4 }}
            >
                {content}
            </motion.div>
        );
    }

    return content;
};

export default ProfileInfo;
