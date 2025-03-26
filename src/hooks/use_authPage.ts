import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthRedirect } from './useAuthRedirect';
import authApi from '@/apis/authenticationApi';
import { Toast } from '@/components/molecules/alert';
import { LoginRequest, SignupRequest, PasswordResetConfirmRequest } from '@/types/auth.type';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure, logout } from '@/redux/slices/authSlice';
import { RootState } from '@/redux/store';

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
  const searchParams = useSearchParams();
  const { redirectWithDelay } = useAuthRedirect();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);
  
  const handleLogin = async (credentials: LoginRequest) => {
    setIsLoading(true);
    dispatch(loginStart());
    
    try {
      const response = await authApi.login(credentials);
      
      if (response.status === 200) {
        if (response.data?.access_token && response.data?.refresh_token) {
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            
            document.cookie = `access_token=${response.data.access_token}; path=/; max-age=86400; SameSite=Strict`;
            document.cookie = `refresh_token=${response.data.refresh_token}; path=/; max-age=604800; SameSite=Strict`;
            
            dispatch(loginSuccess({
              accessToken: response.data.access_token,
              refreshToken: response.data.refresh_token,
              email: response.data.email
            }));
            
            Toast.success('Login successful!', {
              autoCloseDuration: 1000,
              position: 'top-right'
            });
            
            const from = searchParams.get('from');
            const redirectPath = from || '/dashboard';
            
            return redirectWithDelay(redirectPath, 1500);
        }
      } else if (response.status === 401 && !response.message?.includes("không chính xác")) {
        Toast.warning('Your email address needs to be verified', {
          autoCloseDuration: 3000,
          position: 'top-right'
        });
        
        const encodedEmail = btoa(credentials.email);
        
        return redirectWithDelay(`otp-confirmation?email=${encodedEmail}&purpose=login`, 1500);
      } else {
        const errorMessage = response.message || 'Login failed';
        dispatch(loginFailure(errorMessage));
        Toast.error(errorMessage, {
          autoCloseDuration: 3000,
          position: 'top-right'
        });
        throw new Error(errorMessage || 'Đăng nhập thất bại');
      }
    } catch (error: unknown) {
      console.error('Login failed:', error);
      
      const errorMessage = 'Email or password is incorrect';
      dispatch(loginFailure(errorMessage));
      
      Toast.error(errorMessage, {
        autoCloseDuration: 3000,
        position: 'top-right'
      });
      
      throw new Error('Email hoặc mật khẩu không chính xác');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    Toast.success('Logged out successfully', {
      autoCloseDuration: 1000,
      position: 'top-right'
    });
    return redirectWithDelay('/login', 1000);
  };
  
  const handleRegister = async (userData: RegisterData) => {
    setIsLoading(true);
    
    try {
      const signupData: SignupRequest = {
        email: userData.email,
        username: userData.name,
        password: userData.password,
        confirm_password: userData.password,
        device_address: navigator.userAgent || 'unknown'
      };
      
      const response = await authApi.signup(signupData);
      
      if (response.status === 200 || response.status === 201) {
        Toast.success('Đăng ký thành công!', {
          autoCloseDuration: 1500,
          position: 'top-right'
        });
        
        const encryptedEmail = btoa(userData.email);
        
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
  
  const handleForgotPassword = async (email: string) => {
    setIsLoading(true);
    
    try {
      const response = await authApi.requestPasswordReset({ email });
      
      if (response.status === 200) {
        Toast.success('Link đặt lại mật khẩu đã được gửi!', {
          position: "top-right",
          autoCloseDuration: 3000,
        });
        
        const encryptedEmail = btoa(email);
        
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
  
  const handleOtpConfirmation = async (otp: string, email: string, purpose: string, encodedEmail: string) => {
    setIsLoading(true);
    
    try {
      const verificationData = {
        email: email,
        token: otp
      };
      
      const response = await authApi.verifyEmail(verificationData);
      
      if (response.status === 200) {
        Toast.success('Xác thực OTP thành công!', {
          position: "top-right",
          autoCloseDuration: 3000,
        });
        
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
    handleLogout,
    handleRegister,
    handleForgotPassword,
    handleResetPassword,
    handleOtpConfirmation,
    handleResendOtp
  };
};
