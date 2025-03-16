'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  faMicrophone,
  faMicrophoneSlash,
  faVideo,
  faVideoSlash,
  faDesktop,
  faStop,
  faPlay,
  faPause,
  faVolumeMute,
  faVolumeUp,
  faCog,
  faExpand,
  faCompress,
  faClosedCaptioning,
  IconDefinition,
  faRecordVinyl
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import Button from '../atomic/button';
import Typography from '../atomic/typo';
import { Toast } from './alert';

export type VideoControlsVariant = 'default' | 'primary' | 'secondary' | 'minimal' | 'dark';
export type VideoControlsSize = 'small' | 'medium' | 'large';
export type VideoControlsPosition = 'top' | 'bottom' | 'left' | 'right' | 'floating';

export interface VideoControlState {
  isPlaying: boolean;
  isMuted: boolean;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  isScreenSharing: boolean;
  isFullscreen: boolean;
  isRecording: boolean;
  isCaptionsEnabled: boolean;
  volume: number;
}

export interface VideoControlsProps {
  onPlayPause?: (isPlaying: boolean) => void;
  onMute?: (isMuted: boolean) => void;
  onVideoToggle?: (isEnabled: boolean) => void;
  onAudioToggle?: (isEnabled: boolean) => void;
  onScreenShare?: (isSharing: boolean) => void;
  onFullscreenToggle?: (isFullscreen: boolean) => void;
  onRecordingToggle?: (isRecording: boolean) => void;
  onCaptionsToggle?: (isEnabled: boolean) => void;
  onVolumeChange?: (volume: number) => void;
  onSettingsClick?: () => void;
  onStopStream?: () => void;
  initialState?: Partial<VideoControlState>;
  variant?: VideoControlsVariant;
  size?: VideoControlsSize;
  position?: VideoControlsPosition;
  withAutoHide?: boolean;
  withAnimation?: boolean;
  hideAfter?: number; // in ms
  showVolumeControl?: boolean;
  showPlayPause?: boolean;
  showVideoToggle?: boolean;
  showAudioToggle?: boolean;
  showScreenShare?: boolean;
  showFullscreen?: boolean;
  showRecording?: boolean;
  showCaptions?: boolean;
  showSettings?: boolean;
  showStopButton?: boolean;
  showTimer?: boolean;
  additionalControls?: React.ReactNode;
  customClassName?: string;
  className?: string;
  compact?: boolean;
  rounded?: boolean;
  withTooltips?: boolean;
  withLabels?: boolean;
  videoElement?: HTMLVideoElement | null;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  onPlayPause,
  onMute,
  onVideoToggle,
  onAudioToggle,
  onScreenShare,
  onFullscreenToggle,
  onRecordingToggle,
  onCaptionsToggle,
  onVolumeChange,
  onSettingsClick,
  onStopStream,
  initialState = {},
  variant = 'default',
  size = 'medium',
  position = 'bottom',
  withAutoHide = true,
  withAnimation = true,
  hideAfter = 3000, // 3 seconds
  showVolumeControl = true,
  showPlayPause = true,
  showVideoToggle = true,
  showAudioToggle = true,
  showScreenShare = false,
  showFullscreen = true,
  showRecording = false,
  showCaptions = false,
  showSettings = false,
  showStopButton = false,
  showTimer = false,
  additionalControls,
  customClassName = '',
  className,
  compact = false,
  rounded = true,
  withLabels = false,
  videoElement = null,
}) => {
  // State for controls
  const [state, setState] = useState<VideoControlState>({
    isPlaying: initialState.isPlaying ?? false,
    isMuted: initialState.isMuted ?? false,
    isVideoEnabled: initialState.isVideoEnabled ?? true,
    isAudioEnabled: initialState.isAudioEnabled ?? true,
    isScreenSharing: initialState.isScreenSharing ?? false,
    isFullscreen: initialState.isFullscreen ?? false,
    isRecording: initialState.isRecording ?? false,
    isCaptionsEnabled: initialState.isCaptionsEnabled ?? false,
    volume: initialState.volume ?? 1.0,
  });

  // UI State
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [elapsedTime, setElapsedTime] = useState<number>(0); // in seconds

  // Size classes
  const sizeClasses = {
    small: 'p-1 gap-1',
    medium: 'p-2 gap-2',
    large: 'p-3 gap-3',
  };

  // Button size mapping
  const buttonSizeMap = {
    small: 'small',
    medium: 'small',
    large: 'medium',
  } as const;

  // Variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[var(--color-primary)] bg-opacity-90 text-white';
      case 'secondary':
        return 'bg-[var(--color-secondary)] bg-opacity-90 text-white';
      case 'dark':
        return 'bg-black bg-opacity-70 text-white';
      case 'minimal':
        return 'bg-transparent';
      default:
        return 'bg-gray-900 bg-opacity-80 text-white';
    }
  };

  // Position classes
  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'top-0 left-0 right-0';
      case 'left':
        return 'top-0 left-0 bottom-0 flex-col';
      case 'right':
        return 'top-0 right-0 bottom-0 flex-col';
      case 'floating':
        return 'absolute top-4 left-1/2 transform -translate-x-1/2';
      default: // 'bottom'
        return 'bottom-0 left-0 right-0';
    }
  };

  // Container classes
  const containerClasses = classNames(
    'flex items-center justify-center transition-all duration-300 absolute',
    sizeClasses[size],
    getVariantClasses(),
    getPositionClasses(),
    {
      'opacity-0 pointer-events-none': withAutoHide && !isVisible && !isHovering,
      'opacity-100': !withAutoHide || isVisible || isHovering,
      'rounded-full': rounded && compact,
      'rounded-md': rounded && !compact,
    },
    customClassName,
    className
  );

  // Format time for timer display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle Play/Pause
  const handlePlayPause = () => {
    const newValue = !state.isPlaying;
    setState((prev) => ({ ...prev, isPlaying: newValue }));
    
    if (videoElement) {
      if (newValue) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    }
    
    if (onPlayPause) {
      onPlayPause(newValue);
    }
  };

  // Handle Mute
  const handleMute = () => {
    const newValue = !state.isMuted;
    setState((prev) => ({ ...prev, isMuted: newValue }));
    
    if (videoElement) {
      videoElement.muted = newValue;
    }
    
    if (onMute) {
      onMute(newValue);
    }
  };

  // Handle Video Toggle
  const handleVideoToggle = () => {
    const newValue = !state.isVideoEnabled;
    setState((prev) => ({ ...prev, isVideoEnabled: newValue }));
    
    if (onVideoToggle) {
      onVideoToggle(newValue);
    }
    
    Toast.info(`Camera ${newValue ? 'enabled' : 'disabled'}`);
  };

  // Handle Audio Toggle
  const handleAudioToggle = () => {
    const newValue = !state.isAudioEnabled;
    setState((prev) => ({ ...prev, isAudioEnabled: newValue }));
    
    if (onAudioToggle) {
      onAudioToggle(newValue);
    }
    
    Toast.info(`Microphone ${newValue ? 'enabled' : 'disabled'}`);
  };

  // Handle Screen Sharing
  const handleScreenShare = () => {
    const newValue = !state.isScreenSharing;
    setState((prev) => ({ ...prev, isScreenSharing: newValue }));
    
    if (onScreenShare) {
      onScreenShare(newValue);
    }
    
    Toast.info(`Screen sharing ${newValue ? 'started' : 'stopped'}`);
  };

  // Handle Fullscreen
  const handleFullscreen = () => {
    const newValue = !state.isFullscreen;
    setState((prev) => ({ ...prev, isFullscreen: newValue }));
    
    if (videoElement) {
      if (newValue) {
        if (videoElement.requestFullscreen) {
          videoElement.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
    
    if (onFullscreenToggle) {
      onFullscreenToggle(newValue);
    }
  };

  // Handle Recording
  const handleRecording = () => {
    const newValue = !state.isRecording;
    setState((prev) => ({ ...prev, isRecording: newValue }));
    
    if (onRecordingToggle) {
      onRecordingToggle(newValue);
    }
    
    Toast.info(`Recording ${newValue ? 'started' : 'stopped'}`);
  };

  // Handle Captions
  const handleCaptions = () => {
    const newValue = !state.isCaptionsEnabled;
    setState((prev) => ({ ...prev, isCaptionsEnabled: newValue }));
    
    if (onCaptionsToggle) {
      onCaptionsToggle(newValue);
    }
    
    Toast.info(`Captions ${newValue ? 'enabled' : 'disabled'}`);
  };

  // Handle Volume Change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setState((prev) => ({ ...prev, volume: newVolume }));
    
    if (videoElement) {
      videoElement.volume = newVolume;
    }
    
    if (onVolumeChange) {
      onVolumeChange(newVolume);
    }
  };

  // Handle Stop Stream
  const handleStopStream = () => {
    if (onStopStream) {
      onStopStream();
    }
    
    Toast.warning('Stream stopped');
  };

  // Handle Settings
  const handleSettings = () => {
    if (onSettingsClick) {
      onSettingsClick();
    }
  };

  // Handle container hover
  const handleMouseEnter = () => {
    setIsHovering(true);
    setIsVisible(true);
    
    // Clear any existing hide timer
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsHovering(false);
    
    if (withAutoHide) {
      // Set timer to hide controls
      const newTimer = setTimeout(() => {
        setIsVisible(false);
      }, hideAfter);
      
      setTimer(newTimer);
    }
  };

  // Render control button
  const renderControlButton = (
    icon: IconDefinition,
    activeIcon: IconDefinition,
    isActive: boolean,
    label: string,
    onClick: () => void,
  ) => {
    const buttonIcon = isActive ? activeIcon : icon;
    
    return (
      <Button
        variant={isActive ? 'primary' : 'ghost'}
        size={buttonSizeMap[size]}
        leftIcon={buttonIcon}
        onClick={onClick}
        rounded={rounded}
        customClassName="text-white"
        withRipple
      >
        {withLabels && label}
      </Button>
    );
  };

  // Animation variants
  const controlsVariants = {
    hidden: {
      opacity: 0,
      y: position === 'bottom' ? 20 : position === 'top' ? -20 : 0,
      x: position === 'left' ? -20 : position === 'right' ? 20 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  };

  // Control buttons
  const renderControls = () => {
    return (
      <>
        {showPlayPause && renderControlButton(
          faPlay,
          faPause,
          state.isPlaying,
          state.isPlaying ? 'Pause' : 'Play',
          handlePlayPause
        )}
        
        {showAudioToggle && renderControlButton(
          faMicrophone,
          faMicrophoneSlash,
          !state.isAudioEnabled,
          state.isAudioEnabled ? 'Mute Mic' : 'Unmute Mic',
          handleAudioToggle
        )}
        
        {showVideoToggle && renderControlButton(
          faVideo,
          faVideoSlash,
          !state.isVideoEnabled,
          state.isVideoEnabled ? 'Turn Off Camera' : 'Turn On Camera',
          handleVideoToggle
        )}
        
        {showVolumeControl && (
          <div className="flex items-center">
            <Button
              variant="ghost"
              size={buttonSizeMap[size]}
              leftIcon={state.isMuted ? faVolumeMute : faVolumeUp}
              onClick={handleMute}
              rounded={rounded}
              customClassName="text-white"
            />
            
            {!compact && (
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={state.volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-300 rounded"
              />
            )}
          </div>
        )}
        
        {showScreenShare && renderControlButton(
          faDesktop,
          faDesktop,
          state.isScreenSharing,
          state.isScreenSharing ? 'Stop Sharing' : 'Share Screen',
          handleScreenShare
        )}
        
        {showRecording && renderControlButton(
          faRecordVinyl,
          faRecordVinyl,
          state.isRecording,
          state.isRecording ? 'Stop Recording' : 'Start Recording',
          handleRecording,

        )}
        
        {showCaptions && renderControlButton(
          faClosedCaptioning,
          faClosedCaptioning,
          state.isCaptionsEnabled,
          state.isCaptionsEnabled ? 'Hide Captions' : 'Show Captions',
          handleCaptions
        )}
        
        {showTimer && (
          <div className="px-2 py-1 bg-black bg-opacity-50 rounded text-white text-sm">
            <Typography.Text variant="primary" size="sm">
              {formatTime(elapsedTime)}
            </Typography.Text>
          </div>
        )}
        
        {additionalControls}
        
        {showSettings && (
          <Button
            variant="ghost"
            size={buttonSizeMap[size]}
            leftIcon={faCog}
            onClick={handleSettings}
            rounded={rounded}
            customClassName="text-white"
          >
            {withLabels && 'Settings'}
          </Button>
        )}
        
        {showFullscreen && renderControlButton(
          faExpand,
          faCompress,
          state.isFullscreen,
          state.isFullscreen ? 'Exit Fullscreen' : 'Fullscreen',
          handleFullscreen
        )}
        
        {showStopButton && (
          <Button
            variant="outline"
            size={buttonSizeMap[size]}
            leftIcon={faStop}
            onClick={handleStopStream}
            rounded={rounded}
          >
            {withLabels && 'Stop'}
          </Button>
        )}
      </>
    );
  };

  if (withAnimation) {
    return (
      <motion.div
        className={containerClasses}
        variants={controlsVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.3 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {renderControls()}
      </motion.div>
    );
  }

  return (
    <div
      className={containerClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {renderControls()}
    </div>
  );
};

export default VideoControls;
