import React from 'react';
import { cn } from './Button';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-academic-paper border border-academic-border p-6 shadow-academic transition-all duration-300",
          className
        )}
        {...props}
      />
    );
  }
)
Card.displayName = "Card"
