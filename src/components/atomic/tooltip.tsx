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
    delay = 0,
    offset = [0, 8],
    isDisabled = false,
    customClassName = '',
    withArrow = true,
}) => {
    const { isVisible, showTooltip, hideTooltip } = useTooltip(delay);

    const triggerProps =
        trigger === 'hover'
            ? {
                    onMouseEnter: !isDisabled ? showTooltip : undefined,
                    onMouseLeave: !isDisabled ? hideTooltip : undefined,
                }
            : {
                    onClick: !isDisabled ? () => showTooltip() : undefined,
                };

    const placementClasses = {
        top: 'bottom-1/2 translate-y-[-100%] translate-x-[-50%] mb-2',
        bottom: 'top-1/2 translate-y-[100%] translate-x-[-50%] mt-2',
        left: 'right-1/2 translate-x-[-100%] translate-y-[-50%] mr-2',
        right: 'left-1/2 translate-x-[100%] translate-y-[-50%] ml-2',
        topLeft: 'bottom-1/2 translate-y-[-100%] translate-x-[0%] mb-2 right-0',
        topRight: 'bottom-1/2 translate-y-[-100%] translate-x-[-100%] mb-2 left-0',
        bottomLeft: 'top-1/2 translate-y-[100%] translate-x-[0%] mt-2 right-0',
        bottomRight: 'top-1/2 translate-y-[100%] translate-x-[-100%] mt-2 left-0',
        leftTop: 'right-1/2 translate-x-[-100%] translate-y-[0%] mr-2 bottom-0',
        leftBottom: 'right-1/2 translate-x-[-100%] translate-y-[-100%] mr-2 top-0',
        rightTop: 'left-1/2 translate-x-[100%] translate-y-[0%] ml-2 bottom-0',
        rightBottom: 'left-1/2 translate-x-[100%] translate-y-[-100%] ml-2 top-0',
    };

    const tooltipClasses = classNames(
        'absolute z-10 bg-gray-800 text-white text-sm rounded py-2 px-3 transition-opacity duration-200',
        placementClasses[placement],
        'pointer-events-none',
        customClassName
    );

    const arrowClasses = classNames('absolute w-2 h-2 bg-gray-800 transform rotate-45 z-0');

    const arrowPlacementClasses = {
        top: 'bottom-0 left-1/2 translate-x-[-50%] translate-y-[50%]',
        bottom: 'top-0 left-1/2 translate-x-[-50%] translate-y-[-50%]',
        left: 'right-0 top-1/2 translate-x-[50%] translate-y-[-50%]',
        right: 'left-0 top-1/2 translate-x-[-50%] translate-y-[-50%]',
        topLeft: 'bottom-0 left-[10%] translate-y-[50%]',
        topRight: 'bottom-0 right-[10%] translate-y-[50%]',
        bottomLeft: 'top-0 left-[10%] translate-y-[-50%]',
        bottomRight: 'top-0 right-[10%] translate-y-[-50%]',
        leftTop: 'right-0 top-[10%] translate-x-[50%]',
        leftBottom: 'right-0 bottom-[10%] translate-x-[50%]',
        rightTop: 'left-0 top-[10%] translate-x-[-50%]',
        rightBottom: 'left-0 bottom-[10%] translate-x-[-50%]',
    };

    const tooltipVariants = {
        initial: { opacity: 0, scale: 0.75 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.75 },
    };

    return (
        <div className="relative inline-block">
            <div {...triggerProps}>{children}</div>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        className={tooltipClasses}
                        style={{
                            transform: `translate(${offset[0]}px, ${offset[1]}px)`,
                        }}
                        variants={tooltipVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                    >
                        {withArrow && <div className={classNames(arrowClasses, arrowPlacementClasses[placement])} />}
                        <div className="relative z-10">{content}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Tooltip;