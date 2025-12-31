import { useMemo } from "react";

interface UsePaginationProps {
  currentPage: number;
  paginationItemsToDisplay: number;
  totalPages: number;
}

export function usePagination({
  currentPage,
  paginationItemsToDisplay,
  totalPages,
}: UsePaginationProps) {
  return useMemo(() => {
    const pages: number[] = [];
    const half = Math.floor(paginationItemsToDisplay / 2);

    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + paginationItemsToDisplay - 1);

    // Adjust start if end is at totalPages
    if (end === totalPages) {
      start = Math.max(1, end - paginationItemsToDisplay + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    const showLeftEllipsis = start > 1;
    const showRightEllipsis = end < totalPages;

    return { pages, showLeftEllipsis, showRightEllipsis };
  }, [currentPage, paginationItemsToDisplay, totalPages]);
}