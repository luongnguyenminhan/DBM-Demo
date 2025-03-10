'use client';

import { useMemo } from 'react';
import AuthLayout from '@/components/layouts/AuthLayout';

export default function RegistrationCompleteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Generate confetti positions using useMemo to ensure consistency
  const confettiParticles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      backgroundColor: ['#FF5252', '#FFEB3B', '#4CAF50', '#2196F3', '#9C27B0'][i % 5],
      top: `${(i * 2.5) % 100}%`,
      left: `${(i * 7.3) % 100}%`,
      animationDuration: `${3 + (i % 5)}s`,
      animationDelay: `${(i * 0.1) % 2}s`,
    }));
  }, []);

  return (
    <AuthLayout variant="success" confettiParticles={confettiParticles}>
      {children}
    </AuthLayout>
  );
}
