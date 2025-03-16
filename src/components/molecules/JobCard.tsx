'use client';

import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { IconDefinition, faMapMarkerAlt, faBriefcase, faClock, faBolt, faBuilding } from '@fortawesome/free-solid-svg-icons';
import Card from '../atomic/card';
import Typography from '../atomic/typo';
import Badge from '../atomic/badge';
import Button from '../atomic/button';
import Icon from '../atomic/icon';
import Avatar from '../atomic/avatar';

export interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location?: string;
  salary?: string;
  description?: string;
  matchPercentage?: number;
  logo?: string;
  logoIcon?: IconDefinition;
  tags?: string[];
  postedAt?: string;
  deadline?: string;
  isRemote?: boolean;
  isFullTime?: boolean;
  isContract?: boolean;
  variant?: 'default' | 'compact' | 'featured';
  size?: 'sm' | 'md' | 'lg';
  withAnimation?: boolean;
  withShadow?: boolean;
  withBorder?: boolean;
  withHover?: boolean;
  className?: string;
  customClassName?: string;
  onClick?: () => void;
  onApply?: () => void;
  onSave?: () => void;
  onDismiss?: () => void;
  isSaved?: boolean;
  isApplied?: boolean;
  isNew?: boolean;
  isHot?: boolean;
  withActions?: boolean;
  hideMatchPercentage?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id,
  title,
  company,
  location,
  salary,
  description,
  matchPercentage,
  logo,
  logoIcon = faBuilding,
  tags = [],
  postedAt,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deadline,
  isRemote = false,
  isFullTime = true,
  isContract = false,
  variant = 'default',
  size = 'md',
  withAnimation = true,
  withShadow = true,
  withBorder = true,
  withHover = true,
  className,
  customClassName,
  onClick,
  onApply,
  onSave,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDismiss,
  isSaved = false,
  isApplied = false,
  isNew = false,
  isHot = false,
  withActions = true,
  hideMatchPercentage = false,
}) => {

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    hover: {
      y: -4,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Determine job type label
  const getJobTypeLabel = () => {
    if (isRemote) return 'Remote';
    if (isContract) return 'Contract';
    if (isFullTime) return 'Full-time';
    return 'Part-time';
  };

  // Get padding based on size
  const getPadding = () => {
    if (variant === 'compact') return 'sm';
    return size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md';
  };

  // Render match percentage badge if available
  const renderMatchBadge = () => {
    if (hideMatchPercentage || matchPercentage === undefined) return null;

    // Determine color based on match percentage
    let badgeVariant: 'success' | 'primary' | 'warning' = 'primary';
    if (matchPercentage >= 90) badgeVariant = 'success';
    if (matchPercentage < 70) badgeVariant = 'warning';

    return (
      <Badge
        content={`${matchPercentage}% Match`}
        variant={badgeVariant}
        leftIcon={faBolt}
        shape="pill"
        size={size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'sm'}
        withShadow={true}
      />
    );
  };

  // Render job meta information (location, type, posted date)
  const renderJobMeta = () => {
    return (
      <div className="flex flex-wrap items-center gap-3 mt-2">
        {location && (
          <div className="flex items-center text-gray-500">
            <Icon icon={faMapMarkerAlt} size="xs" className="mr-1" />
            <Typography.Text size={size === 'sm' ? 'xs' : 'sm'} variant="muted">
              {location} {isRemote && '(Remote)'}
            </Typography.Text>
          </div>
        )}

        <div className="flex items-center text-gray-500">
          <Icon icon={faBriefcase} size="xs" className="mr-1" />
          <Typography.Text size={size === 'sm' ? 'xs' : 'sm'} variant="muted">
            {getJobTypeLabel()}
          </Typography.Text>
        </div>

        {postedAt && (
          <div className="flex items-center text-gray-500">
            <Icon icon={faClock} size="xs" className="mr-1" />
            <Typography.Text size={size === 'sm' ? 'xs' : 'sm'} variant="muted">
              {postedAt}
            </Typography.Text>
          </div>
        )}

        {isNew && (
          <Badge content="New" variant="success" size="xs" shape="pill" />
        )}

        {isHot && (
          <Badge content="Hot" variant="error" size="xs" shape="pill" />
        )}
      </div>
    );
  };

  // Render job description
  const renderDescription = () => {
    if (!description || variant === 'compact') return null;

    return (
      <div className="mt-3">
        <Typography.Text
          size={size === 'sm' ? 'xs' : 'sm'}
          variant="muted"
          className="line-clamp-3"
        >
          {description}
        </Typography.Text>
      </div>
    );
  };

  // Render salary information
  const renderSalary = () => {
    if (!salary) return null;

    return (
      <div className="mt-2">
        <Typography.Text
          size={size === 'sm' ? 'xs' : 'sm'}
          weight="medium"
          className="text-green-600"
        >
          {salary}
        </Typography.Text>
      </div>
    );
  };

  // Render tags
  const renderTags = () => {
    if (tags.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-2 mt-3">
        {tags.map((tag, index) => (
          <Badge
            key={index}
            content={tag}
            variant="default"
            shape="pill"
            size="xs"
          />
        ))}
      </div>
    );
  };

  // Render actions (apply/save buttons)
  const renderActions = () => {
    if (!withActions) return null;

    const applyButtonLabel = isApplied ? 'Applied' : 'Apply Now';
    const saveButtonLabel = isSaved ? 'Saved' : 'Save';

    return (
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
        <Button
          variant={isApplied ? 'outline' : 'gradient'}
          size={size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'medium'}
          onClick={(e) => {
            e.stopPropagation();
            if (onApply) onApply();
          }}
          isDisabled={isApplied}
        >
          {applyButtonLabel}
        </Button>

        <Button
          variant="outline"
          size={size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'medium'}
          onClick={(e) => {
            e.stopPropagation();
            if (onSave) onSave();
          }}
        >
          {saveButtonLabel}
        </Button>
      </div>
    );
  };

  // Card content
  const cardContent = (
    <>
      <div className="flex">
        {/* Company logo */}
        <div className="mr-4 flex-shrink-0">
          {logo ? (
            <Avatar
              src={logo}
              name={company}
              alt={company}
              size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}
              shape="rounded"
              withShadow={false}
              withBorder
            />
          ) : (
            <Avatar
              icon={logoIcon}
              name={company}
              alt={company}
              size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}
              shape="rounded"
              withShadow={false}
              withBorder
            />
          )}
        </div>

        <div className="flex-1">
          {/* Job title and match badge */}
          <div className="flex items-start justify-between">
            <div>
              <Typography.Text
                weight="semibold"
                size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'base'}
              >
                {title}
              </Typography.Text>

              <Typography.Text size={size === 'sm' ? 'xs' : 'sm'} variant="muted">
                {company}
              </Typography.Text>

              {renderSalary()}
            </div>

            {renderMatchBadge()}
          </div>
        </div>
      </div>

      {renderJobMeta()}
      {renderDescription()}
      {renderTags()}
      {renderActions()}
    </>
  );

  // Wrap in animation if needed
  if (withAnimation) {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={withHover ? 'hover' : undefined}
      >
        <Card
          variant={variant === 'featured' ? 'primary' : 'default'}
          withShadow={withShadow}
          withBorder={withBorder}
          withHover={false} // Handle hover with motion
          withAnimation={false} // Handle animation with motion
          onClick={onClick}
          className={classNames(className, {
            'border-l-4 border-l-[var(--color-primary)]': variant === 'featured',
          })}
          customClassName={customClassName}
          padding={getPadding()}
        >
          {cardContent}
        </Card>
      </motion.div>
    );
  }

  return (
    <Card
      variant={variant === 'featured' ? 'primary' : 'default'}
      withShadow={withShadow}
      withBorder={withBorder}
      withHover={withHover}
      withAnimation={false}
      onClick={onClick}
      className={classNames(className, {
        'border-l-4 border-l-[var(--color-primary)]': variant === 'featured',
      })}
      customClassName={customClassName}
      padding={getPadding()}
    >
      {cardContent}
    </Card>
  );
};

export default JobCard;
