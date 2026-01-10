"use client";

import { Skeleton } from "@/components/ui/skeleton";
import SiteHeader from "@/components/shared/site-header";

export const EditSkeleton = () => {
  return (
    <div>
      <SiteHeader label="Edit Log">
        <Skeleton className="h-10 w-32" />
      </SiteHeader>
      <div className="grid gap-6 md:grid-cols-[3fr_1fr]">
        <div>
          <div className="py-5">
            <Skeleton className="h-8 w-64" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
        <div className="space-y-3 py-5">
          <div>
            <Skeleton className="h-5 w-24 mb-2" />
            <Skeleton className="h-64 w-full" />
          </div>
          <div>
            <Skeleton className="h-5 w-12 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="h-5 w-12 mb-2" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};