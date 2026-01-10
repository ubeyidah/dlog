import { Suspense } from "react";
import { ReadDailyLogContent } from "./_components/read-content";
import { ReadSkeleton } from "./_components/read-skeleton";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/shared/error-boundary-fallback";

type PageProps = {
  params: Promise<{ id: string }>;
};

const ReadDailyLogPage = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <Suspense fallback={<ReadSkeleton />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ReadDailyLogContent id={id} />
      </ErrorBoundary>
    </Suspense>
  );
};

export default ReadDailyLogPage;