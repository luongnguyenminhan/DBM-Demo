'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { 
  faSort, 
  faSortUp, 
  faSortDown, 
  faFilter,
  IconDefinition 
} from '@fortawesome/free-solid-svg-icons';
import Typography from '../atomic/typo';
import Icon, { IconButton } from '../atomic/icon';
import Badge from '../atomic/badge';
import Spinner from '../atomic/spinner';

export type TableHeaderVariant = 'default' | 'primary' | 'secondary' | 'outlined' | 'minimal';
export type TableHeaderSize = 'small' | 'medium' | 'large';
export type SortDirection = 'asc' | 'desc' | null;

export interface TableHeaderColumn {
  key: string;
  title: string | ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  minWidth?: string;
  align?: 'left' | 'center' | 'right';
  icon?: IconDefinition;
  customClassName?: string;
  renderHeader?: (column: TableHeaderColumn) => ReactNode;
}

export interface TableHeaderProps {
  columns: TableHeaderColumn[];
  sortColumn?: string;
  sortDirection?: SortDirection;
  onSort?: (column: string, direction: SortDirection) => void;
  variant?: TableHeaderVariant;
  size?: TableHeaderSize;
  isSticky?: boolean;
  withBorder?: boolean;
  withBackground?: boolean;
  rounded?: boolean;
  withShadow?: boolean;
  withAnimation?: boolean;
  customClassName?: string;
  headerClassName?: string;
  cellClassName?: string;
  actions?: ReactNode;
  isLoading?: boolean;
  showSelectAll?: boolean;
  selectedAll?: boolean;
  onSelectAll?: (selected: boolean) => void;
  withHorizontalScroll?: boolean;
  withVerticalDividers?: boolean;
  withFilter?: boolean;
  onFilter?: (column: string) => void;
  activeFilters?: Record<string, boolean>;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  columns = [],
  sortColumn,
  sortDirection,
  onSort,
  variant = 'default',
  size = 'medium',
  isSticky = false,
  withBorder = true,
  withBackground = true,
  rounded = false,
  withShadow = false,
  withAnimation = false,
  customClassName = '',
  headerClassName = '',
  cellClassName = '',
  actions,
  isLoading = false,
  showSelectAll = false,
  selectedAll = false,
  onSelectAll,
  withHorizontalScroll = false,
  withVerticalDividers = false,
  withFilter = false,
  onFilter,
  activeFilters = {},
}) => {
  // Size classes
  const sizeClasses = {
    small: 'py-2 px-3 text-xs',
    medium: 'py-3 px-4 text-sm',
    large: 'py-4 px-5 text-base',
  };

  // Variant classes with background control
  const variantClasses = {
    default: withBackground ? 'bg-white text-[var(--text-primary)]' : 'text-[var(--text-primary)]',
    primary: withBackground ? 'bg-[var(--color-primary-light)] text-[var(--text-on-primary)]' : 'text-[var(--color-primary)]',
    secondary: withBackground ? 'bg-[var(--color-secondary-light)] text-[var(--text-on-secondary)]' : 'text-[var(--color-secondary)]',
    outlined: 'bg-transparent text-[var(--text-primary)] border-b',
    minimal: 'bg-transparent text-[var(--text-primary)]',
  };

  // Container classes
  const containerClasses = classNames(
    'table-header',
    'w-full',
    {
      'sticky top-0 z-10': isSticky,
      'rounded-t-lg': rounded,
      'shadow-sm': withShadow,
      'border-b': withBorder && variant !== 'outlined',
    },
    variantClasses[variant],
    customClassName
  );

  // Handle sort change
  const handleSort = (column: TableHeaderColumn) => {
    if (!column.sortable || !onSort) return;

    let newDirection: SortDirection = 'asc';
    if (sortColumn === column.key && sortDirection === 'asc') {
      newDirection = 'desc';
    } else if (sortColumn === column.key && sortDirection === 'desc') {
      newDirection = null;
    }
    
    onSort(column.key, newDirection);
  };

  // Handle filter click
  const handleFilter = (column: TableHeaderColumn) => {
    if (!column.filterable || !onFilter) return;
    onFilter(column.key);
  };

  // Handle select all
  const handleSelectAll = () => {
    if (onSelectAll) {
      onSelectAll(!selectedAll);
    }
  };

  // Get sort icon based on current sort state
  const getSortIcon = (column: TableHeaderColumn) => {
    if (!column.sortable) return null;
    
    if (sortColumn === column.key) {
      if (sortDirection === 'asc') {
        return faSortUp;
      } else if (sortDirection === 'desc') {
        return faSortDown;
      }
    }
    return faSort;
  };

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
  };

  // Render header cell content
  const renderHeaderCell = (column: TableHeaderColumn) => {
    if (column.renderHeader) {
      return column.renderHeader(column);
    }

    const sortIcon = getSortIcon(column);
    const isFiltered = activeFilters && activeFilters[column.key];

    return (
      <div className={classNames(
        'flex items-center gap-2',
        { 'cursor-pointer': column.sortable },
        { 'justify-start': column.align === 'left' || !column.align },
        { 'justify-center': column.align === 'center' },
        { 'justify-end': column.align === 'right' }
      )}>
        {column.icon && (
          <Icon 
            icon={column.icon} 
            size={size === 'small' ? 'xs' : size === 'large' ? 'md' : 'sm'} 
            variant="default"
          />
        )}

        <Typography.Text 
          weight="semibold"
          size={size === 'small' ? 'xs' : size === 'large' ? 'lg' : 'sm'}
          className="whitespace-nowrap"
        >
          {column.title}
        </Typography.Text>

        {column.sortable && (
          <Icon 
            icon={sortIcon || faSort}
            size={size === 'small' ? 'xs' : 'sm'}
            variant={sortColumn === column.key ? 'primary' : 'default'}
            className="ml-1"
          />
        )}

        {column.filterable && withFilter && (
          <div className="relative">
            <IconButton
              icon={faFilter}
              size="sm"
              variant={isFiltered ? 'primary' : 'default'}
              onClick={() => {
                // Fixed: Removed the event parameter and using a closure instead
                if (onFilter) handleFilter(column);
              }}
            />
            {isFiltered && (
              <Badge 
                variant="primary" 
                size="xs" 
                isDot 
                isFloating 
                position="top-right"
              />
            )}
          </div>
        )}
      </div>
    );
  };

  // Render the actual header
  const header = (
    <div className={classNames(
      containerClasses,
      headerClassName
    )}>
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-20">
          <Spinner size="sm" variant="primary" />
        </div>
      )}
      <div className={classNames(
        'flex w-full',
        { 'overflow-x-auto': withHorizontalScroll }
      )}>
        {showSelectAll && (
          <div className={classNames(
            'flex items-center justify-center',
            sizeClasses[size],
            { 'border-r': withVerticalDividers }
          )}>
            <input
              type="checkbox"
              checked={selectedAll}
              onChange={handleSelectAll}
              className="form-checkbox h-4 w-4 text-[var(--color-primary)] rounded"
            />
          </div>
        )}

        {columns.map((column, index) => (
          <div
            key={column.key}
            className={classNames(
              'flex-1',
              sizeClasses[size],
              { 'cursor-pointer': column.sortable },
              { 'border-r': withVerticalDividers && index < columns.length - 1 },
              cellClassName,
              column.customClassName
            )}
            style={{
              width: column.width,
              minWidth: column.minWidth,
              textAlign: column.align || 'left',
            }}
            onClick={() => handleSort(column)}
          >
            {renderHeaderCell(column)}
          </div>
        ))}

        {actions && (
          <div className={classNames(
            'flex items-center justify-end',
            sizeClasses[size]
          )}>
            {actions}
          </div>
        )}
      </div>
    </div>
  );

  // Apply animation if needed
  if (withAnimation) {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        variants={containerVariants}
        transition={{ duration: 0.3 }}
      >
        {header}
      </motion.div>
    );
  }

  return header;
};

export default TableHeader;
