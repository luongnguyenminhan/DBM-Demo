import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface UseRegistrationCompleteProps {
  redirectToLogin?: boolean;
}

const useRegistrationComplete = ({ redirectToLogin = true }: UseRegistrationCompleteProps = {}) => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();
  
  const handleContinueToLogin = () => {
    setIsRedirecting(true);
    router.push('/login');
  };
  
  const handleRegisterAnother = () => {
    setIsRedirecting(true);
    router.push('/register');
  };
  
  // Automatically redirect to login if redirectToLogin is true
  const startAutoRedirect = (delayInSeconds: number = 5) => {
    if (redirectToLogin) {
      const timer = setTimeout(() => {
        handleContinueToLogin();
      }, delayInSeconds * 1000);
      
      return () => clearTimeout(timer);
    }
  };
  
  return {
    isRedirecting,
    handleContinueToLogin,
    handleRegisterAnother,
    startAutoRedirect
  };
};

export default useRegistrationComplete;
