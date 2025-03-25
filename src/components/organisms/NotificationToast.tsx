'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface NotificationToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

const NotificationToast: React.FC<NotificationToastProps> = ({ message, type }) => {
  const bgColorClass = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  }[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-md ${bgColorClass}`}
    >
      {message}
    </motion.div>
  );
};

export default NotificationToast;
