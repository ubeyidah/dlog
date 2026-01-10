"use client";

import { Skeleton } from "@/components/ui/skeleton";
import SiteHeader from "@/components/shared/site-header";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { MoreVerticalIcon } from "@hugeicons/core-free-icons";

export const ReadSkeleton = () => {
  return (
    <>
      <SiteHeader label="Read Log">
        <Button variant="ghost" size="icon" disabled>
          <HugeiconsIcon icon={MoreVerticalIcon} className="h-4 w-4" />
        </Button>
      </SiteHeader>

      <div className="min-h-screen bg-background">
        <div className="container max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Date Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="space-y-6">
                <div className="text-center lg:text-left">
                  <Skeleton className="h-16 w-16 lg:h-20 lg:w-20 rounded-lg mx-auto lg:mx-0 mb-4" />
                  <Skeleton className="h-8 w-24 mx-auto lg:mx-0 mb-2" />
                  <Skeleton className="h-6 w-16 mx-auto lg:mx-0" />
                </div>

                <div className="flex justify-center lg:justify-start">
                  <Skeleton className="h-8 w-32 rounded-md" />
                </div>

                <div className="space-y-4">
                  <Skeleton className="h-5 w-12 mx-auto lg:mx-0" />
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    <Skeleton className="h-7 w-16 rounded-full" />
                    <Skeleton className="h-7 w-20 rounded-full" />
                    <Skeleton className="h-7 w-14 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-8">
                <Skeleton className="h-12 w-3/4 lg:h-14 lg:w-2/3" />

                <div className="space-y-4">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-5/6" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-4/6" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};