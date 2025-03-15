'use client';

import React from 'react';
import Alert from '@/components/molecules/alert';

interface NotificationAlertProps {
  message: string;
  description: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  closable?: boolean;
}

const NotificationAlert: React.FC<NotificationAlertProps> = ({
  message,
  description,
  variant = 'info',
  closable = true
}) => {
  return (
    <Alert
      message={message}
      description={description}
      variant={variant}
      showIcon
      closable={closable}
      withAnimation
      borderRadius="medium"
    />
  );
};

export default NotificationAlert;
