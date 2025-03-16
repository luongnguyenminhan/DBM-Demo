'use client';

import React from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Card from '../atomic/card';
import Typography from '../atomic/typo';
import Badge from '../atomic/badge';
import ProgressBar from '../atomic/progressBar';
import Icon from '../atomic/icon';

export interface SkillCardProps {
  skillName: string;
  skillLevel: number;
  skillRanking?: string;
  skillCategory?: string;
  icon?: IconDefinition;
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  withAnimation?: boolean;
  withShadow?: boolean;
  withBorder?: boolean;
  withHover?: boolean;
  className?: string;
  customClassName?: string;
  onClick?: () => void;
  showIcon?: boolean;
  showRanking?: boolean;
  showCategory?: boolean;
  verified?: boolean;
  showLevelText?: boolean;
  maxLevel?: number;
  hideDetails?: boolean;
  showStats?: boolean;
  stats?: {
    label: string;
    value: string | number;
  }[];
  trend?: {
    value: number;
    isPositive: boolean;
    text?: string;
  };
}

const SkillCard: React.FC<SkillCardProps> = ({
  skillName,
  skillLevel,
  skillRanking = '',
  skillCategory = '',
  icon,
  variant = 'default',
  size = 'md',
  withAnimation = true,
  withShadow = false,
  withBorder = true,
  withHover = true,
  className,
  customClassName,
  onClick,
  showIcon = true,
  showRanking = true,
  showCategory = true,
  verified = false,
  showLevelText = true,
  maxLevel = 100,
  hideDetails = false,
  showStats = false,
  stats = [],
  trend,
}) => {
  // Format skill level text based on value
  const getSkillLevelText = (level: number): string => {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 60) return 'Intermediate';
    if (level >= 40) return 'Basic';
    return 'Beginner';
  };
  
  // Determine badge variant based on ranking
  const getBadgeVariant = () => {
    if (skillRanking.includes('10%')) return 'primary';
    if (skillRanking.includes('20%')) return 'secondary';
    if (skillRanking.includes('30%')) return 'success';
    return 'default';
  };
  
  // Card padding based on size
  const getPadding = () => {
    switch (size) {
      case 'sm': return 'sm';
      case 'lg': return 'lg';
      default: return 'md';
    }
  };
  
  // Size classes for content
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeInOut"
      }
    },
  };
  
  // Trend indicator (up/down arrow)
  const renderTrend = () => {
    if (!trend) return null;
    
    const trendColor = trend.isPositive ? 'text-green-500' : 'text-red-500';
    const trendArrow = trend.isPositive ? '↑' : '↓';
    
    return (
      <Typography.Text size="xs" className={trendColor}>
        {trendArrow} {trend.value}% {trend.text || ''}
      </Typography.Text>
    );
  };
  
  // Stats section
  const renderStats = () => {
    if (!showStats || stats.length === 0) return null;
    
    return (
      <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-100 justify-between">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center">
            <div>
            <Typography.Text size="xs" variant="muted">
              {stat.label}
            </Typography.Text>
            <Typography.Text size="sm" weight="medium">
              {stat.value}
            </Typography.Text>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  // Main render
  return (
    <motion.div
      variants={withAnimation ? cardVariants : undefined}
      initial={withAnimation ? "hidden" : undefined}
      animate={withAnimation ? "visible" : undefined}
      whileHover={withHover ? { y: -4 } : undefined}
      transition={{ duration: 0.2 }}
    >
      <Card
        variant={variant}
        withShadow={withShadow}
        withBorder={withBorder}
        withHover={withHover}
        withAnimation={false} // We're handling animation with motion.div
        padding={getPadding()}
        onClick={onClick}
        customClassName={classNames("overflow-hidden", customClassName)}
        className={className}
      >
        {/* Skill header with name and ranking */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            {showIcon && icon && (
              <Icon icon={icon} className="mr-2" size={size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'sm'} />
            )}
            <Typography.Text weight="semibold" size={size === 'sm' ? 'xs' : size === 'lg' ? 'base' : 'sm'}>
              {skillName}
              {verified && (
                <span className="ml-1 text-blue-500">✓</span>
              )}
            </Typography.Text>
          </div>
          
          {showRanking && skillRanking && (
            <Badge
              content={skillRanking}
              variant={getBadgeVariant()}
              shape="pill"
              size={size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'sm'}
            />
          )}
        </div>
        
        {/* Skill progress bar */}
        <ProgressBar
          value={skillLevel}
          maxValue={maxLevel}
          variant="primary"
          size={size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'sm'}
          withAnimation={withAnimation}
          label={!hideDetails && showCategory ? (
            <div className="flex justify-between">
              <span className={sizeClasses[size]}>{skillCategory}</span>
              {showLevelText && (
                <span className={sizeClasses[size]}>{getSkillLevelText(skillLevel)}</span>
              )}
            </div>
          ) : undefined}
        />
        
        {/* Skill details section */}
        {!hideDetails && (
          <div className="mt-2 flex items-center justify-between">
            <Typography.Text size={size === 'sm' ? 'xs' : size === 'lg' ? 'sm' : 'xs'}>
              {skillLevel}/{maxLevel}
            </Typography.Text>
            {renderTrend()}
          </div>
        )}
        
        {/* Optional stats section */}
        {renderStats()}
      </Card>
    </motion.div>
  );
};

export default SkillCard;
