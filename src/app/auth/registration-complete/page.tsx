'use client';

import React, { useEffect } from 'react';
import RegistrationCompleteForm from '@/components/auth/registrationCompleteForm';
import { Toast } from '@/components/molecules/alert';
import AuthContentWrapper from '@/components/auth/authContentWrapper';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

export default function RegistrationCompletePage() {
    const { redirectWithDelay } = useAuthRedirect();

    useEffect(() => {
        // Show initial success toast
        Toast.success('Đăng ký thành công!', {
            position: "top-right",
            autoCloseDuration: 3000,
        });
    }, []);

    const handleContinueToLogin = () => {
        redirectWithDelay('login', 500);
    };

    const handleRegisterAnother = () => {
        redirectWithDelay('register', 500);
    };

    return (
        <AuthContentWrapper>
            <RegistrationCompleteForm 
                onContinue={handleContinueToLogin}
                onRegisterAnother={handleRegisterAnother}
            />
        </AuthContentWrapper>
    );
}
