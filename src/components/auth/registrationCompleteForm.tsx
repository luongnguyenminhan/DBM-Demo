'use client';

import React from 'react';
import Button from '../atomic/button';
import Typography from '../atomic/typo';
import { faCheckCircle, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import AuthTemplate from './authTemplate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const { Heading, Text } = Typography;

interface RegistrationCompleteFormProps {
  onContinue?: () => void;
  onRegisterAnother?: () => void;
}

const RegistrationCompleteForm: React.FC<RegistrationCompleteFormProps> = ({ 
  onContinue,
  onRegisterAnother
}) => {
  return (
    <AuthTemplate
      sideTitle="Success!"
      sideDescription="Chúc mừng bạn đã đăng ký thành công và trở thành thành viên của Meobeo.ai"
      sideTag="Meobeo.ai"
    >
      <div className="flex flex-col items-center justify-center py-8">
        <div className="text-green-500 mb-6">
          <FontAwesomeIcon icon={faCheckCircle} className="text-7xl" />
        </div>
        
        <div className="text-center mb-8">
          <Heading level="h1" size="2xl" withGradient className="mb-4">
            Đăng Ký Thành Công
          </Heading>
          <Text variant="secondary" size="base" className="max-w-md">
            Bạn đã đăng ký tài khoản thành công. Tài khoản của bạn đã sẵn sàng để sử dụng.
          </Text>
        </div>

        <div className="space-y-4 w-full max-w-sm">
          <Button
            variant="gradient"
            isFullWidth
            size="large"
            rightIcon={faSignInAlt}
            rounded
            onClick={onContinue}
          >
            <div className="flex items-center justify-center">
              Đăng Nhập Ngay
            </div>
          </Button>
          
          <Button
            variant="outline"
            isFullWidth
            size="large"
            rightIcon={faUserPlus}
            rounded
            onClick={onRegisterAnother}
          >
            <div className="flex items-center justify-center">
              Đăng Ký Tài Khoản Khác
            </div>
          </Button>
        </div>
        
        <div className="mt-8 text-center">
          <Text variant="secondary" size="sm">
            Gặp vấn đề khi đăng nhập?{' '}
            <Text
              asLink
              href="/help"
              variant="primary"
              size="sm"
              customClassName="hover:underline font-medium"
            >
              Liên hệ hỗ trợ
            </Text>
          </Text>
        </div>
      </div>
    </AuthTemplate>
  );
};

export default RegistrationCompleteForm;
