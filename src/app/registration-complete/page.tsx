'use client';

import React from 'react';
import RegistrationCompleteForm from '@/components/auth/registrationCompleteForm';
import useRegistrationComplete from '@/hooks/use-registrationComplete';
import { Toast } from '@/components/molecules/alert';

export default function RegistrationCompletePage() {
    const { handleContinueToLogin, handleRegisterAnother } = useRegistrationComplete();

    // Show initial success toast
    Toast.success('Đăng ký thành công!', {
        position: "top-right",
        autoCloseDuration: 3000,
    });

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-20">
            <RegistrationCompleteForm 
                onContinue={handleContinueToLogin}
                onRegisterAnother={handleRegisterAnother}
            />
        </div>
    );
}
