import { useState, useEffect, useCallback } from 'react';
import { AlertProps } from '@/components/molecules/alert';

interface UseAlertProps extends Pick<AlertProps, 'isOpen' | 'autoClose' | 'autoCloseDuration' | 'onClose'> {
    initialState?: boolean;
}

interface UseAlertReturn {
    visible: boolean;
    setVisible: (value: boolean) => void;
    handleClose: () => void;
}

export const useAlert = ({
    isOpen = true,
    autoClose = false,
    autoCloseDuration = 5000,
    onClose,
    initialState
}: UseAlertProps): UseAlertReturn => {
    const [visible, setVisible] = useState<boolean>(initialState ?? isOpen);

    // Reset visibility when isOpen prop changes
    useEffect(() => {
        setVisible(isOpen);
    }, [isOpen]);

    // Memoize handleClose to prevent recreation on every render
    const handleClose = useCallback(() => {
        setVisible(false);
        onClose?.();
    }, [onClose]);

    // Auto-close effect with handleClose in dependencies
    useEffect(() => {
        if (autoClose && visible) {
            const timer = setTimeout(handleClose, autoCloseDuration);
            return () => clearTimeout(timer);
        }
    }, [autoClose, visible, autoCloseDuration, handleClose]);

    return {
        visible,
        setVisible,
        handleClose
    };
};
