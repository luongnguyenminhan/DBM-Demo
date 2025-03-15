'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../atomic/card';
import Badge, { BadgeVariant } from '../atomic/badge';
import Typography from '../atomic/typo';
import Icon, { IconButton } from '../atomic/icon';
import Spinner from '../atomic/spinner';
import { MeetingResponse } from '@/types/meeting.type';
import {
  faCalendarAlt,
  faClock,
  faMapMarkerAlt,
  faEllipsisV,
  faEdit,
  faTrash,
  faEye,
  faCalendarCheck,
  faCalendarTimes,
  faCalendarDay
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

const { Text } = Typography;

export interface MeetingCardProps {
  meeting: MeetingResponse;
  isLoading?: boolean;
  withAnimation?: boolean;
  variant?: 'default' | 'outline' | 'minimal';
  onViewDetails?: (meeting: MeetingResponse) => void;
  onEdit?: (meeting: MeetingResponse) => void;
  onDelete?: (meeting: MeetingResponse) => void;
  className?: string;
  customClassName?: string;
}

const MeetingCard: React.FC<MeetingCardProps> = ({
  meeting,
  isLoading = false,
  withAnimation = true,
  variant = 'default',
  onViewDetails,
  onEdit,
  onDelete,
  className,
  customClassName,
}) => {
  const [showActions, setShowActions] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  // Format the date and time
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  const formatTime = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      console.error('Error formatting time:', error);
      return 'Unknown';
    }
  };

  // Calculate duration
  const calculateDuration = () => {
    if (!meeting.start_time || !meeting.end_time) return 'N/A';
    try {
      const start = new Date(meeting.start_time);
      const end = new Date(meeting.end_time);
      const durationMs = end.getTime() - start.getTime();
      const durationMins = Math.round(durationMs / 60000);
      if (durationMins < 60) {
        return `${durationMins} min${durationMins !== 1 ? 's' : ''}`;
      } else {
        const hours = Math.floor(durationMins / 60);
        const mins = durationMins % 60;
        return `${hours} hr${hours !== 1 ? 's' : ''} ${mins > 0 ? `${mins} min${mins !== 1 ? 's' : ''}` : ''}`;
      }
    } catch (error) {
      console.error('Error calculating duration:', error);
      return 'N/A';
    }
  };

  // Get status badge variant based on meeting status
  const getStatusBadge = () => {
    if (!meeting.status) return null;
    const status = meeting.status.toLowerCase();
    let variant: BadgeVariant = 'default';
    let icon = faCalendarDay;
    switch (status) {
      case 'scheduled':
        variant = 'primary';
        icon = faCalendarAlt;
        break;
      case 'completed':
        variant = 'success';
        icon = faCalendarCheck;
        break;
      case 'cancelled':
        variant = 'error';
        icon = faCalendarTimes;
        break;
      default:
        break;
    }
    return (
      <Badge
        content={meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1).toLowerCase()}
        variant={variant}
        leftIcon={icon}
        size="sm"
      />
    );
  };

  // Handle actions
  const handleViewDetails = () => {
    onViewDetails?.(meeting);
  };

  const handleEdit = () => {
    onEdit?.(meeting);
    setShowActions(false);
  };

  const handleDelete = () => {
    if (confirmDelete && onDelete) {
      onDelete(meeting);
      setConfirmDelete(false);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  // Render card content in a single row
  const renderCardContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-4">
          <Spinner size="md" variant="primary" text="Loading meeting..." />
        </div>
      );
    }

    return (
      <div className="flex items-center justify-between w-full space-x-4">
        {/* Meeting ID */}
        <div className="flex-1 min-w-0">
          <Text weight="medium" truncate>
            {meeting.meeting_id || 'Untitled Meeting'}
          </Text>
        </div>

        {/* Platform */}
        <div className="flex items-center space-x-1">
          <Icon icon={faMapMarkerAlt} size="xs" variant="primary" />
          <Text size="sm" variant="primary">
            {meeting.platform || 'N/A'}
          </Text>
        </div>

        {/* Date */}
        <div className="flex items-center space-x-1">
          <Icon icon={faCalendarAlt} size="sm" variant="secondary" />
          <Text size="sm">{formatDate(meeting.start_time)}</Text>
        </div>

        {/* Time */}
        <div className="flex items-center space-x-1">
          <Icon icon={faClock} size="sm" variant="secondary" />
          <Text size="sm">{formatTime(meeting.start_time)}</Text>
        </div>

        {/* Duration */}
        <div className="flex items-center space-x-1">
          <Icon icon={faClock} size="sm" variant="secondary" />
          <Text size="sm">{calculateDuration()}</Text>
        </div>

        {/* Status Badge */}
        {getStatusBadge()}

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {onViewDetails && (
            <IconButton
              icon={faEye}
              variant="default"
              size="sm"
              onClick={handleViewDetails}
              rounded
            />
          )}
          {(onEdit || onDelete) && (
            <div className="relative">
              <IconButton
                icon={faEllipsisV}
                variant="default"
                size="sm"
                onClick={() => setShowActions(!showActions)}
                rounded
              />
              {showActions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-1 z-10 bg-white rounded-md shadow-lg border border-gray-200 py-1 w-32"
                >
                  {onEdit && (
                    <button
                      onClick={handleEdit}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <Icon icon={faEdit} size="sm" className="mr-2" />
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={handleDelete}
                      className={classNames(
                        "flex items-center px-4 py-2 text-sm w-full text-left",
                        confirmDelete
                          ? "bg-red-100 text-red-700 hover:bg-red-200"
                          : "text-red-600 hover:bg-gray-100"
                      )}
                    >
                      <Icon icon={faTrash} size="sm" className="mr-2" />
                      {confirmDelete ? "Confirm" : "Delete"}
                    </button>
                  )}
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  // Determine card variant props
  const getCardProps = () => {
    switch (variant) {
      case 'outline':
        return {
          variant: 'outlined' as const,
          withShadow: false,
          withBorder: true
        };
      case 'minimal':
        return {
          variant: 'ghost' as const,
          withShadow: false,
          withBorder: false
        };
      default:
        return {
          variant: 'default' as const,
          withShadow: true,
          withBorder: true
        };
    }
  };

  const cardProps = getCardProps();

  const cardContent = (
    <Card
      {...cardProps}
      padding="sm"
      rounded
      className={classNames('h-full', className, customClassName)}
    >
      {renderCardContent()}
    </Card>
  );

  // Optionally wrap with animation
  if (withAnimation) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="h-full"
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

export default MeetingCard;