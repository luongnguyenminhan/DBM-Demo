'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import VideoFrame from '../atomic/video-frame';
import VideoControls from '../molecules/video-controls';
import { IconDefinition, faVideo} from '@fortawesome/free-solid-svg-icons';
import { Toast } from '../molecules/alert';

export interface VideoContainerProps {
  aiVideoUrl?: string;
  userVideoEnabled?: boolean;
  userVideoStream?: MediaStream | null;
  onUserVideoToggle?: (enabled: boolean) => void;
  onUserAudioToggle?: (enabled: boolean) => void;
  onFullscreenToggle?: (enabled: boolean) => void;
  showControls?: boolean;
  showUserVideo?: boolean;
  userVideoPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  withAnimation?: boolean;
  withAutoHideControls?: boolean;
  isResponsive?: boolean;
  className?: string;
  customClassName?: string;
  aiVideoPlaceholderIcon?: IconDefinition;
  aiVideoPlaceholderText?: string;
  userVideoPlaceholderIcon?: IconDefinition;
  userVideoPlaceholderText?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  videoControlsPosition?: 'top' | 'bottom' | 'left' | 'right';
  videoControlsVariant?: 'default' | 'primary' | 'secondary' | 'minimal' | 'dark';
}

const VideoContainer: React.FC<VideoContainerProps> = ({
  aiVideoUrl,
  userVideoEnabled = true,
  userVideoStream = null,
  onUserVideoToggle,
  onUserAudioToggle,
  onFullscreenToggle,
  showControls = true,
  showUserVideo = true,
  userVideoPosition = 'bottom-right',
  withAnimation = true,
  withAutoHideControls = true,
  isResponsive = true,
  className,
  customClassName,
  aiVideoPlaceholderIcon,
  aiVideoPlaceholderText = 'AI interviewer video will appear here',
  userVideoPlaceholderIcon = faVideo,
  userVideoPlaceholderText = 'Your webcam is not active',
  aspectRatio = '16:9',
  videoControlsPosition = 'bottom',
  videoControlsVariant = 'default',
}) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isUserVideoEnabled, setIsUserVideoEnabled] = useState<boolean>(userVideoEnabled);
  const [isUserAudioEnabled, setIsUserAudioEnabled] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userVideoUrl, setUserVideoUrl] = useState<string>('');
  const [isUserStreamActive, setIsUserStreamActive] = useState<boolean>(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const aiVideoRef = useRef<HTMLVideoElement>(null);
  const userVideoRef = useRef<HTMLVideoElement>(null);
  
  // Attach user video stream to the user video element
  useEffect(() => {
    if (userVideoRef.current && userVideoStream) {
      userVideoRef.current.srcObject = userVideoStream;
      setIsUserStreamActive(true);
    }
  }, [userVideoStream, userVideoRef]);
  
  // User video position classes
  const userVideoPositionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-24 left-4', // Adjusted for controls
    'bottom-right': 'bottom-24 right-4', // Adjusted for controls
  };
  
  // Container classes
  const containerClasses = classNames(
    'relative overflow-hidden rounded-lg',
    {
      'w-full': isResponsive,
    },
    customClassName,
    className
  );
  
  // Handle fullscreen toggle
  const handleFullscreenToggle = (fullscreen: boolean) => {
    setIsFullscreen(fullscreen);
    
    if (fullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen()
          .catch(err => {
            Toast.error('Could not enter fullscreen mode');
            console.error('Fullscreen error:', err);
          });
      }
    } else {
      if (document.exitFullscreen && document.fullscreenElement) {
        document.exitFullscreen()
          .catch(err => {
            console.error('Exit fullscreen error:', err);
          });
      }
    }
    
    if (onFullscreenToggle) {
      onFullscreenToggle(fullscreen);
    }
  };
  
  // Handle user video toggle
  const handleUserVideoToggle = (enabled: boolean) => {
    setIsUserVideoEnabled(enabled);
    
    if (userVideoStream) {
      userVideoStream.getVideoTracks().forEach(track => {
        track.enabled = enabled;
      });
    }
    
    if (onUserVideoToggle) {
      onUserVideoToggle(enabled);
    }
  };
  
  // Handle user audio toggle
  const handleUserAudioToggle = (enabled: boolean) => {
    setIsUserAudioEnabled(enabled);
    
    if (userVideoStream) {
      userVideoStream.getAudioTracks().forEach(track => {
        track.enabled = enabled;
      });
    }
    
    if (onUserAudioToggle) {
      onUserAudioToggle(enabled);
    }
  };
  
  // Animation variants
  const containerVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
  };
  
  const userVideoVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
  };
  
  // Determine if we should show user video
  const shouldShowUserVideo = showUserVideo && (userVideoStream || userVideoUrl);

  return (
    <motion.div
      ref={containerRef}
      className={containerClasses}
      variants={withAnimation ? containerVariants : undefined}
      initial={withAnimation ? 'initial' : undefined}
      animate={withAnimation ? 'animate' : undefined}
      transition={{ duration: 0.5 }}
    >
      {/* AI Video Frame */}
      <VideoFrame
        videoUrl={aiVideoUrl}
        aspectRatio={aspectRatio}
        isFullWidth
        withPlaceholder={!aiVideoUrl}
        placeholderIcon={aiVideoPlaceholderIcon}
        placeholderText={aiVideoPlaceholderText}
        withBorder
        withAnimation={false}
        rounded
        controls={false}
        autoPlay={!!aiVideoUrl}
        loop={true}
        muted={false}
      />
      
      {/* User Video (Picture-in-Picture style) */}
      {shouldShowUserVideo && (
        <motion.div
          className={classNames(
            'absolute z-10 w-1/4 shadow-lg rounded-lg overflow-hidden',
            userVideoPositionClasses[userVideoPosition]
          )}
          variants={withAnimation ? userVideoVariants : undefined}
          initial={withAnimation ? 'initial' : undefined}
          animate={withAnimation ? 'animate' : undefined}
          transition={{ duration: 0.3, delay: 0.2 }}
          drag
          dragConstraints={containerRef}
          dragElastic={0.1}
        >
          <VideoFrame
            videoUrl={userVideoUrl}
            aspectRatio={aspectRatio}
            isFullWidth
            withPlaceholder={!isUserStreamActive && !userVideoUrl}
            placeholderIcon={userVideoPlaceholderIcon}
            placeholderText={userVideoPlaceholderText}
            withBorder
            withShadow
            autoPlay
            playsInline
            muted
            controls={false}
            variant="outline"
          />
        </motion.div>
      )}
      
      {/* Video Controls */}
      {showControls && (
        <VideoControls
          position={videoControlsPosition}
          variant={videoControlsVariant}
          withAutoHide={withAutoHideControls}
          showVideoToggle
          showAudioToggle
          showFullscreen
          showPlayPause={!!aiVideoUrl}
          compact={false}
          rounded
          onVideoToggle={handleUserVideoToggle}
          onAudioToggle={handleUserAudioToggle}
          onFullscreenToggle={handleFullscreenToggle}
          initialState={{
            isVideoEnabled: isUserVideoEnabled,
            isAudioEnabled: isUserAudioEnabled,
            isFullscreen: isFullscreen,
          }}
          videoElement={aiVideoRef.current}
        />
      )}
    </motion.div>
  );
};

export default VideoContainer;
