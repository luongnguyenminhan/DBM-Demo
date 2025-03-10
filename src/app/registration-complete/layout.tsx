'use client';

import { useMemo } from 'react';

export default function RegistrationCompleteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Generate confetti positions using useMemo to ensure consistency
  const confettiParticles = useMemo(() => {
    // Use a deterministic approach instead of random
    return Array.from({ length: 40 }).map((_, i) => ({
      backgroundColor: ['#FF5252', '#FFEB3B', '#4CAF50', '#2196F3', '#9C27B0'][i % 5],
      top: `${(i * 2.5) % 100}%`,
      left: `${(i * 7.3) % 100}%`,
      animationDuration: `${3 + (i % 5)}s`,
      animationDelay: `${(i * 0.1) % 2}s`,
    }));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 relative overflow-hidden">
      {/* Abstract Shape Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-green-100 to-teal-200 rounded-full opacity-70 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-blue-100 to-green-100 rounded-full opacity-70 blur-3xl"></div>
      
      {/* Decorative Patterns - Success-themed */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 border-2 border-green-700 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 border-2 border-green-700 rounded-full"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 border-2 border-green-700 rounded-full"></div>
      </div>
      
      {/* Confetti effect with deterministic positions */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {confettiParticles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: particle.backgroundColor,
              top: particle.top,
              left: particle.left,
              animation: `fall ${particle.animationDuration} linear ${particle.animationDelay} infinite`
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Animation keyframes for confetti */}
      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
