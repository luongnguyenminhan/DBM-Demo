'use client';
import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import useTooltip from '../../hooks/use_tooltip';

export type TooltipPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom';

export type TooltipTrigger = 'hover' | 'click';

export interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  placement?: TooltipPlacement;
  trigger?: TooltipTrigger;
  delay?: number;
  offset?: [number, number];
  isDisabled?: boolean;
  customClassName?: string;
  withArrow?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  placement = 'top',
  trigger = 'hover',
  delay = 300,
  offset = [0, 10],
  isDisabled = false,
  customClassName = '',
  withArrow = true,
}) => {
  const {
    isVisible,
    tooltipRef,
    triggerRef,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    tooltipStyles,
    arrowStyles,
  } = useTooltip({
    placement,
    trigger,
    delay,
    offset,
    isDisabled,
  });

  // Function to determine arrow border styles based on placement
  const getArrowBorderStyles = (placement: TooltipPlacement) => {
    const mainDirection = placement.split(/(?=[A-Z])/)[0].toLowerCase();
    switch (mainDirection) {
      case 'top':
        return {
          borderTop: '4px solid #1F2937', // gray-800
          borderLeft: '4px solid transparent',
          borderRight: '4px solid transparent',
          borderBottom: '4px solid transparent',
        };
      case 'bottom':
        return {
          borderBottom: '4px solid #1F2937',
          borderLeft: '4px solid transparent',
          borderRight: '4px solid transparent',
          borderTop: '4px solid transparent',
        };
      case 'left':
        return {
          borderLeft: '4px solid #1F2937',
          borderTop: '4px solid transparent',
          borderBottom: '4px solid transparent',
          borderRight: '4px solid transparent',
        };
      case 'right':
        return {
          borderRight: '4px solid #1F2937',
          borderTop: '4px solid transparent',
          borderBottom: '4px solid transparent',
          borderLeft: '4px solid transparent',
        };
      default:
        return {};
    }
  };

  const triggerEvents = trigger === 'hover'
    ? {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      }
    : {
        onClick: handleClick,
      };

  return (
    <div className="inline-block relative" ref={triggerRef} {...triggerEvents}>
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            className={classNames(
              'absolute z-50 px-3 py-2 text-sm rounded shadow-md bg-gray-800 text-white max-w-xs',
              customClassName
            )}
            style={tooltipStyles}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {content}
            {withArrow && (
              <div
                className="absolute w-0 h-0"
                style={{ ...getArrowBorderStyles(placement), ...arrowStyles }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;