import React from 'react';

interface AuthContentWrapperProps {
  children: React.ReactNode;
}

export default function AuthContentWrapper({ children }: AuthContentWrapperProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-20">
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-2/5">
        {children}
      </div>
    </div>
  );
}
