// Remove the direct import since we're not actually using the yaml parser in this implementation
// import yaml from 'js-yaml';

interface LoginTextConfig {
  login: {
    heading: string;
    subheading: string;
    sidebar: {
      title: string;
      description: string;
    };
    form: {
      email: {
        label: string;
        placeholder: string;
      };
      password: {
        label: string;
        placeholder: string;
      };
      remember: string;
      forgot_password: string;
      submit: string;
    };
    divider: string;
    social: {
      google: string;
      facebook: string;
    };
    signup: {
      text: string;
      link: string;
    };
  };
}

// Default English values
const enConfig: LoginTextConfig = {
  login: {
    heading: "Welcome Back",
    subheading: "Please sign in to continue",
    sidebar: {
      title: "Success starts here",
      description: "Log in to access the most effective management platform for your business"
    },
    form: {
      email: {
        label: "Email Address",
        placeholder: "Enter your email"
      },
      password: {
        label: "Password",
        placeholder: "Enter your password"
      },
      remember: "Remember me",
      forgot_password: "Forgot password?",
      submit: "Sign In"
    },
    divider: "Or sign in with",
    social: {
      google: "Google",
      facebook: "Facebook"
    },
    signup: {
      text: "Don't have an account?",
      link: "Sign Up"
    }
  }
};

// Vietnamese values
const viConfig: LoginTextConfig = {
  login: {
    heading: "Chào Mừng Trở Lại",
    subheading: "Vui lòng đăng nhập để tiếp tục",
    sidebar: {
      title: "Thành công bắt đầu từ đây",
      description: "Đăng nhập để truy cập vào nền tảng quản lý hiệu quả nhất cho doanh nghiệp của bạn"
    },
    form: {
      email: {
        label: "Địa chỉ Email",
        placeholder: "Nhập email của bạn"
      },
      password: {
        label: "Mật khẩu",
        placeholder: "Nhập mật khẩu của bạn"
      },
      remember: "Ghi nhớ đăng nhập",
      forgot_password: "Quên mật khẩu?",
      submit: "Đăng Nhập"
    },
    divider: "Hoặc đăng nhập với",
    social: {
      google: "Google",
      facebook: "Facebook"
    },
    signup: {
      text: "Chưa có tài khoản?",
      link: "Đăng Ký Ngay"
    }
  }
};

// Store configurations by locale
const configByLocale: Record<string, LoginTextConfig> = {
  en: enConfig,
  vi: viConfig
};

// Define supported locales explicitly from our config
export const supportedLocales: string[] = Object.keys(configByLocale);

/**
 * Server-side and client-side config loading needs to be deterministic
 * to avoid hydration errors
 */
export const getClientConfig = (locale = 'en'): LoginTextConfig => {
  return configByLocale[locale] || configByLocale['en'];
};

// Export the config directly for static rendering
export const configs = configByLocale;

export type { LoginTextConfig };
