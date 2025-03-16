'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import { faPlus, faSearch, faTrash, faEllipsisV, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Typography from '../atomic/typo';
import Card from '../atomic/card';
import Button from '../atomic/button';
import Input from '../atomic/input';
import ListItem from '../molecules/list-item';
import DropdownMenu from '../molecules/dropdown';
import { Toast } from '../molecules/alert';

// Conversation type definition
export interface Conversation {
  id: string;
  title: string;
  lastMessage?: string;
  date: Date | string;
  unread?: number;
  isActive?: boolean;
  category?: string;
  avatar?: string;
  icon?: IconDefinition;
}

export interface ConversationManagerProps {
  conversations?: Conversation[];
  activeConversationId?: string;
  onSelectConversation?: (id: string) => void;
  onNewConversation?: () => void;
  onDeleteConversation?: (id: string) => void;
  onSearchConversation?: (query: string) => void;
  title?: string;
  emptyStateMessage?: string;
  withSearch?: boolean;
  withNewButton?: boolean;
  withAnimation?: boolean;
  maxHeight?: string;
  className?: string;
  customClassName?: string;
  itemSize?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'primary' | 'secondary' | 'outline';
  showItemActions?: boolean;
  headerAction?: React.ReactNode;
  categories?: string[];
  onCategoryFilter?: (category: string | null) => void;
  isLoading?: boolean;
}

const ConversationManager: React.FC<ConversationManagerProps> = ({
  conversations = [],
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  onSearchConversation,
  title = 'Conversations',
  emptyStateMessage = 'No conversations yet',
  withSearch = true,
  withNewButton = true,
  withAnimation = true,
  maxHeight = '500px',
  className,
  customClassName,
  itemSize = 'medium',
  variant = 'default',
  showItemActions = true,
  headerAction,
  categories = [],
  onCategoryFilter,
  isLoading = false,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    if (onSearchConversation) {
      onSearchConversation(value);
    }
  };
  
  // Handle conversation selection
  const handleSelectConversation = (id: string) => {
    if (onSelectConversation) {
      onSelectConversation(id);
    }
  };
  
  // Handle new conversation button click
  const handleNewConversation = () => {
    if (onNewConversation) {
      onNewConversation();
    }
  };
  
  // Handle delete conversation
  const handleDeleteConversation = (id: string) => {
    if (onDeleteConversation) {
      onDeleteConversation(id);
      Toast.info('Conversation deleted');
    }
  };
  
  // Handle category filter
  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category);
    if (onCategoryFilter) {
      onCategoryFilter(category);
    }
  };
  
  // Container classes
  const containerClasses = classNames(
    'flex flex-col h-full',
    customClassName,
    className
  );
  
  // Format date for display
  const formatDate = (date: Date | string): string => {
    if (typeof date === 'string') {
      return date;
    }
    
    const now = new Date();
    const conversationDate = new Date(date);
    
    // If today, format as time
    if (
      now.getDate() === conversationDate.getDate() &&
      now.getMonth() === conversationDate.getMonth() &&
      now.getFullYear() === conversationDate.getFullYear()
    ) {
      return conversationDate.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
    
    // If this year, format as month & day
    if (now.getFullYear() === conversationDate.getFullYear()) {
      return conversationDate.toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric' 
      });
    }
    
    // Otherwise, full date
    return conversationDate.toLocaleDateString([], { 
      year: 'numeric',
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  // Filter conversations by category if selected
  const filteredConversations = selectedCategory ? 
    conversations.filter(conv => conv.category === selectedCategory) : 
    conversations;
  
  // Prepare category items for dropdown
  const categoryItems = [
    { key: 'all', label: 'All Categories' },
    ...categories.map(category => ({ key: category, label: category }))
  ];
  
  // Prepare conversation action items for dropdown
  const getConversationActions = (id: string) => [
    { key: 'delete', label: 'Delete', icon: faTrash, onClick: () => handleDeleteConversation(id) }
  ];
  
  // Render empty state
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <Typography.Text variant="muted" size="sm">
        {emptyStateMessage}
      </Typography.Text>
      {withNewButton && (
        <Button
          variant="primary"
          size="medium"
          leftIcon={faPlus}
          onClick={handleNewConversation}
          className="mt-4"
        >
          Start a New Conversation
        </Button>
      )}
    </div>
  );

  return (
    <motion.div
      className={containerClasses}
      variants={withAnimation ? containerVariants : undefined}
      initial={withAnimation ? 'hidden' : undefined}
      animate={withAnimation ? 'visible' : undefined}
      transition={{ duration: 0.3 }}
    >
      <Card
        title={title}
        withShadow
        withBorder
        headerAction={headerAction}
        variant={variant === 'outline' ? 'outlined' : 'default'}
        className="flex flex-col h-full"
      >
        {/* Search and Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-2">
            {withSearch && (
              <div className="flex-grow">
                <Input
                  placeholder="Search conversations..."
                  value={searchValue}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  leftIcon={faSearch}
                  size={itemSize === 'large' ? 'large' : itemSize === 'small' ? 'small' : 'medium'}
                />
              </div>
            )}
            
            {categories.length > 0 && onCategoryFilter && (
              <DropdownMenu
                items={categoryItems}
                label={selectedCategory || 'All'}
                variant="outline"
                size={itemSize === 'large' ? 'large' : itemSize === 'small' ? 'small' : 'medium'}
                onSelect={(key) => handleCategoryFilter(key === 'all' ? null : key)}
              />
            )}
            
            {withNewButton && (
              <Button
                variant="primary"
                size={itemSize === 'large' ? 'large' : itemSize === 'small' ? 'small' : 'medium'}
                leftIcon={faPlus}
                onClick={handleNewConversation}
              />
            )}
          </div>
        </div>
        
        {/* Conversations List */}
        <div 
          className="flex-1 overflow-y-auto"
          style={{ maxHeight }}
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-24">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="text-primary-500"
              >
                <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </motion.div>
            </div>
          ) : filteredConversations.length === 0 ? (
            renderEmptyState()
          ) : (
            <AnimatePresence mode="sync">
              {filteredConversations.map((conversation, index) => (
                <motion.div
                  key={conversation.id}
                  initial={withAnimation ? { opacity: 0, y: 10 } : undefined}
                  animate={withAnimation ? { opacity: 1, y: 0 } : undefined}
                  exit={withAnimation ? { opacity: 0, height: 0 } : undefined}
                  transition={{ 
                    duration: 0.2,
                    delay: index * 0.05
                  }}
                >
                  <ListItem
                    title={conversation.title}
                    description={conversation.lastMessage}
                    avatar={conversation.avatar}
                    icon={conversation.icon}
                    variant={variant === 'outline' ? 'outline' : variant}
                    size={itemSize}
                    isActive={conversation.id === activeConversationId}
                    onClick={() => handleSelectConversation(conversation.id)}
                    withHover
                    withAnimation={false} // Already handled by parent
                    badge={conversation.unread && conversation.unread > 0 ? conversation.unread : undefined}
                    badgeVariant="primary"
                    rightContent={
                      <div className="flex items-center space-x-2">
                        <Typography.Text size="xs" variant="muted">
                          {formatDate(conversation.date)}
                        </Typography.Text>
                        
                        {showItemActions && (
                          <DropdownMenu
                            items={getConversationActions(conversation.id)}
                            trigger={
                              <Button
                                variant="ghost"
                                size="small"
                                leftIcon={faEllipsisV}
                                className="opacity-50 hover:opacity-100"
                              />
                            }
                            placement="bottom"
                          />
                        )}
                      </div>
                    }
                    withDivider
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default ConversationManager;
