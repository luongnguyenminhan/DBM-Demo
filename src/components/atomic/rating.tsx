'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames';
import Typography from './typo';

const { Text } = Typography;
// Map RatingSize to TextSize to fix type mismatch
const mapSizeToTextSize = (size: RatingSize): 'xs' | 'sm' | 'base' | 'lg' | 'xl' => {
    switch(size) {
        case 'small': return 'sm';
        case 'large': return 'lg';
        default: return 'base';
    }
};

export type RatingSize = 'small' | 'medium' | 'large';
export type RatingVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';

export interface RatingProps {
    value?: number;
    maxValue?: number;
    onChange?: (value: number) => void;
    size?: RatingSize;
    variant?: RatingVariant;
    readOnly?: boolean;
    withAnimation?: boolean;
    label?: string;
    description?: string;
    showValue?: boolean;
    precision?: 'full' | 'half';
    customClassName?: string;
    className?: string;
}

const Rating: React.FC<RatingProps> = ({
    value = 0,
    maxValue = 5,
    onChange,
    size = 'medium',
    variant = 'primary',
    readOnly = false,
    withAnimation = true,
    label,
    description,
    showValue = false,
    precision = 'full',
    customClassName = '',
    className,
}) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const [activeStar, setActiveStar] = useState<number | null>(null);

    // Size classes
    const sizeClasses = {
        small: 'text-sm gap-1',
        medium: 'text-base gap-2',
        large: 'text-xl gap-3',
    };

    // Icon size classes
    const iconSizeClasses = {
        small: 'w-4 h-4',
        medium: 'w-5 h-5',
        large: 'w-7 h-7',
    };

    // Variant classes (for colors)
    const variantClasses = {
        default: 'text-gray-400 hover:text-gray-600',
        primary: 'text-gray-400 hover:text-[var(--color-primary)]',
        secondary: 'text-gray-400 hover:text-[var(--color-secondary)]',
        success: 'text-gray-400 hover:text-green-500',
        warning: 'text-gray-400 hover:text-yellow-500',
        error: 'text-gray-400 hover:text-red-500',
    };

    // Active state color classes
    const activeColorClasses = {
        default: 'text-gray-600',
        primary: 'text-[var(--color-primary)]',
        secondary: 'text-[var(--color-secondary)]',
        success: 'text-green-500',
        warning: 'text-yellow-500',
        error: 'text-red-500',
    };

    // Container classes
    const containerClasses = classNames(
        'flex flex-col',
        customClassName,
        className
    );

    // Stars container classes
    const starsContainerClasses = classNames(
        'flex items-center',
        sizeClasses[size]
    );

    // Animation variants
    const starVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.2 },
        active: { scale: 1.1 },
        tap: { scale: 0.9 },
    };

    const handleMouseOver = (index: number) => {
        if (!readOnly) {
            setHoverValue(index);
        }
    };

    const handleMouseLeave = () => {
        if (!readOnly) {
            setHoverValue(null);
            setActiveStar(null);
        }
    };

    const handleClick = (index: number) => {
        if (!readOnly) {
            setActiveStar(index);
            if (onChange) {
                onChange(index);
            }
        }
    };

    const renderStars = () => {
        const stars = [];
        const displayValue = hoverValue !== null ? hoverValue : value;

        for (let i = 1; i <= maxValue; i++) {
            const isFilled = precision === 'full' ? i <= displayValue : i <= Math.floor(displayValue);
            const isHalfFilled = 
                precision === 'half' && 
                Math.ceil(displayValue) === i && 
                displayValue % 1 !== 0;
            
            // Determine star icon based on filled state
            let starIcon;
            if (isFilled) {
                starIcon = faStarSolid;
            } else if (isHalfFilled) {
                starIcon = faStarHalfStroke;
            } else {
                starIcon = faStarRegular;
            }
            
            // Determine color class based on state
            const colorClass = (isFilled || isHalfFilled)
                ? activeColorClasses[variant]
                : variantClasses[variant];

            stars.push(
                <motion.div
                    key={i}
                    className="cursor-pointer"
                    variants={withAnimation ? starVariants : undefined}
                    initial="initial"
                    whileHover={!readOnly && withAnimation ? "hover" : undefined}
                    whileTap={!readOnly && withAnimation ? "tap" : undefined}
                    animate={activeStar === i && withAnimation ? "active" : "initial"}
                    onMouseOver={() => handleMouseOver(i)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(i)}
                >
                    <FontAwesomeIcon
                        icon={starIcon}
                        className={classNames(iconSizeClasses[size], colorClass)}
                    />
                </motion.div>
            );
        }
        return stars;
    };

    return (
        <div className={containerClasses}>
            {label && (
                <Text weight="medium" size={mapSizeToTextSize(size)} className="mb-1">
                    {label}
                </Text>
            )}
            <div className={starsContainerClasses}>
                {renderStars()}
                
                {showValue && (
                    <Text
                        weight="medium"
                        size={mapSizeToTextSize(size)}
                        className={classNames('ml-2', activeColorClasses[variant])}
                    >
                        {value.toFixed(precision === 'half' ? 1 : 0)}/{maxValue}
                    </Text>
                )}
            </div>
            
            {description && (
                <Text variant="muted" size="sm" className="mt-1">
                    {description}
                </Text>
            )}
        </div>
    );
};

export default Rating;
