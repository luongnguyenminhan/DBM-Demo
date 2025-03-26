import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'var(--color-primary)',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex justify-center items-center p-4 ${className}`}>
      <div 
        className={`${sizeClasses[size]} border-4 border-t-transparent border-solid rounded-full animate-spin`}
        style={{ borderColor: `transparent ${color} ${color} ${color}` }}
        data-testid="loading-spinner"
      ></div>
    </div>
  );
};

export default LoadingSpinner;
