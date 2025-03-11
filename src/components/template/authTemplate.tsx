"use client";

import React from 'react';

interface AuthTemplateProps {
  children: React.ReactNode;
  variant?: 'default' | 'success';
  confettiParticles?: Array<{
    backgroundColor: string;
    top: string;
    left: string;
    animationDuration: string;
    animationDelay: string;
  }>;
}

export default function AuthTemplate({
  children,
  variant = 'default',
  confettiParticles,
}: AuthTemplateProps) {
  const borderColor = variant === 'success' ? 'border-green-700' : 'border-gray-700';
  const fromGradient = variant === 'success' ? 'from-green-100' : 'from-purple-100';
  const toGradient = variant === 'success' ? 'to-teal-200' : 'to-indigo-200';
  const fromGradient2 = variant === 'success' ? 'from-blue-100' : 'from-blue-100';
  const toGradient2 = variant === 'success' ? 'to-green-100' : 'to-pink-100';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 relative overflow-hidden">
      {/* Abstract Shape Elements */}
      <div className={`absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br ${fromGradient} ${toGradient} rounded-full opacity-70 blur-3xl`}></div>
      <div className={`absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr ${fromGradient2} ${toGradient2} rounded-full opacity-70 blur-3xl`}></div>
      
      {/* Decorative Patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className={`absolute top-10 left-10 w-40 h-40 border-2 ${borderColor} rounded-full`}></div>
        <div className={`absolute bottom-10 right-10 w-60 h-60 border-2 ${borderColor} rounded-full`}></div>
        <div className={`absolute top-1/2 right-1/3 w-20 h-20 border-2 ${borderColor} rounded-full`}></div>
      </div>

      {/* Confetti effect for success variant */}
      {confettiParticles && (
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
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Animation keyframes for confetti */}
      {confettiParticles && (
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
      )}
    </div>
  );
}
