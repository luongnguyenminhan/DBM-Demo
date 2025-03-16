'use client';

import React, { ReactNode, useRef } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Typography from './typo';

const { Text } = Typography;

export type VideoFrameSize = 'small' | 'medium' | 'large';
export type VideoFrameVariant = 'default' | 'primary' | 'outline' | 'ghost';
export type VideoFrameAspectRatio = 'square' | '16:9' | '4:3' | '1:1' | '21:9';

export interface VideoFrameProps {
  children?: ReactNode;
  size?: VideoFrameSize;
  variant?: VideoFrameVariant;
  aspectRatio?: VideoFrameAspectRatio;
  isFullWidth?: boolean;
  isDisabled?: boolean;
  customClassName?: string;
  withAnimation?: boolean;
  withGradient?: boolean;
  withBorder?: boolean;
  withShadow?: boolean;
  shadowSize?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  roundedSize?: 'sm' | 'md' | 'lg' | 'full';
  overlayContent?: ReactNode;
  overlayPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  isLoading?: boolean;
  icon?: IconDefinition;
  label?: string;
  videoUrl?: string;
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  controls?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  backgroundColor?: string;
  className?: string;
  id?: string;
  withPlaceholder?: boolean;
  placeholderText?: string;
  placeholderIcon?: IconDefinition;
}

const VideoFrame: React.FC<VideoFrameProps> = ({
  children,
  size = 'medium',
  variant = 'default',
  aspectRatio = '16:9',
  isFullWidth = true,
  isDisabled = false,
  customClassName = '',
  withAnimation = false,
  withGradient = false,
  withBorder = true,
  withShadow = true,
  shadowSize = 'md',
  rounded = true,
  roundedSize = 'md',
  overlayContent,
  overlayPosition = 'bottom-right',
  isLoading = false,
  label,
  videoUrl,
  poster,
  autoPlay = false,
  muted = true,
  controls = true,
  loop = false,
  playsInline = true,
  onPlay,
  onPause,
  onEnded,
  backgroundColor,
  className,
  id,
  withPlaceholder = false,
  placeholderText = 'No video available',
  placeholderIcon,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Size classes
  const sizeClasses = {
    small: 'max-w-sm',
    medium: 'max-w-xl',
    large: 'max-w-3xl',
  };

  // Variant classes
  const variantClasses = {
    default: 'bg-gray-800 text-white',
    primary: 'bg-[var(--color-primary-light)] text-white',
    outline: 'bg-transparent border-2 border-[var(--color-primary)]',
    ghost: 'bg-transparent',
  };

  // Aspect ratio classes
  const aspectRatioClasses = {
    'square': 'aspect-square',
    '16:9': 'aspect-video',
    '4:3': 'aspect-4/3',
    '1:1': 'aspect-square',
    '21:9': 'aspect-[21/9]',
  };

  // Rounded corner classes
  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-xl',
  };

  // Shadow classes
  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  // Overlay position classes
  const overlayPositionClasses = {
    'top-left': 'top-2 left-2',
    'top-right': 'top-2 right-2',
    'bottom-left': 'bottom-2 left-2',
    'bottom-right': 'bottom-2 right-2',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  // Container classes
  const containerClasses = classNames(
    'overflow-hidden relative transition-all duration-300',
    aspectRatioClasses[aspectRatio],
    variantClasses[variant],
    {
      [sizeClasses[size]]: !isFullWidth,
      'w-full': isFullWidth,
      'opacity-70 cursor-not-allowed': isDisabled,
      'bg-gradient-to-br from-primary-700 to-primary-900': withGradient,
      'border border-gray-200': withBorder && variant !== 'outline',
      [shadowClasses[shadowSize]]: withShadow,
      [roundedClasses[roundedSize]]: rounded,
    },
    customClassName,
    className
  );

  // Video classes
  const videoClasses = classNames(
    'w-full h-full object-cover',
    {
      'opacity-0': isLoading,
    }
  );

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    hover: { scale: 1.01 },
  };

  const handlePlay = () => {
    onPlay?.();
  };

  const handlePause = () => {
    onPause?.();
  };

  const handleEnded = () => {
    onEnded?.();
  };

  // Generate a container style with background color if provided
  const containerStyle = backgroundColor ? { backgroundColor } : {};

  const renderPlaceholder = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
      {placeholderIcon && (
        <FontAwesomeIcon 
          icon={placeholderIcon} 
          className={classNames('mb-2', {
            'text-2xl': size === 'small',
            'text-3xl': size === 'medium',
            'text-4xl': size === 'large',
          })}
        />
      )}
      <Text variant="muted">{placeholderText}</Text>
    </div>
  );

  const renderOverlay = () => {
    if (!overlayContent) return null;
    
    return (
      <div className={classNames(
        'absolute z-10 p-2', 
        overlayPositionClasses[overlayPosition]
      )}>
        {overlayContent}
      </div>
    );
  };

  const renderLoadingIndicator = () => {
    if (!isLoading) return null;
    
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-20">
        <div className="animate-spin h-8 w-8 border-4 border-primary-500 rounded-full border-t-transparent"></div>
      </div>
    );
  };

  const videoFrameContent = (
    <div className={containerClasses} style={containerStyle} id={id}>
      {videoUrl ? (
        <video
          ref={videoRef}
          src={videoUrl}
          poster={poster}
          autoPlay={autoPlay}
          muted={muted}
          controls={controls}
          loop={loop}
          playsInline={playsInline}
          className={videoClasses}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
        />
      ) : withPlaceholder ? (
        renderPlaceholder()
      ) : (
        children
      )}
      
      {renderOverlay()}
      {renderLoadingIndicator()}
      
      {label && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-3">
          <Text>{label}</Text>
        </div>
      )}
    </div>
  );

  if (withAnimation) {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        whileHover="hover"
        variants={containerVariants}
        transition={{ duration: 0.3 }}
      >
        {videoFrameContent}
      </motion.div>
    );
  }

  return videoFrameContent;
};

export default VideoFrame;
