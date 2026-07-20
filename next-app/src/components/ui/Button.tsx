import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const buttonClasses = "inline-flex items-center justify-center px-6 py-2 border border-academic-primary text-academic-primary font-medium transition-all duration-300 hover:bg-academic-primary hover:text-white dark:hover:text-black focus:outline-none focus:ring-2 focus:ring-academic-accent cursor-pointer";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonClasses, className)}
        {...props}
      />
    );
  }
)
Button.displayName = "Button"
