import { TooltipPlacement, TooltipTrigger } from '@/components/atomic/tooltip';
import { useState, useRef, useEffect, RefObject, useCallback } from 'react';


interface UseTooltipProps {
    placement: TooltipPlacement;
    trigger: TooltipTrigger;
    delay: number;
    offset: [number, number];
    isDisabled: boolean;
}

// Changed to use string values for CSS styles instead of numbers
interface TooltipPosition {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    transform?: string;
}

interface UseTooltipReturn {
    isVisible: boolean;
    tooltipRef: RefObject<HTMLDivElement | null>;
    triggerRef: RefObject<HTMLDivElement | null>;
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
    handleClick: () => void;
    tooltipStyles: TooltipPosition;
    arrowStyles: React.CSSProperties;
}

const useTooltip = ({
    placement,
    trigger,
    delay,
    offset,
    isDisabled,
}: UseTooltipProps): UseTooltipReturn => {
    // State for visibility control
    const [isVisible, setIsVisible] = useState(false);
    
    // Refs for positioning calculations
    const tooltipRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    
    // Store timeout ID for delay handling
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    // State for dynamic positioning
    const [tooltipStyles, setTooltipStyles] = useState<TooltipPosition>({});
    const [arrowStyles, setArrowStyles] = useState<React.CSSProperties>({});

    // Event handlers
    const handleMouseEnter = useCallback(() => {
        if (isDisabled || trigger !== 'hover') return;
        
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
        }, delay);
    }, [delay, isDisabled, trigger]);

    const handleMouseLeave = useCallback(() => {
        if (isDisabled || trigger !== 'hover') return;
        
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
            setIsVisible(false);
        }, delay / 2); // Use faster timeout for hiding
    }, [delay, isDisabled, trigger]);

    const handleClick = useCallback(() => {
        if (isDisabled || trigger !== 'click') return;
        setIsVisible(prev => !prev);
    }, [isDisabled, trigger]);

    // Handle document click for click trigger
    useEffect(() => {
        const handleDocumentClick = (e: MouseEvent) => {
            if (trigger !== 'click' || !isVisible) return;
            
            if (
                triggerRef.current && 
                tooltipRef.current && 
                !triggerRef.current.contains(e.target as Node) && 
                !tooltipRef.current.contains(e.target as Node)
            ) {
                setIsVisible(false);
            }
        };

        document.addEventListener('click', handleDocumentClick);
        
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [isVisible, trigger]);

    // Calculate positioning whenever visibility or placement changes
    useEffect(() => {
        if (!isVisible || !triggerRef.current || !tooltipRef.current) return;

        const updatePosition = () => {
            const triggerRect = triggerRef.current?.getBoundingClientRect();
            const tooltipRect = tooltipRef.current?.getBoundingClientRect();
            
            if (!triggerRect || !tooltipRect) return;
            
            const [offsetX, offsetY] = offset;
            const newPosition: TooltipPosition = {};
            const newArrowStyles: React.CSSProperties = {};
            
            // Calculate positions based on placement
            switch (placement) {
                case 'top':
                    newPosition.bottom = `calc(100% + ${offsetY}px)`;
                    newPosition.left = `calc(50% + ${offsetX}px)`;
                    newPosition.transform = 'translateX(-50%)';
                    break;
                case 'bottom':
                    newPosition.top = `calc(100% + ${offsetY}px)`;
                    newPosition.left = `calc(50% + ${offsetX}px)`;
                    newPosition.transform = 'translateX(-50%)';
                    break;
                case 'left':
                    newPosition.right = `calc(100% + ${offsetX}px)`;
                    newPosition.top = `calc(50% + ${offsetY}px)`;
                    newPosition.transform = 'translateY(-50%)';
                    break;
                case 'right':
                    newPosition.left = `calc(100% + ${offsetX}px)`;
                    newPosition.top = `calc(50% + ${offsetY}px)`;
                    newPosition.transform = 'translateY(-50%)';
                    break;
                // Complex placements
                case 'topLeft':
                    newPosition.bottom = `calc(100% + ${offsetY}px)`;
                    newPosition.left = `${offsetX}px`;
                    break;
                case 'topRight':
                    newPosition.bottom = `calc(100% + ${offsetY}px)`;
                    newPosition.right = `${offsetX}px`;
                    break;
                case 'bottomLeft':
                    newPosition.top = `calc(100% + ${offsetY}px)`;
                    newPosition.left = `${offsetX}px`;
                    break;
                case 'bottomRight':
                    newPosition.top = `calc(100% + ${offsetY}px)`;
                    newPosition.right = `${offsetX}px`;
                    break;
                case 'leftTop':
                    newPosition.right = `calc(100% + ${offsetX}px)`;
                    newPosition.top = `${offsetY}px`;
                    break;
                case 'leftBottom':
                    newPosition.right = `calc(100% + ${offsetX}px)`;
                    newPosition.bottom = `${offsetY}px`;
                    break;
                case 'rightTop':
                    newPosition.left = `calc(100% + ${offsetX}px)`;
                    newPosition.top = `${offsetY}px`;
                    break;
                case 'rightBottom':
                    newPosition.left = `calc(100% + ${offsetX}px)`;
                    newPosition.bottom = `${offsetY}px`;
                    break;
                default:
                    newPosition.top = `calc(100% + ${offsetY}px)`;
                    newPosition.left = `calc(50% + ${offsetX}px)`;
                    newPosition.transform = 'translateX(-50%)';
            }
            
            // Apply position updates
            setTooltipStyles(newPosition);
            setArrowStyles(newArrowStyles);
        };
        
        // Initial positioning
        updatePosition();
        
        // Handle window resize
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition);
        
        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition);
        };
    }, [isVisible, placement, offset]);

    // Cleanup timeouts
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return {
        isVisible,
        tooltipRef,
        triggerRef,
        handleMouseEnter,
        handleMouseLeave,
        handleClick,
        tooltipStyles,
        arrowStyles,
    };
};

export default useTooltip;