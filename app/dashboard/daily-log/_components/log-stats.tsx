"use client";

import { ErrorFallback } from "@/components/shared/error-boundary-fallback";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { StatCard, StatCardSkeleton } from "./stat-card";

const LogStats = () => {
  const trpc = useTRPC();
  const { data, isPending, error, isError, refetch } = useQuery(
    trpc.daily_log.stats.queryOptions(),
  );
  if (isPending) {
    return Array.from({ length: 4 }).map((_, i) => (
      <StatCardSkeleton key={i} />
    ));
  }
  if (isError) {
    return (
      <ErrorFallback
        className="col-span-4"
        error={new Error(error.message)}
        resetErrorBoundary={refetch}
      />
    );
  }
  return (
    <>
      {data.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </>
  );
};

export default LogStats;
