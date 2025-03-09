import { useState } from 'react';

interface UsePaginationProps {
  totalPages: number;
  initialPage?: number;
  siblingCount?: number;
}

interface UsePaginationReturn {
  currentPage: number;
  pageRange: number[];
  setPage: (page: number) => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
}

export const usePagination = ({
  totalPages,
  initialPage = 1,
  siblingCount = 1,
}: UsePaginationProps): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const setPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageRange = () => {
    const range = [];
    const totalVisiblePages = siblingCount * 2 + 1;

    if (totalPages <= totalVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      let start = Math.max(1, currentPage - siblingCount);
      let end = Math.min(totalPages, currentPage + siblingCount);

      if (currentPage <= siblingCount + 1) {
        end = totalVisiblePages;
      } else if (currentPage >= totalPages - siblingCount) {
        start = totalPages - totalVisiblePages + 1;
      }

      for (let i = start; i <= end; i++) {
        range.push(i);
      }

      if (start > 1) {
        range.unshift(-1);
        range.unshift(1);
      }

      if (end < totalPages) {
        range.push(-2);
        range.push(totalPages);
      }
    }

    return range;
  };

  return {
    currentPage,
    pageRange: getPageRange(),
    setPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
    goToNextPage: () => setPage(currentPage + 1),
    goToPrevPage: () => setPage(currentPage - 1),
    goToFirstPage: () => setPage(1),
    goToLastPage: () => setPage(totalPages),
  };
};
