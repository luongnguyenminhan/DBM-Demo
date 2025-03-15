'use client';

import { useState, useEffect, useRef, RefObject } from 'react';
import type { TabItem } from '@/components/molecules/tabNavigation';

// Defines the structure for scroll position indicators
interface ScrollPosition {
  left: boolean;  // Indicates if there are tabs to scroll left
  right: boolean; // Indicates if there are tabs to scroll right
}

// Props interface for the hook
interface UseTabNavigationProps {
  tabs: TabItem[];                // Array of tab items
  defaultActiveKey?: string;      // Default active tab key (uncontrolled mode)
  activeKey?: string;             // Controlled active tab key
  onChange?: (activeKey: string) => void; // Callback when active tab changes
  lazyLoad?: boolean;             // Whether to lazy load tab content
  withScrollIndicators?: boolean; // Whether to show scroll indicators
}

// Return interface for the hook
interface UseTabNavigationReturn {
  activeKey: string;                        // Current active tab key
  visibleTabs: Record<string, boolean>;     // Tracks which tabs are visible
  scrollPosition: ScrollPosition;           // Current scroll state
  tabsRef: RefObject<HTMLDivElement | null>;       // Ref to the scrollable container
  tabsContainerRef: RefObject<HTMLDivElement | null>; // Ref to the tabs inner container
  handleTabClick: (key: string) => void;    // Handler for tab clicks
  handleTabClose: (e: React.MouseEvent) => void; // Handler for tab close
  scrollToTab: (direction: 'left' | 'right') => void; // Scrolls tabs
}

export const useTabNavigation = ({
  tabs,
  defaultActiveKey,
  activeKey: propActiveKey,
  onChange,
  lazyLoad = true,
  withScrollIndicators = false,
}: UseTabNavigationProps): UseTabNavigationReturn => {
  // State to manage the active tab key
  const [activeKey, setActiveKey] = useState<string>(
    propActiveKey || defaultActiveKey || (tabs.length > 0 ? tabs[0].key : '')
  );

  // State to track which tabs' content should be rendered
  const [visibleTabs, setVisibleTabs] = useState<Record<string, boolean>>({});

  // State for scroll indicators
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    left: false,
    right: false,
  });

  // Refs for DOM manipulation
  const tabsRef = useRef<HTMLDivElement>(null);         // Outer scrollable container
  const tabsContainerRef = useRef<HTMLDivElement>(null); // Inner tabs container

  // Sync internal activeKey with propActiveKey when controlled
  useEffect(() => {
    if (propActiveKey && propActiveKey !== activeKey) {
      setActiveKey(propActiveKey);
    }
  }, [propActiveKey, activeKey]);

  // Manage visible tabs based on lazyLoad setting
  useEffect(() => {
    if (!lazyLoad) {
      // If not lazy loading, mark all tabs as visible
      const allVisible = tabs.reduce((acc, tab) => {
        acc[tab.key] = true;
        return acc;
      }, {} as Record<string, boolean>);
      setVisibleTabs(allVisible);
    } else {
      // If lazy loading, only mark the active tab as visible, preserving others
      setVisibleTabs((prev) => ({
        ...prev,
        [activeKey]: true,
      }));
    }
  }, [tabs, lazyLoad, activeKey]);

  // Update scroll indicators when necessary
  useEffect(() => {
    if (withScrollIndicators && tabsRef.current) {
      const container = tabsRef.current;
      const checkScrollPosition = () => {
        if (!container) return;

        const hasLeftScroll = container.scrollLeft > 0;
        // Buffer of 2px to account for rendering quirks
        const hasRightScroll =
          container.scrollLeft < container.scrollWidth - container.clientWidth - 2;

        setScrollPosition({
          left: hasLeftScroll,
          right: hasRightScroll,
        });
      };

      checkScrollPosition();
      container.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);

      // Cleanup event listeners
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, [withScrollIndicators, tabs]);

  // Handle clicking a tab
  const handleTabClick = (key: string) => {
    if (key !== activeKey) {
      setActiveKey(key);
      if (lazyLoad) {
        // Mark the clicked tab as visible, preserving others
        setVisibleTabs((prev) => ({
          ...prev,
          [key]: true,
        }));
      }
      onChange?.(key); // Notify parent of change
    }
  };

  // Handle closing a tab (stub implementation)
  const handleTabClose = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering tab click
  };

  // Scroll tabs left or right
  const scrollToTab = (direction: 'left' | 'right') => {
    const container = tabsRef.current;
    if (!container) return;

    const scrollAmount =
      direction === 'left' ? -container.clientWidth / 2 : container.clientWidth / 2;

    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  // Return all necessary values and functions
  return {
    activeKey,
    visibleTabs,
    scrollPosition,
    tabsRef,
    tabsContainerRef,
    handleTabClick,
    handleTabClose,
    scrollToTab,
  };
};