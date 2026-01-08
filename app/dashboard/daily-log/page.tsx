import { Suspense } from "react";
import { FilterControls } from "./_components/filter-controls";
import { DailyLogTable } from "./_components/daily-log-table";
import { DailyLogTableSkeleton } from "./_components/daily-log-table-skeleton";
import DailyLogPagination from "./_components/daily-log-pagination";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createLoader, parseAsString, parseAsIsoDateTime } from "nuqs/server";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/shared/error-boundary-fallback";
import LogStats from "./_components/log-stats";

const searchParamsParsers = {
  search: parseAsString.withDefault(""),
  mood: parseAsString,
  startDate: parseAsIsoDateTime,
  endDate: parseAsIsoDateTime,
};

const loadSearchParams = createLoader(searchParamsParsers);

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Page = async ({ searchParams }: PageProps) => {
  const queryClient = getQueryClient();
  const { search, mood, startDate, endDate } =
    await loadSearchParams(searchParams);

  // Serialize dates for TRPC input
  const serializedStartDate = startDate ? startDate.toISOString() : null;
  const serializedEndDate = endDate ? endDate.toISOString() : null;

  void queryClient.prefetchQuery(
    trpc.daily_log.getAll.queryOptions({
      search,
      mood,
      startDate: serializedStartDate,
      endDate: serializedEndDate,
    }),
  );

  return (
    <div>
      <div className="grid py-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <LogStats />
      </div>
      <Suspense fallback={<div className="p-4">Loading filters...</div>}>
        <FilterControls />
      </Suspense>
      <div className="mt-2">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<DailyLogTableSkeleton />}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <DailyLogTable />
              <div className="mt-4 w-fit ml-auto">
                <DailyLogPagination
                  totalPages={20}
                  defaultPage={4}
                  defaultLimit={5}
                />
              </div>
            </ErrorBoundary>
          </Suspense>
        </HydrationBoundary>
      </div>
    </div>
  );
};

export default Page;
