import { Suspense } from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { EditDailyLogContent } from "./_components/edit-content";
import { Spinner } from "@/components/ui/spinner";

type PageProps = {
  params: Promise<{ id: string }>;
};

const EditDailyLogPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.daily_log.getById.queryOptions({ id }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <Spinner className="h-8 w-8" />
          </div>
        }
      >
        <EditDailyLogContent id={id} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default EditDailyLogPage;
