'use client';

import React, { useEffect, Suspense } from 'react';
import RegistrationCompleteForm from '@/components/auth/registrationCompleteForm';
import { Toast } from '@/components/molecules/alert';
import AuthContentWrapper from '@/components/auth/authContentWrapper';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

function LoadingFallback() {
  return <div className="flex justify-center items-center p-4">Loading...</div>;
}

function RegistrationCompleteContent() {
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
        <RegistrationCompleteForm 
            onContinue={handleContinueToLogin}
            onRegisterAnother={handleRegisterAnother}
        />
    );
}

export default function RegistrationCompletePage() {
    return (
        <AuthContentWrapper>
            <Suspense fallback={<LoadingFallback />}>
                <RegistrationCompleteContent />
            </Suspense>
        </AuthContentWrapper>
    );
}
