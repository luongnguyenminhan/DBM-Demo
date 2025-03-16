'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import { 
  faRobot, 
  faSpinner, 
  faTimes, 
  faArrowDown
} from '@fortawesome/free-solid-svg-icons';

import Card from '@/components/atomic/card';
import Button from '@/components/atomic/button';
import Typography from '@/components/atomic/typo';
import Avatar from '@/components/atomic/avatar';
import Message, { MessageSender } from '@/components/atomic/message';
import ChatInput from '@/components/molecules/ChatInput';
import Icon, { IconButton } from '@/components/atomic/icon';
import Tooltip from '@/components/atomic/tooltip';

export interface ChatMessage {
  id: string;
  content: string;
  sender: MessageSender;
  timestamp: Date;
  isTyping?: boolean;
}

export interface ChatSectionProps {
  messages?: ChatMessage[];
  title?: string;
  subtitle?: string;
  withAnimation?: boolean;
  className?: string;
  customClassName?: string;
  withCard?: boolean;
  withHeader?: boolean;
  withAvatar?: boolean;
  onSendMessage?: (message: string) => void;
  onClearChat?: () => void;
  isTyping?: boolean;
  userAvatar?: string;
  botAvatar?: string;
  loading?: boolean;
  emptyStateMessage?: string;
  suggestedPrompts?: string[];
  onSuggestedPromptClick?: (prompt: string) => void;
  welcomeMessage?: string;
  height?: string;
  showScrollToBottom?: boolean;
  withAttachments?: boolean;
  withVoiceInput?: boolean;
}

const ChatSection: React.FC<ChatSectionProps> = ({
  messages = [],
  title = 'Trợ lý Nghề nghiệp AI Enterviu',
  subtitle = 'Hỏi tôi bất cứ điều gì về nghề nghiệp, kỹ năng hoặc tìm kiếm việc làm',
  withAnimation = true,
  className,
  customClassName,
  withCard = true,
  withHeader = true,
  withAvatar = true,
  onSendMessage,
  onClearChat,
  isTyping = false,
  userAvatar,
  botAvatar,
  loading = false,
  emptyStateMessage = "Tôi là trợ lý nghề nghiệp AI của Enterviu. Tôi có thể giúp bạn khám phá con đường sự nghiệp, nâng cao kỹ năng và xây dựng CV ấn tượng.",
  suggestedPrompts = [
    "Công việc nào phù hợp với kỹ năng của tôi?",
    "Giúp tôi chuẩn bị cho buổi phỏng vấn",
    "Làm thế nào để cải thiện CV của tôi?",
    "Tôi nên phát triển kỹ năng nào?",
  ],
  onSuggestedPromptClick,
  welcomeMessage = "Xin chào! Tôi là Trợ lý Nghề nghiệp AI của Enterviu. Tôi có thể giúp gì cho hành trình sự nghiệp của bạn hôm nay?",
  height = '600px',
  showScrollToBottom = true,
  withAttachments = true,
  withVoiceInput = true,
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Tin nhắn mặc định nếu không có
  const defaultMessages: ChatMessage[] = [
    {
      id: '1',
      content: welcomeMessage,
      sender: 'bot',
      timestamp: new Date(Date.now() - 60000), // 1 phút trước
    }
  ];

  const displayMessages = messages.length > 0 ? messages : defaultMessages;

  // Cuộn xuống dưới khi có tin nhắn mới
  useEffect(() => {
    if (messagesEndRef.current && !showScrollButton) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [displayMessages, isTyping, showScrollButton]);

  // Kiểm tra vị trí cuộn để hiển thị/ẩn nút cuộn xuống dưới
  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    }
  };

  // Thêm trình lắng nghe sự kiện cuộn
  useEffect(() => {
    const messagesContainer = messagesContainerRef.current;
    if (messagesContainer) {
      messagesContainer.addEventListener('scroll', handleScroll);
      return () => messagesContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Cuộn xuống dưới
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Xử lý gửi tin nhắn
  const handleSend = (message: string) => {
    if (message.trim() && onSendMessage) {
      onSendMessage(message.trim());
      setInputMessage('');
    }
  };

  // Xử lý thay đổi đầu vào
  const handleInputChange = (value: string) => {
    setInputMessage(value);
  };

  // Xử lý khi nhấp vào gợi ý
  const handleSuggestedPromptClick = (prompt: string) => {
    if (onSuggestedPromptClick) {
      onSuggestedPromptClick(prompt);
    } else {
      handleSend(prompt);
    }
  };

  // Biến thể hoạt ảnh
  const chatVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Hiển thị tin nhắn hoặc trạng thái đang tải
  const renderMessages = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Icon icon={faSpinner} size="xl" className="animate-spin mb-4" />
            <Typography.Text>Đang tải cuộc trò chuyện...</Typography.Text>
          </div>
        </div>
      );
    }

    return (
      <>
        {displayMessages.map((message) => (
          <Message
            key={message.id}
            id={message.id}
            content={message.content}
            sender={message.sender}
            timestamp={message.timestamp}
            withAvatar={withAvatar}
            avatar={message.sender === 'user' ? userAvatar : botAvatar}
            isTyping={message.isTyping}
            withAnimation
          />
        ))}
        {isTyping && (
          <Message
            id="typing"
            content=""
            sender="bot"
            timestamp={new Date()}
            withAvatar={withAvatar}
            avatar={botAvatar}
            isTyping={true}
            withAnimation
          />
        )}
        <div ref={messagesEndRef} />
      </>
    );
  };

  // Hiển thị gợi ý câu hỏi
  const renderSuggestedPrompts = () => {
    if (displayMessages.length > 1) return null;

    return (
      <div className="mt-4">
        <Typography.Text variant="muted" className="mb-2">
          Thử hỏi:
        </Typography.Text>
        <div className="flex flex-wrap gap-2">
          {suggestedPrompts.map((prompt, index) => (
            <Button
              key={index}
              variant="outline"
              size="small"
              onClick={() => handleSuggestedPromptClick(prompt)}
              rounded
            >
              {prompt}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  // Hiển thị trạng thái trống
  const renderEmptyState = () => {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <Avatar icon={faRobot} shape="circle" size="xl" withAnimation withShadow className="mb-4" />
        <Typography.Heading level="h3" size="lg" className="mb-2">
          Chào mừng đến với ENTERVIU
        </Typography.Heading>
        <Typography.Text variant="muted" className="mb-6 max-w-md">
          {emptyStateMessage}
        </Typography.Text>
        {renderSuggestedPrompts()}
      </div>
    );
  };

  // Nội dung chat chính
  const chatContent = (
    <>
      {withHeader && (
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
          <div className="flex items-center">
            <Avatar
              icon={faRobot}
              shape="circle"
              size="md"
              withBorder
              className="mr-3"
            />
            <div>
              <Typography.Text weight="semibold" size="base">
                {title}
              </Typography.Text>
              <Typography.Text variant="muted" size="xs">
                {subtitle}
              </Typography.Text>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip content="Xóa cuộc trò chuyện">
              <IconButton
                icon={faTimes}
                variant="secondary"
                size="sm"
                onClick={onClearChat}
              />
            </Tooltip>
          </div>
        </div>
      )}

      <div 
        className={`overflow-y-auto flex flex-col space-y-4 mb-4 p-2 ${displayMessages.length === 0 ? 'justify-center' : ''}`}
        style={{ height, maxHeight: height }}
        ref={messagesContainerRef}
      >
        {displayMessages.length === 0 ? renderEmptyState() : renderMessages()}
      </div>

      {/* Nút cuộn xuống dưới */}
      <AnimatePresence>
        {showScrollToBottom && showScrollButton && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex justify-center mb-2"
          >
            <Button
              variant="ghost"
              size="small"
              rightIcon={faArrowDown}
              onClick={scrollToBottom}
              rounded
            >
              Tin nhắn mới
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <ChatInput
        value={inputMessage}
        onChange={handleInputChange}
        onSend={handleSend}
        placeholder="Hỏi tôi bất cứ điều gì về hành trình sự nghiệp của bạn..."
        withAttachButton={withAttachments}
        withVoiceButton={withVoiceInput}
        withMoreButton
        autoFocus
        multiline
        rows={2}
        withAnimation
      />
    </>
  );

  // Bọc bằng thẻ nếu cần
  if (withCard) {
    return (
      <Card
        variant="default"
        withShadow
        padding="md"
        className={classNames("w-full", className)}
        customClassName={customClassName}
      >
        {withAnimation ? (
          <motion.div
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4 }}
          >
            {chatContent}
          </motion.div>
        ) : (
          chatContent
        )}
      </Card>
    );
  }

  return (
    <div className={classNames("w-full", className, customClassName)}>
      {withAnimation ? (
        <motion.div
          variants={chatVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4 }}
        >
          {chatContent}
        </motion.div>
      ) : (
        chatContent
      )}
    </div>
  );
};

export default ChatSection;
