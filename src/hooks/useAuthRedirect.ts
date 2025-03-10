import { useRouter } from 'next/navigation';
import { Toast } from '@/components/molecules/alert';

export function useAuthRedirect() {
  const router = useRouter();
  
  const redirectWithDelay = (
    path: string, 
    delayMs: number = 2000, 
    message?: { text: string; type: 'success' | 'error' | 'info' }
  ) => {
    if (message) {
      if (message.type === 'success') {
        Toast.success(message.text, {
          position: "top-right",
          autoCloseDuration: Math.min(delayMs, 5000),
        });
      } else if (message.type === 'error') {
        Toast.error(message.text, {
          position: "top-right",
          autoCloseDuration: Math.min(delayMs, 5000),
        });
      } else if (message.type === 'info') {
        Toast.info(message.text, {
          position: "top-right",
          autoCloseDuration: Math.min(delayMs, 5000),
        });
      }
    }
    
    const timer = setTimeout(() => {
      router.push(path);
    }, delayMs);
    
    return () => clearTimeout(timer);
  };
  
  return { redirectWithDelay };
}
