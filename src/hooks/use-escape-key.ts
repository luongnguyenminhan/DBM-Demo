import { useEffect } from 'react';

export const useEscapeKey = (enabled: boolean, onClose: () => void) => {
  useEffect(() => {
    if (!enabled) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [enabled, onClose]);
};
