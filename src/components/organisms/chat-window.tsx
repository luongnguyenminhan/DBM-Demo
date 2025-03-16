'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import MessageBubble, { MessageBubbleProps } from '../molecules/message-bubble';
import ChatInput from '../molecules/chatInput';
import Typography from '../atomic/typo';
import Card from '../atomic/card';
import { IconDefinition, faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface ChatMessage extends Omit<MessageBubbleProps, 'id'> {
  id: string;
  message: string;
  timestamp: Date | string;
}

export interface ChatWindowProps {
  messages?: ChatMessage[];
  onSendMessage?: (message: string) => void;
  onSendAttachment?: (files: FileList) => void;
  isLoading?: boolean;
  showTypingIndicator?: boolean;
  title?: string;
  subtitle?: string;
  emptyStateMessage?: string;
  emptyStateIcon?: IconDefinition;
  withAnimation?: boolean;
  variant?: 'default' | 'primary' | 'secondary' | 'outlined' | 'minimal';
  size?: 'small' | 'medium' | 'large';
  withAttachmentButton?: boolean;
  withVoiceButton?: boolean;
  maxHeight?: string;
  className?: string;
  customClassName?: string;
  headerAction?: React.ReactNode;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages = [],
  onSendMessage,
  onSendAttachment,
  isLoading = false,
  showTypingIndicator = false,
  title = 'Chat',
  subtitle,
  emptyStateMessage = 'No messages yet. Start the conversation!',
  emptyStateIcon,
  withAnimation = true,
  variant = 'default',
  size = 'medium',
  withAttachmentButton = true,
  withVoiceButton = false,
  maxHeight = '600px',
  className,
  customClassName,
  headerAction,
}) => {
  const [message, setMessage] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, showTypingIndicator]);
  
  // Handle sending a message
  const handleSendMessage = (text: string) => {
    if (text.trim() !== '' && onSendMessage) {
      onSendMessage(text);
      setMessage('');
    }
  };
  
  // Handle sending attachments
  const handleSendAttachment = (files: FileList) => {
    if (onSendAttachment) {
      onSendAttachment(files);
    }
  };
  
  // Size classes
  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };
  
  // Container classes
  const containerClasses = classNames(
    'flex flex-col h-full',
    sizeClasses[size],
    customClassName,
    className
  );
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  // Render the empty state
  const renderEmptyState = () => {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center text-gray-500">
        {emptyStateIcon && (
          <motion.div
            className="mb-4 text-3xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Placeholder for icon component */}
            <span className="opacity-50">
                <FontAwesomeIcon icon={emptyStateIcon} />
            </span>
          </motion.div>
        )}
        <Typography.Text variant="muted" size={size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'base'}>
          {emptyStateMessage}
        </Typography.Text>
      </div>
    );
  };
  
  // Render the messages
  const renderMessages = () => {
    if (messages.length === 0 && !showTypingIndicator) {
      return renderEmptyState();
    }
    
    return (
      <div 
        className={`flex-1 overflow-y-auto p-4 space-y-4`} 
        style={{ maxHeight }}
        ref={messagesContainerRef}
      >
        <AnimatePresence mode="sync">
          {messages.map((msg, index) => (
            <MessageBubble
              key={msg.id}
              {...msg}
              withAnimation={withAnimation}
              animationDelay={index * 0.1}
            />
          ))}
          
          {/* Typing indicator */}
          {showTypingIndicator && (
            <MessageBubble
              message=""
              isTyping
              alignment="left"
              variant="light"
              withAnimation
              animationDelay={0.2}
              sender={{
                name: 'AI Assistant',
                avatar: '/ai-avatar.png',
              }}
            />
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
    );
  };

  return (
    <motion.div
      className={containerClasses}
      variants={withAnimation ? containerVariants : undefined}
      initial={withAnimation ? 'hidden' : undefined}
      animate={withAnimation ? 'visible' : undefined}
      transition={{ duration: 0.3 }}
    >
      <Card
        withShadow
        title={title}
        subtitle={subtitle}
        headerAction={headerAction}
        withBorder
        isFullWidth
        className="flex flex-col h-full"
      >
        {/* Messages Container */}
        {renderMessages()}
        
        {/* Input Area */}
        <div className="p-4 border-t border-gray-200">
          <ChatInput
            value={message}
            onChange={(value) => setMessage(value)}
            onSend={handleSendMessage}
            onAttachmentUpload={handleSendAttachment}
            isDisabled={isLoading}
            isLoading={isLoading}
            isFullWidth
            withAttachButton={withAttachmentButton}
            withVoiceButton={withVoiceButton}
            sendButtonIcon={isLoading ? faSpinner : faPaperPlane}
            withAnimation
            size={size === 'small' ? 'small' : size === 'large' ? 'large' : 'medium'}
            variant={variant === 'outlined' ? 'outlined' : 'default'}
          />
        </div>
      </Card>
    </motion.div>
  );
};

export default ChatWindow;
