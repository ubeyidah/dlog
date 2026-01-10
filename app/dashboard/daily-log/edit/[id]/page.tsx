import { Suspense } from "react";
import { getQueryClient, trpc, caller } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { EditDailyLogContent } from "./_components/edit-content";
import { Spinner } from "@/components/ui/spinner";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/shared/error-boundary-fallback";
import { notFound } from "next/navigation";
import { TRPCError } from "@trpc/server";

type PageProps = {
  params: Promise<{ id: string }>;
};

const EditDailyLogPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const queryClient = getQueryClient();

  try {
    const log = await caller.daily_log.getById({ id });
    queryClient.setQueryData(
      trpc.daily_log.getById.queryOptions({ id }).queryKey,
      JSON.parse(JSON.stringify(log)),
    );
  } catch (error) {
    if (error instanceof TRPCError && error.code === "NOT_FOUND") {
      notFound();
    }
    throw error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <Spinner className="h-8 w-8" />
          </div>
        }
      >
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <EditDailyLogContent id={id} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default EditDailyLogPage;
