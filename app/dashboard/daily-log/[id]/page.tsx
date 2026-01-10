import { Suspense } from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ReadDailyLogContent } from "./_components/read-content";
import { ReadSkeleton } from "./_components/read-skeleton";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/shared/error-boundary-fallback";

type PageProps = {
  params: Promise<{ id: string }>;
};

const ReadDailyLogPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.daily_log.getById.queryOptions({ id }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ReadSkeleton />}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <ReadDailyLogContent id={id} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default ReadDailyLogPage;