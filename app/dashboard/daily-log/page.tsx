import { Suspense } from "react";
import { Book01Icon, FireIcon, CalendarIcon, Smile } from "@hugeicons/core-free-icons";
import { StatCard, Stat } from "./_components/stat-card";
import { FilterControls } from "./_components/filter-controls";
import { DailyLogTable } from "./_components/daily-log-table";
import DailyLogPagination from "./_components/daily-log-pagination";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createLoader, parseAsString } from "nuqs/server";

const searchParamsParsers = {
  search: parseAsString.withDefault(''),
};

const loadSearchParams = createLoader(searchParamsParsers);

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const Page = async ({ searchParams }: PageProps) => {
  const queryClient = getQueryClient()
  const { search } = await loadSearchParams(searchParams)
  void queryClient.prefetchQuery(trpc.daily_log.getAll.queryOptions({ search }))

  const stats: Stat[] = [
    {
      id: "total-memories",
      icon: Book01Icon,
      label: "Total Memories",
      value: "1,247",
      description: "All time entries",
      color: "text-purple-400",
    },
    {
      id: "avg-mood",
      icon: Smile,
      label: "Emotional Peak",
      value: "Happy",
      description: "Dominant sentiment",
      color: "text-yellow-300",
    },
    {
      id: "current-streak",
      icon: FireIcon,
      label: "Current Streak",
      value: "12 days",
      description: "Keep it up!",
      color: "text-yellow-400",
    },
    {
      id: "consistency",
      icon: CalendarIcon,
      label: "Consistency",
      value: "85%",
      description: "Last 30 days",
      color: "text-green-400",
      progress: 85,
    },
  ];


  return (
    <div>
      <div className="grid py-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>
      <Suspense fallback={<div className="p-4">Loading filters...</div>}>
        <FilterControls />
      </Suspense>
      <div className="mt-2">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<div className="p-4">Loading logs...</div>}>
            <DailyLogTable />
          </Suspense>
        </HydrationBoundary>
        <div className="mt-4 w-fit ml-auto">
          <Suspense fallback={<div className="p-4">Loading pagination...</div>}>
            <DailyLogPagination
              totalPages={20}
              defaultPage={4}
              defaultLimit={5}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Page;
