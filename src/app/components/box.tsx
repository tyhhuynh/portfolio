import React from 'react';

interface boxProps {
  children: React.ReactNode;
  className?: string;
}

const Box = ({ children, className = '' }: boxProps) => {
  return (
    <div
      className={`p-4 rounded-lg bg-secondary hover:bg-accent transition-colors duration-200 ${className}`}
    >
      {children}
    </div>
  );
};

export default Box;
