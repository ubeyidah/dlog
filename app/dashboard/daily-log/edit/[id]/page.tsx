import { Suspense } from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { EditDailyLogContent } from "./_components/edit-content";
import { EditSkeleton } from "./_components/edit-skeleton";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/shared/error-boundary-fallback";

type PageProps = {
  params: Promise<{ id: string }>;
};

const EditDailyLogPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.daily_log.getById.queryOptions({ id }));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={<EditSkeleton />}
      >
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <EditDailyLogContent id={id} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default EditDailyLogPage;
