'use client';

import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faRobot, faUser, faCheck, faCheckDouble, faClock } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import Typography from '../atomic/typo';
import Avatar from '../atomic/avatar';

// Dynamically import ReactMarkdown to avoid SSR issues
const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });

export type MessageSender = 'user' | 'bot' | 'system';
export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'error';
export type MessageVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

export interface MessageProps {
  id: string;
  content: string | React.ReactNode;
  sender: MessageSender;
  timestamp?: Date;
  status?: MessageStatus;
  isTyping?: boolean;
  avatar?: string;
  name?: string;
  variant?: MessageVariant;
  size?: 'sm' | 'md' | 'lg';
  withAvatar?: boolean;
  withTimestamp?: boolean;
  withAnimation?: boolean;
  maxWidth?: string;
  isMarkdown?: boolean;
  position?: 'left' | 'right' | 'center';
  actions?: React.ReactNode;
  isHighlighted?: boolean;
  showName?: boolean;
  customClassName?: string;
  onClick?: () => void;
  onRetry?: () => void;
}


const Message: React.FC<MessageProps> = ({
  id,
  content,
  sender,
  timestamp = new Date(),
  status = 'sent',
  isTyping = false,
  avatar,
  name,
  variant = 'default',
  size = 'md',
  withAvatar = true,
  withTimestamp = true,
  withAnimation = true,
  maxWidth = '80%',
  isMarkdown = false,
  position,
  actions,
  isHighlighted = false,
  showName = false,
  customClassName = '',
  onClick,
  onRetry,
}) => {
  // Determine position based on sender if not explicitly set
  const messagePosition = position || (sender === 'user' ? 'right' : sender === 'bot' ? 'left' : 'center');

  // Get sender display name
  const senderName = name || (sender === 'bot' ? 'AI Assistant' : sender === 'user' ? 'You' : 'System');

  // Get avatar icon based on sender
  const avatarIcon = sender === 'bot' ? faRobot : sender === 'user' ? faUser : undefined;

  // Size classes
  const sizeClasses = {
    sm: 'py-1.5 px-2.5 text-xs',
    md: 'py-2 px-3 text-sm',
    lg: 'py-3 px-4 text-base',
  };

  // Variant classes
  const getVariantClasses = () => {
    // For user messages, always use primary unless explicitly specified
    if (sender === 'user' && variant === 'default') {
      return 'bg-[var(--color-primary)] text-white';
    }
    
    // For bot messages, use a light gray background
    if (sender === 'bot' && variant === 'default') {
      return 'bg-gray-100 text-[var(--text-primary)]';
    }
    
    // For system messages, use info style
    if (sender === 'system' && variant === 'default') {
      return 'bg-gray-200 text-gray-700 text-center';
    }
    
    // Explicitly specified variants
    switch (variant) {
      case 'primary':
        return 'bg-[var(--color-primary)] text-white';
      case 'secondary':
        return 'bg-[var(--color-secondary)] text-white';
      case 'success':
        return 'bg-[var(--color-success)] text-white';
      case 'warning':
        return 'bg-[var(--color-warning)] text-[var(--text-primary)]';
      case 'error':
        return 'bg-[var(--color-error)] text-white';
      case 'info':
        return 'bg-[var(--color-info)] text-white';
      default:
        return 'bg-gray-100 text-[var(--text-primary)]';
    }
  };

  // Border radius classes based on position
  const getBorderRadiusClasses = () => {
    switch (messagePosition) {
      case 'right':
        return 'rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-md';
      case 'left':
        return 'rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-md';
      case 'center':
        return 'rounded-2xl';
      default:
        return 'rounded-2xl';
    }
  };

  // Container classes
  const containerClasses = classNames(
    'flex w-full',
    {
      'justify-end': messagePosition === 'right',
      'justify-start': messagePosition === 'left',
      'justify-center': messagePosition === 'center',
    }
  );

  // Message bubble classes
  const messageBubbleClasses = classNames(
    'flex flex-col',
    sizeClasses[size],
    getVariantClasses(),
    getBorderRadiusClasses(),
    {
      'cursor-pointer': !!onClick,
      'ring-2 ring-[var(--color-primary)] ring-opacity-50': isHighlighted,
    },
    customClassName
  );

  // Status icon based on message status
  const getStatusIcon = (): IconDefinition => {
    switch (status) {
      case 'sent':
        return faCheck;
      case 'delivered':
      case 'read':
        return faCheckDouble;
      case 'sending':
        return faClock;
      default:
        return faCheck;
    }
  };

  // Format timestamp
  const formattedTime = () => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Typing animation for bot messages
  const renderTypingIndicator = () => {
    return (
      <div className="flex space-x-1">
        <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    );
  };

  // Render content with markdown support if needed
  const renderContent = () => {
    if (isTyping) return renderTypingIndicator();
    
    if (isMarkdown && typeof content === 'string') {
      return (
        <div className="markdown-content">
          <ReactMarkdown
            components={{
              p: (({ children }) => (
                <Typography.Text
                  size={size === 'sm' ? 'xs' : size === 'lg' ? 'base' : 'sm'}
                >
                  {children}
                </Typography.Text>
              )) as React.ComponentType<React.ComponentProps<'p'>>,

              a: (({ children, ...props }) => (
                <a
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                >
                  {children}
                </a>
              )) as React.ComponentType<React.ComponentProps<'a'>>,

              h1: (({ children, ...props }) => (
                <Typography.Heading
                  level={'h1'}
                  size="lg"
                  className="mt-2 mb-1"
                  {...props}
                >
                  {children}
                </Typography.Heading>
              )) as React.ComponentType<React.ComponentProps<'h1'>>,

              h2: (({ children, ...props }) => (
                <Typography.Heading
                  level={'h2'}
                  size="base"
                  className="mt-2 mb-1"
                  {...props}
                >
                  {children}
                </Typography.Heading>
              )) as React.ComponentType<React.ComponentProps<'h2'>>,

              h3: (({ children, ...props }) => (
                <Typography.Heading
                  level={'h3'}
                  size="sm"
                  className="mt-2 mb-1"
                  {...props}
                >
                  {children}
                </Typography.Heading>
              )) as React.ComponentType<React.ComponentProps<'h3'>>,

              code: (({ inline, children, ...props }) => (
                inline ? (
                  <code
                    className="px-1 py-0.5 bg-gray-700 bg-opacity-10 rounded text-xs"
                    {...props}
                  >
                    {children}
                  </code>
                ) : (
                  <pre className="p-2 bg-gray-700 bg-opacity-10 rounded text-xs mt-1 mb-1 overflow-x-auto">
                    <code {...props}>{children}</code>
                  </pre>
                )
              )) as React.ComponentType<React.ComponentProps<'code'> & { inline?: boolean }>,

              ul: (({ children, ...props }) => (
                <ul className="list-disc pl-5 my-1" {...props}>
                  {children}
                </ul>
              )) as React.ComponentType<React.ComponentProps<'ul'>>,

              ol: (({ children, ...props }) => (
                <ol className="list-decimal pl-5 my-1" {...props}>
                  {children}
                </ol>
              )) as React.ComponentType<React.ComponentProps<'ol'>>,

              li: (({ children, ...props }) => (
                <li className="my-0.5" {...props}>
                  {children}
                </li>
              )) as React.ComponentType<React.ComponentProps<'li'>>,

              blockquote: (({ children, ...props }) => (
                <blockquote
                  className="border-l-4 border-gray-300 pl-3 italic my-1 text-gray-600"
                  {...props}
                >
                  {children}
                </blockquote>
              )) as React.ComponentType<React.ComponentProps<'blockquote'>>,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      );
    }
    
    if (typeof content === 'string') {
      return (
        <Typography.Text size={size === 'sm' ? 'xs' : size === 'lg' ? 'base' : 'sm'}>
          {content}
        </Typography.Text>
      );
    }
    
    return content;
  };

  // Animation variants
  const messageVariants = {
    hidden: { 
      opacity: 0,
      y: 10,
      x: messagePosition === 'right' ? 10 : messagePosition === 'left' ? -10 : 0,
    },
    visible: { 
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.3,
      }
    }
  };

  return (
    <motion.div
      className={containerClasses}
      initial={withAnimation ? 'hidden' : undefined}
      animate={withAnimation ? 'visible' : undefined}
      variants={messageVariants}
      onClick={onClick}
      key={id}
    >
      {/* Avatar (for left-aligned messages) */}
      {withAvatar && messagePosition === 'left' && (
        <div className="flex-shrink-0 mr-2 mt-1">
          <Avatar
            src={avatar}
            name={name || 'AI'}
            icon={avatarIcon}
            size="sm"
            variant="default"
            shape="circle"
          />
        </div>
      )}

      <div style={{ maxWidth }} className="flex flex-col mb-2">
        {/* Sender name - show above message if enabled */}
        {showName && messagePosition !== 'center' && (
          <Typography.Text 
            size="xs" 
            variant="muted" 
            className={`${messagePosition === 'right' ? 'text-right' : 'text-left'} mb-1`}
          >
            {senderName}
          </Typography.Text>
        )}

        {/* Message bubble */}
        <div className={messageBubbleClasses}>
          {renderContent()}

          {/* Message timestamp and status */}
          {withTimestamp && (
            <div className={`flex items-center justify-end mt-1 ${messagePosition === 'center' ? 'justify-center' : ''}`}>
              <Typography.Text 
                size="xs" 
                variant="muted" 
                className={messagePosition === 'right' ? 'text-white text-opacity-70' : 'text-gray-500'}
              >
                {formattedTime()}
              </Typography.Text>
              
              {messagePosition === 'right' && (
                <span className="ml-1 text-white text-opacity-70">
                  <FontAwesomeIcon icon={getStatusIcon()} size="xs" />
                </span>
              )}
            </div>
          )}
        </div>

        {/* Message actions */}
        {actions && (
          <div className={`mt-1 ${messagePosition === 'right' ? 'self-end' : 'self-start'}`}>
            {actions}
          </div>
        )}

        {/* Retry button for error status */}
        {status === 'error' && onRetry && (
          <div className={`mt-1 ${messagePosition === 'right' ? 'self-end' : 'self-start'}`}>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onRetry();
              }}
              className="text-xs text-[var(--color-primary)] hover:underline"
            >
              Retry
            </button>
          </div>
        )}
      </div>

      {/* Avatar (for right-aligned messages) */}
      {withAvatar && messagePosition === 'right' && (
        <div className="flex-shrink-0 ml-2 mt-1">
          <Avatar
            src={avatar}
            name={name || 'You'}
            icon={avatarIcon}
            size="sm"
            variant="default"
            shape="circle"
          />
        </div>
      )}
    </motion.div>
  );
};

export default Message;