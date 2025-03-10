import { useState, useEffect, useCallback } from 'react';
import { BreadcrumbItem } from '@/components/molecules/breadcrumb';

interface UseBreadcrumbProps {
  items?: BreadcrumbItem[];
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  maxItems?: number;
}

interface UseBreadcrumbReturn {
  activeKey: string;
  items: BreadcrumbItem[];
  visibleItems: BreadcrumbItem[];
  handleItemClick: (key: string) => void;
  setItems: (items: BreadcrumbItem[]) => void;
  addItem: (item: BreadcrumbItem) => void;
  removeItem: (key: string) => void;
  clearItems: () => void;
  updateItem: (key: string, item: Partial<BreadcrumbItem>) => void;
  getItem: (key: string) => BreadcrumbItem | undefined;
}

export const useBreadcrumb = ({
  items: initialItems = [],
  defaultActiveKey,
  onChange,
  maxItems,
}: UseBreadcrumbProps): UseBreadcrumbReturn => {
  const [items, setItems] = useState<BreadcrumbItem[]>(initialItems);
  const [activeKey, setActiveKey] = useState<string>(
    defaultActiveKey || (items.length > 0 ? items[items.length - 1].key : '')
  );

  useEffect(() => {
    if (initialItems.length > 0) {
      setItems(initialItems);
    }
  }, [initialItems]);

  const handleItemClick = (key: string) => {
    setActiveKey(key);
    onChange?.(key);
  };

  const addItem = (item: BreadcrumbItem) => {
    setItems((prev) => [...prev, item]);
    setActiveKey(item.key);
  };

  const removeItem = (key: string) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  };

  const clearItems = () => {
    setItems([]);
    setActiveKey('');
  };

  const getVisibleItems = useCallback(() => {
    if (!maxItems || items.length <= maxItems) {
      return items;
    }

    const start = items.slice(0, Math.ceil(maxItems / 2));
    const end = items.slice(-Math.floor(maxItems / 2));
    return [
      ...start,
      { key: 'collapse', label: '...', disabled: true },
      ...end,
    ];
  }, [items, maxItems]);

  const updateItem = (key: string, newItemData: Partial<BreadcrumbItem>) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.key === key ? { ...item, ...newItemData } : item
      )
    );
  };

  const getItem = (key: string) => {
    return items.find(item => item.key === key);
  };

  return {
    activeKey,
    items,
    visibleItems: getVisibleItems(),
    handleItemClick,
    setItems,
    addItem,
    removeItem,
    clearItems,
    updateItem,
    getItem,
  };
};
