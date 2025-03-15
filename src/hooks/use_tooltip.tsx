import { useState } from 'react';

const useTooltip = (delay: number = 0) => {
    const [isVisible, setIsVisible] = useState(false);

    const showTooltip = () => {
        setTimeout(() => {
            setIsVisible(true);
        }, delay);
    };

    const hideTooltip = () => {
        setIsVisible(false);
    };

    return {
        isVisible,
        showTooltip,
        hideTooltip,
    };
};

export default useTooltip;
