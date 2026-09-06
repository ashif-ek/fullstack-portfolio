'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  fullWidth?: boolean;
}

export default function FadeIn({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = '',
  fullWidth = false
}: FadeInProps) {
  const getInitialY = () => {
    if (direction === 'up') return 20;
    if (direction === 'down') return -20;
    return 0;
  };

  const getInitialX = () => {
    if (direction === 'left') return 20;
    if (direction === 'right') return -20;
    return 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: getInitialY(), x: getInitialX() }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}
