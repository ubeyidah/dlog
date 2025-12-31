'use client';

import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQueryState } from "nuqs";
import { usePagination } from "@/hooks/use-pagination";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

type DailyLogPaginationProps = {
  totalPages: number;
  defaultPage: number;
  defaultLimit: number;
};

export default function DailyLogPagination({
  totalPages,
  defaultPage,
  defaultLimit,
}: DailyLogPaginationProps) {
  const [page, setPage] = useQueryState('page', {
    defaultValue: defaultPage,
    parse: (value) => {
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? defaultPage : Math.max(1, Math.min(parsed, totalPages));
    },
  });

  useQueryState('limit', {
    defaultValue: defaultLimit,
    parse: (value) => {
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? defaultLimit : parsed;
    },
  });

  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage: page,
    paginationItemsToDisplay: 5,
    totalPages,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Pagination>
      <PaginationContent className="-space-x-px inline-flex gap-0 rounded-md shadow-xs rtl:space-x-reverse">
        <PaginationItem className="[&:first-child>a]:rounded-s-md [&:last-child>a]:rounded-e-md">
          <PaginationLink
            aria-disabled={page === 1 ? true : undefined}
            aria-label="Go to previous page"
            className={cn(
              buttonVariants({
                variant: "outline",
              }),
              "rounded-none shadow-none focus-visible:z-10 aria-disabled:pointer-events-none [&[aria-disabled]>svg]:opacity-50",
            )}
            onClick={() => page > 1 && handlePageChange(page - 1)}
            role={page === 1 ? "link" : undefined}
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} aria-hidden="true" size={16} />
          </PaginationLink>
        </PaginationItem>

        {/* Left ellipsis (...) */}
        {showLeftEllipsis && (
          <PaginationItem className="[&:first-child>a]:rounded-s-md [&:last-child>a]:rounded-e-md">
            <PaginationEllipsis
              className={cn(
                buttonVariants({
                  variant: "outline",
                }),
                "pointer-events-none rounded-none shadow-none",
              )}
            />
          </PaginationItem>
        )}

        {/* Page number links */}
        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              className={cn(
                buttonVariants({
                  variant: "outline",
                }),
                "rounded-none shadow-none focus-visible:z-10",
                p === page && "border-primary bg-primary",
              )}
              onClick={() => handlePageChange(p)}
              isActive={p === page}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Right ellipsis (...) */}
        {showRightEllipsis && (
          <PaginationItem className="[&:first-child>a]:rounded-s-md [&:last-child>a]:rounded-e-md">
            <PaginationEllipsis
              className={cn(
                buttonVariants({
                  variant: "outline",
                }),
                "pointer-events-none rounded-none shadow-none",
              )}
            />
          </PaginationItem>
        )}

        {/* Next page button */}
        <PaginationItem className="[&:first-child>a]:rounded-s-md [&:last-child>a]:rounded-e-md">
          <PaginationLink
            aria-disabled={page === totalPages ? true : undefined}
            aria-label="Go to next page"
            className={cn(
              buttonVariants({
                variant: "outline",
              }),
              "rounded-none shadow-none focus-visible:z-10 aria-disabled:pointer-events-none [&[aria-disabled]>svg]:opacity-50",
            )}
            onClick={() => page < totalPages && handlePageChange(page + 1)}
            role={page === totalPages ? "link" : undefined}
          >
            <HugeiconsIcon icon={ArrowRight01Icon} aria-hidden="true" size={16} />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
