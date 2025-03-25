import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthRedirect } from './useAuthRedirect';
import authApi from '@/apis/authenticationApi';
import { Toast } from '@/components/molecules/alert';
import { LoginRequest, SignupRequest, PasswordResetConfirmRequest } from '@/types/auth.type';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/store';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface ResetPasswordData {
  password: string;
  email: string;
}

export const useAuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { redirectWithDelay } = useAuthRedirect();
  const dispatch = useDispatch();
  
  // Login functionality
  const handleLogin = async (credentials: LoginRequest) => {
    setIsLoading(true);
    
    try {
      const response = await authApi.login(credentials);
      
      // Check status code to handle different scenarios
      if (response.status === 200) {
        // Success case: User authenticated successfully
        if (response.data?.access_token && response.data?.refresh_token) {
            // Store tokens in localStorage
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            
            // Store tokens in cookies
            document.cookie = `access_token=${response.data.access_token}; path=/; max-age=86400; SameSite=Strict`;
            document.cookie = `refresh_token=${response.data.refresh_token}; path=/; max-age=604800; SameSite=Strict`;
            
            // Store user data in Redux
            dispatch(login({ email: response.data.email }));
            
            // Show success toast on successful login
            Toast.success('Login successful!', {
              autoCloseDuration: 1000,
              position: 'top-right'
            });
            
            // Redirect to dashboard after a short delay
            return redirectWithDelay('/dashboard', 1500);
        }
      } else if (response.status === 401 && !response.message?.includes("không chính xác")) {
        // Email verification required case
        Toast.warning('Your email address needs to be verified', {
          autoCloseDuration: 3000,
          position: 'top-right'
        });
        
        // Encode email for security
        const encodedEmail = btoa(credentials.email);
        
        // Redirect to OTP confirmation with email parameter after short delay
        return redirectWithDelay(`otp-confirmation?email=${encodedEmail}&purpose=login`, 1500);
      } else {
        // Other non-success cases
        Toast.error(response.message || 'Login failed', {
          autoCloseDuration: 3000,
          position: 'top-right'
        });
        throw new Error(response.message || 'Đăng nhập thất bại');
      }
    } catch (error: unknown) {
      console.error('Login failed:', error);
      
      // Default error message for API failures
      Toast.error('Email or password is incorrect', {
        autoCloseDuration: 3000,
        position: 'top-right'
      });
      
      throw new Error('Email hoặc mật khẩu không chính xác');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Register functionality
  const handleRegister = async (userData: RegisterData) => {
    setIsLoading(true);
    
    try {
      // Prepare signup data according to SignupRequest interface
      const signupData: SignupRequest = {
        email: userData.email,
        username: userData.name,
        password: userData.password,
        confirm_password: userData.password,
        device_address: navigator.userAgent || 'unknown'
      };
      
      const response = await authApi.signup(signupData);
      
      if (response.status === 200 || response.status === 201) {
        // Show success toast on successful registration
        Toast.success('Đăng ký thành công!', {
          autoCloseDuration: 1500,
          position: 'top-right'
        });
        
        // Encrypt email for security
        const encryptedEmail = btoa(userData.email);
        
        // Redirect to OTP confirmation page after a short delay
        return redirectWithDelay(`otp-confirmation?email=${encryptedEmail}&purpose=registration`, 1500);
      } else {
        console.error('Registration failed:', response);
        Toast.error(response.message || 'Đăng ký thất bại', {
          autoCloseDuration: 3000,
          position: 'top-right'
        });
        throw new Error(response.message || 'Đăng ký thất bại');
      }
    } catch (error: unknown) {
      console.error('Registration failed:', error);
      
      // Handle error from API response if available
      const errorMessage = 'Email đã được sử dụng hoặc đăng ký thất bại';
      
      Toast.error(errorMessage, {
        autoCloseDuration: 3000,
        position: 'top-right'
      });
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Forgot password functionality
  const handleForgotPassword = async (email: string) => {
    setIsLoading(true);
    
    try {
      const response = await authApi.requestPasswordReset({ email });
      
      if (response.status === 200) {
        Toast.success('Link đặt lại mật khẩu đã được gửi!', {
          position: "top-right",
          autoCloseDuration: 3000,
        });
        
        // Encrypt email for security
        const encryptedEmail = btoa(email);
        
        // Redirect to OTP confirmation page with the email and purpose
        return router.push(`/auth/otp-confirmation?email=${encryptedEmail}&purpose=passwordReset`);
      } else {
        throw new Error(response.message || 'Không thể gửi email đặt lại mật khẩu');
      }
    } catch (error: unknown) {
      console.error('Password reset request failed:', error);
      throw new Error('Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Reset password functionality
  const handleResetPassword = async (passwordData: ResetPasswordData, token: string) => {
    setIsLoading(true);
    
    try {
      const resetData: PasswordResetConfirmRequest = {
        token: token,
        new_password: passwordData.password
      };
      
      const response = await authApi.resetPassword(resetData);
      
      if (response.status === 200) {
        Toast.success('Mật khẩu đã được đặt lại thành công!', {
          position: "top-right",
          autoCloseDuration: 3000,
        });
        
        // Redirect to login page on success
        return redirectWithDelay('auth/login', 2000);
      } else {
        Toast.error(response.message || 'Không thể đặt lại mật khẩu', {
          position: "top-right",
          autoCloseDuration: 3000,
        });
        throw new Error(response.message || 'Không thể đặt lại mật khẩu');
      }
    } catch (error: unknown) {
      console.error('Password reset failed:', error);
      Toast.error('Không thể đặt lại mật khẩu. Vui lòng thử lại sau.', {
        position: "top-right",
        autoCloseDuration: 3000,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // OTP verification functionality
  const handleOtpConfirmation = async (otp: string, email: string, purpose: string, encodedEmail: string) => {
    setIsLoading(true);
    
    try {
      const verificationData = {
        email: email,
        token: otp
      };
      
      const response = await authApi.verifyEmail(verificationData);
      
      if (response.status === 200) {
        // Success case
        Toast.success('Xác thực OTP thành công!', {
          position: "top-right",
          autoCloseDuration: 3000,
        });
        
        // Redirect based on purpose
        if (purpose === 'passwordReset') {
          return redirectWithDelay(`/reset-password?email=${encodedEmail}`, 1000);
        } else if (purpose === 'registration') {
          return redirectWithDelay('/registration-complete', 1000);
        } else {
          return redirectWithDelay('/dashboard', 1000);
        }
      } else {
        console.error('OTP verification failed:', response);
        Toast.error(response.message || 'Xác thực thất bại', {
          autoCloseDuration: 3000,
          position: 'top-right'
        });
        throw new Error(response.message || 'Xác thực thất bại');
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
      Toast.error('Mã OTP không hợp lệ hoặc đã hết hạn', {
        position: "top-right",
        autoCloseDuration: 3000,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Resend OTP functionality
  const handleResendOtp = async (email: string) => {
    try {
      const response = await authApi.requestEmailVerification({ email });
      
      if (response.status === 200) {
        Toast.success('Mã OTP mới đã được gửi!', {
          position: "top-right",
          autoCloseDuration: 3000,
        });
        return Promise.resolve();
      } else {
        Toast.error(response.message || 'Không thể gửi lại mã OTP', {
          position: "top-right",
          autoCloseDuration: 3000,
        });
        return Promise.reject(new Error(response.message || 'Không thể gửi lại mã OTP'));
      }
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      Toast.error('Không thể gửi lại mã OTP', {
        position: "top-right",
        autoCloseDuration: 3000,
      });
      return Promise.reject(new Error('Không thể gửi lại mã OTP'));
    }
  };
  
  return {
    isLoading,
    handleLogin,
    handleRegister,
    handleForgotPassword,
    handleResetPassword,
    handleOtpConfirmation,
    handleResendOtp
  };
};
