import React from 'react';
import classNames from 'classnames';

interface ScrollBarProps {
  children: React.ReactNode;
  className?: string;
}

const ScrollBar: React.FC<ScrollBarProps> = ({ children, className }) => {
  return (
    <div
      className={classNames(
        'overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent',
        'hover:scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full',
        className
      )}
    >
      {children}
    </div>
  );
};

export default ScrollBar;
