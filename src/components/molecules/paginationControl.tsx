'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import Button from '../atomic/button';
import Typography from '../atomic/typo';
import Input from '../atomic/input';
import { IconButton } from '../atomic/icon';
import { usePagination } from '@/hooks/use-pagination';

import{
    faChevronLeft, 
    faChevronRight, 
    faEllipsisH, 
    faAngleDoubleLeft, 
    faAngleDoubleRight 
} from '@fortawesome/free-solid-svg-icons';

export type PaginationVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type PaginationSize = 'small' | 'medium' | 'large';
export type PaginationAlign = 'left' | 'center' | 'right';

export interface PaginationControlProps {
    totalPages: number;
    currentPage: number;
    onChange: (page: number) => void;
    variant?: PaginationVariant;
    size?: PaginationSize;
    align?: PaginationAlign;
    isFullWidth?: boolean;
    isDisabled?: boolean;
    customClassName?: string;
    withAnimation?: boolean;
    showQuickJump?: boolean;
    showTotal?: boolean;
    totalItems?: number;
    pageSize?: number;
    siblingCount?: number;
    showFirstLastButtons?: boolean;
    rounded?: boolean;
    withBackground?: boolean;
    withBorder?: boolean;
    // Add explicit props for API metadata
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
}

const PaginationControl: React.FC<PaginationControlProps> = ({
    totalPages,
    currentPage,
    onChange,
    variant = 'primary',
    size = 'medium',
    align = 'center',
    isFullWidth = false,
    isDisabled = false,
    customClassName = '',
    withAnimation = true,
    showQuickJump = false,
    showTotal = false,
    totalItems = 0,
    pageSize = 10,
    siblingCount = 1,
    showFirstLastButtons = false,
    rounded = false,
    withBackground = false,
    withBorder = true,
    // Initialize metadata props with undefined, which means we'll use calculated values
    hasNextPage,
    hasPreviousPage,
}) => {
    const [pageNumber, setPageNumber] = useState<string>('');
    const pagination = usePagination({
        totalPages,
        initialPage: currentPage,
        siblingCount
    });

    // Container classes
    const containerClasses = classNames(
        'flex flex-wrap gap-2 items-center',
        {
            'w-full': isFullWidth,
            'justify-start': align === 'left',
            'justify-center': align === 'center',
            'justify-end': align === 'right',
            'opacity-70 pointer-events-none': isDisabled,
        },
        customClassName
    );

    // Button size mapping
    const buttonSizeMap: Record<PaginationSize, 'small' | 'medium' | 'large'> = {
        small: 'small',
        medium: 'medium',
        large: 'large',
    };

    // Calculate if it's the first or last page
    // If API metadata is provided, use it; otherwise, fall back to calculated values
    const isFirstPage = hasPreviousPage !== undefined ? !hasPreviousPage : currentPage === 1;
    const isLastPage = hasNextPage !== undefined ? !hasNextPage : currentPage === totalPages;

    // Handle page change
    const handlePageChange = (page: number) => {
        if (!isDisabled) {
            pagination.setPage(page);
            onChange(page);
        }
    };

    // Handle quick jump
    const handleQuickJump = () => {
        const page = parseInt(pageNumber, 10);
        if (!isNaN(page) && page >= 1 && page <= totalPages) {
            handlePageChange(page);
            setPageNumber('');
        }
    };

    // Handle input change for quick jump
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPageNumber(value);
    };

    // Handle input keydown for quick jump
    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleQuickJump();
        }
    };

    // Animation variants
    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    };

    // Render page buttons
    const renderPageButtons = () => {
        return pagination.pageRange.map((page, index) => {
            if (page < 0) {
                // Render ellipsis
                return (
                    <IconButton
                        key={`ellipsis-${page}`}
                        icon={faEllipsisH}
                        size="sm"
                        variant="default"
                        rounded={rounded}
                        withBackground={withBackground}
                        withBorder={withBorder}
                    />
                );
            }

            // Render page button
            return (
                <motion.div
                    key={`page-${page}`}
                    initial={withAnimation ? "hidden" : undefined}
                    animate={withAnimation ? "visible" : undefined}
                    variants={itemVariants}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                    <Button
                        variant={currentPage === page ? variant : 'outline'}
                        size={buttonSizeMap[size]}
                        rounded={rounded}
                        onClick={() => handlePageChange(page)}
                        isDisabled={isDisabled}
                    >
                        {page}
                    </Button>
                </motion.div>
            );
        });
    };

    // Render the total text
    const renderTotalText = () => {
        if (!showTotal || totalItems === 0) return null;

        const start = (currentPage - 1) * pageSize + 1;
        const end = Math.min(currentPage * pageSize, totalItems);

        return (
            <Typography.Text variant="muted" size={size === 'small' ? 'xs' : 'sm'}>
                {start} - {end} of {totalItems} items
            </Typography.Text>
        );
    };

    // Render quick jump input
    const renderQuickJump = () => {
        if (!showQuickJump) return null;

        return (
            <div className="flex items-center gap-2">
                <Typography.Text variant="muted" size={size === 'small' ? 'xs' : 'sm'}>
                    Go to
                </Typography.Text>
                <Input
                    value={pageNumber}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    variant="outlined"
                    size={size === 'small' ? 'small' : size === 'large' ? 'large' : 'medium'}
                    customClassName="w-16"
                    rounded={rounded}
                    isDisabled={isDisabled}
                />
                <Button
                    variant={variant}
                    size={buttonSizeMap[size]}
                    onClick={handleQuickJump}
                    isDisabled={isDisabled || !pageNumber}
                    rounded={rounded}
                >
                    Go
                </Button>
            </div>
        );
    };

    return (
        <div className={containerClasses}>
            {renderTotalText()}

            <div className="flex items-center gap-1">
                {/* First page button */}
                {showFirstLastButtons && (
                    <motion.div
                        initial={withAnimation ? "hidden" : undefined}
                        animate={withAnimation ? "visible" : undefined}
                        variants={itemVariants}
                    >
                        <Button
                            variant="outline"
                            size={buttonSizeMap[size]}
                            leftIcon={faAngleDoubleLeft}
                            onClick={() => handlePageChange(1)}
                            isDisabled={isDisabled || isFirstPage}
                            rounded={rounded}
                        />
                    </motion.div>
                )}

                {/* Previous page button */}
                <motion.div
                    initial={withAnimation ? "hidden" : undefined}
                    animate={withAnimation ? "visible" : undefined}
                    variants={itemVariants}
                >
                    <Button
                        variant="outline"
                        size={buttonSizeMap[size]}
                        leftIcon={faChevronLeft}
                        onClick={() => handlePageChange(currentPage - 1)}
                        isDisabled={isDisabled || isFirstPage}
                        rounded={rounded}
                    />
                </motion.div>

                {/* Page buttons */}
                {renderPageButtons()}

                {/* Next page button */}
                <motion.div
                    initial={withAnimation ? "hidden" : undefined}
                    animate={withAnimation ? "visible" : undefined}
                    variants={itemVariants}
                >
                    <Button
                        variant="outline"
                        size={buttonSizeMap[size]}
                        rightIcon={faChevronRight}
                        onClick={() => handlePageChange(currentPage + 1)}
                        isDisabled={isDisabled || isLastPage}
                        rounded={rounded}
                    />
                </motion.div>

                {/* Last page button */}
                {showFirstLastButtons && (
                    <motion.div
                        initial={withAnimation ? "hidden" : undefined}
                        animate={withAnimation ? "visible" : undefined}
                        variants={itemVariants}
                    >
                        <Button
                            variant="outline"
                            size={buttonSizeMap[size]}
                            rightIcon={faAngleDoubleRight}
                            onClick={() => handlePageChange(totalPages)}
                            isDisabled={isDisabled || isLastPage}
                            rounded={rounded}
                        />
                    </motion.div>
                )}
            </div>

            {renderQuickJump()}
        </div>
    );
};

export default PaginationControl;