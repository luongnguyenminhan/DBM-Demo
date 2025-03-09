import { useState, useEffect, useRef, RefObject } from 'react';
import { TabItem } from '@/components/molecules/tabNavigation';

interface ScrollPosition {
  left: boolean;
  right: boolean;
}

interface UseTabNavigationProps {
  tabs: TabItem[];
  defaultActiveKey?: string;
  activeKey?: string;
  onChange?: (activeKey: string) => void;
  lazyLoad?: boolean;
  withScrollIndicators?: boolean;
}

interface UseTabNavigationReturn {
  activeKey: string;
  visibleTabs: Record<string, boolean>;
  scrollPosition: ScrollPosition;
  tabsRef: RefObject<HTMLDivElement | null>;
  tabsContainerRef: RefObject<HTMLDivElement | null>;
  handleTabClick: (key: string) => void;
  handleTabClose: (e: React.MouseEvent) => void;
  scrollToTab: (direction: 'left' | 'right') => void;
}

export const useTabNavigation = ({
  tabs,
  defaultActiveKey,
  activeKey: propActiveKey,
  onChange,
  lazyLoad = true,
  withScrollIndicators = false,
}: UseTabNavigationProps): UseTabNavigationReturn => {
  const [activeKey, setActiveKey] = useState<string>(propActiveKey || defaultActiveKey || (tabs.length > 0 ? tabs[0].key : ''));
  const [visibleTabs, setVisibleTabs] = useState<Record<string, boolean>>({});
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({ left: false, right: false });
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  // Update active key when prop changes
  useEffect(() => {
    if (propActiveKey && propActiveKey !== activeKey) {
      setActiveKey(propActiveKey);
    }
  }, [propActiveKey, activeKey]);

  // Initialize visible tabs state based on lazyLoad option
  useEffect(() => {
    if (!lazyLoad) {
      const allVisible = tabs.reduce((acc, tab) => {
        acc[tab.key] = true;
        return acc;
      }, {} as { [key: string]: boolean });
      setVisibleTabs(allVisible);
    } else {
      setVisibleTabs(prevVisibleTabs => ({
        ...prevVisibleTabs,
        [activeKey]: true
      }));
    }
  }, [tabs, lazyLoad, activeKey]);

  // Check scroll indicators visibility
  useEffect(() => {
    if (withScrollIndicators && tabsContainerRef.current && tabsRef.current) {
      const container = tabsRef.current;
      const checkScrollPosition = () => {
        if (!container) return;
        
        const hasLeftScroll = container.scrollLeft > 0;
        const hasRightScroll = container.scrollLeft < (container.scrollWidth - container.clientWidth - 2); // 2px buffer
        
        setScrollPosition({
          left: hasLeftScroll,
          right: hasRightScroll
        });
      };
      
      checkScrollPosition();
      container.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
      
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, [withScrollIndicators, tabs]);

  // Handle tab click
  const handleTabClick = (key: string) => {
    if (key !== activeKey) {
      setActiveKey(key);
      setVisibleTabs(prev => ({
        ...prev,
        [key]: true
      }));
      onChange?.(key);
    }
  };

  // Handle tab close
  const handleTabClose = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Scroll tab into view
  const scrollToTab = (direction: 'left' | 'right') => {
    const container = tabsRef.current;
    if (!container) return;
    
    const scrollAmount = direction === 'left' 
      ? -container.clientWidth / 2
      : container.clientWidth / 2;
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  return {
    activeKey,
    visibleTabs,
    scrollPosition,
    tabsRef,
    tabsContainerRef,
    handleTabClick,
    handleTabClose,
    scrollToTab
  };
};
