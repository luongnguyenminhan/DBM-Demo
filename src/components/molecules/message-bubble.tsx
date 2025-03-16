'use client';

import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckDouble, faClock, faCopy, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Typography from '../atomic/typo';
import Icon from '../atomic/icon';
import Avatar from '../atomic/avatar';
import { Toast } from './alert';

const { Text } = Typography;

export type MessageType = 'text' | 'image' | 'file' | 'audio' | 'video' | 'code' | 'system';
export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'error';
export type MessageAlignment = 'left' | 'right';
export type MessageVariant = 'primary' | 'secondary' | 'light' | 'dark' | 'system';
export type MessageSize = 'small' | 'medium' | 'large';

export interface MessageBubbleProps {
  sender?: {
    name: string;
    avatar?: string;
    initial?: string;
  };
  message: string | React.ReactNode;
  type?: MessageType;
  status?: MessageStatus;
  timestamp?: string | Date;
  alignment?: MessageAlignment;
  variant?: MessageVariant;
  size?: MessageSize;
  showAvatar?: boolean;
  showSender?: boolean;
  showStatus?: boolean;
  showActions?: boolean;
  isMarkdown?: boolean;
  isCopyable?: boolean;
  actions?: Array<{
    icon: IconDefinition;
    label: string;
    onClick: () => void;
  }>;
  customClassName?: string;
  className?: string;
  withAnimation?: boolean;
  animationDelay?: number;
  replyTo?: {
    sender: string;
    message: string;
  };
  customIcon?: IconDefinition;
  isTyping?: boolean;
  maxWidth?: string;
  id?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  sender,
  message,
  status = 'sent',
  timestamp,
  alignment = 'left',
  variant = 'primary',
  size = 'medium',
  showAvatar = true,
  showSender = true,
  showStatus = true,
  showActions = false,
  isCopyable = false,
  actions = [],
  customClassName = '',
  className,
  withAnimation = true,
  animationDelay = 0,
  replyTo,
  isTyping = false,
  maxWidth = '75%',
  id,
}) => {
  const [showActionsMenu, setShowActionsMenu] = React.useState(false);
  
  // Determine if the message is from the current user based on alignment
  const isCurrentUser = alignment === 'right';
  
  // Size classes for padding and text
  const sizeClasses = {
    small: 'p-2 text-xs',
    medium: 'p-3 text-sm',
    large: 'p-4 text-base',
  };
  
  // Variant background classes
  const variantBackgroundClasses = {
    primary: isCurrentUser 
      ? 'bg-[var(--color-primary)] text-white' 
      : 'bg-gray-100 text-[var(--text-primary)]',
    secondary: isCurrentUser 
      ? 'bg-[var(--color-secondary)] text-white' 
      : 'bg-blue-50 text-[var(--text-primary)]',
    light: 'bg-white text-[var(--text-primary)] border border-gray-200',
    dark: 'bg-gray-800 text-white',
    system: 'bg-gray-50 text-[var(--text-secondary)] border border-gray-100',
  };
  
  // Alignment classes
  const alignmentContainerClasses = {
    left: 'justify-start',
    right: 'justify-end',
  };
  
  // Message container classes
  const messageContainerClasses = classNames(
    'flex mb-4 max-w-full',
    alignmentContainerClasses[alignment],
  );
  
  // Avatar margin classes
  const avatarMarginClasses = {
    left: 'mr-2',
    right: 'ml-2 order-1',
  };
  
  // Message bubble classes
  const messageBubbleClasses = classNames(
    'rounded-lg relative',
    sizeClasses[size],
    variantBackgroundClasses[variant],
    {
      'rounded-tl-none': alignment === 'left' && !replyTo,
      'rounded-tr-none': alignment === 'right' && !replyTo,
    },
    customClassName,
    className
  );
  
  // Format timestamp
  const formattedTimestamp = () => {
    if (!timestamp) return null;
    
    let time: string;
    if (typeof timestamp === 'string') {
      time = timestamp;
    } else {
      // Format Date object
      const now = new Date();
      const msgDate = new Date(timestamp);
      
      // If today, just show time
      if (
        now.getDate() === msgDate.getDate() &&
        now.getMonth() === msgDate.getMonth() &&
        now.getFullYear() === msgDate.getFullYear()
      ) {
        time = msgDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else {
        time = msgDate.toLocaleDateString([], { 
          month: 'short', 
          day: 'numeric',
          hour: '2-digit', 
          minute: '2-digit' 
        });
      }
    }
    
    return time;
  };
  
  // Status icon
  const statusIcon = () => {
    switch (status) {
      case 'sending':
        return faClock;
      case 'sent':
        return faCheck;
      case 'delivered':
      case 'read':
        return faCheckDouble;
      case 'error':
        return 'error'; // This will be handled differently
      default:
        return faCheck;
    }
  };
  
  const statusColor = () => {
    switch (status) {
      case 'read':
        return 'text-blue-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-gray-400';
    }
  };
  
  // Handle copy message
  const handleCopy = () => {
    if (typeof message === 'string') {
      navigator.clipboard.writeText(message)
        .then(() => Toast.success('Message copied to clipboard'))
        .catch(() => Toast.error('Failed to copy message'));
    }
  };
  
  // Animation variants for message bubble
  const bubbleVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      x: alignment === 'left' ? -20 : 20
    },
    visible: { 
      opacity: 1,
      scale: 1,
      x: 0
    },
    exit: {
      opacity: 0,
      scale: 0.8,
    }
  };
  
  // Typing indicator animation
  const typingIndicator = (
    <div className="flex space-x-2 px-1 py-2 items-center">
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
  );
  
  // Reply quote styling
  const renderReplyQuote = () => {
    if (!replyTo) return null;
    
    return (
      <div className="border-l-2 border-gray-300 pl-2 mb-2 py-1 text-sm bg-black bg-opacity-5 rounded">
        <Text size="xs" weight="medium">{replyTo.sender}</Text>
        <Text size="xs" variant="muted" className="line-clamp-2">{replyTo.message}</Text>
      </div>
    );
  };
  
  // Render the contents of the message based on type
  const renderMessage = () => {
    if (isTyping) {
      return typingIndicator;
    }
    
    if (typeof message === 'string') {
      return <Text size={size === 'small' ? 'xs' : size === 'large' ? 'base' : 'sm'}>{message}</Text>;
    }
    
    return message;
  };

  return (
    <div className={messageContainerClasses} id={id}>
      {alignment === 'left' && showAvatar && (
        <div className={`flex-shrink-0 ${avatarMarginClasses[alignment]}`}>
          <Avatar 
            src={sender?.avatar} 
            name={sender?.name || ''} 
            size="sm"
            withAnimation
            variant={variant === 'primary' ? 'primary' : 'default'}
          />
        </div>
      )}
      
      <div style={{ maxWidth }}>
        {alignment === 'left' && showSender && sender?.name && (
          <Text size="xs" variant="muted" className="ml-1 mb-1">
            {sender.name}
          </Text>
        )}
        
        <motion.div
          className={messageBubbleClasses}
          variants={withAnimation ? bubbleVariants : undefined}
          initial={withAnimation ? 'hidden' : undefined}
          animate={withAnimation ? 'visible' : undefined}
          exit={withAnimation ? 'exit' : undefined}
          transition={{ 
            duration: 0.3,
            delay: animationDelay,
            type: 'spring',
            stiffness: 500,
            damping: 40
          }}
          onMouseEnter={() => setShowActionsMenu(true)}
          onMouseLeave={() => setShowActionsMenu(false)}
        >
          {renderReplyQuote()}
          {renderMessage()}
          
          {(timestamp || (isCurrentUser && showStatus)) && (
            <div className="flex items-center justify-end space-x-1 mt-1 text-xs text-gray-400">
              {formattedTimestamp() && (
                <span className="text-[10px]">{formattedTimestamp()}</span>
              )}
              {isCurrentUser && showStatus && (
                <span className={`ml-1 ${statusColor()}`}>
                  <FontAwesomeIcon icon={statusIcon() as IconDefinition} size="xs" />
                </span>
              )}
            </div>
          )}
          
          {showActionsMenu && (showActions || isCopyable || actions.length > 0) && (
            <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-white shadow-md rounded-full flex p-1">
              {isCopyable && (
                <button 
                  onClick={handleCopy} 
                  className="p-1 text-gray-500 hover:text-gray-700"
                  aria-label="Copy message"
                >
                  <Icon icon={faCopy} size="xs" />
                </button>
              )}
              
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className="p-1 text-gray-500 hover:text-gray-700"
                  aria-label={action.label}
                >
                  <Icon icon={action.icon} size="xs" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </div>
      
      {alignment === 'right' && showAvatar && (
        <div className={`flex-shrink-0 ${avatarMarginClasses[alignment]}`}>
          <Avatar 
            src={sender?.avatar} 
            name={sender?.name || ''} 
            size="sm"
            withAnimation
          />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
