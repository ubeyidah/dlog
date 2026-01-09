"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Warning } from "@hugeicons/core-free-icons";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
  className?: string;
}

export function ErrorFallback({
  error,
  resetErrorBoundary,
  className,
}: ErrorFallbackProps) {
  return (
    <div
      className={cn(
        "bg-destructive/5 p-6 py-12 rounded-lg flex flex-col items-center text-center",
        className,
      )}
    >
      <HugeiconsIcon icon={Warning} className="w-12 h-12 text-red-500 mb-4" />
      {!error.message.includes("logged") && (
        <h3 className="text-lg font-mono text-red-700 uppercase">
          Something went wrong
        </h3>
      )}
      <p className="text-destructive mb-5">
        {error.message || "An error occurred while loading the content."}
      </p>
      {error.message.includes("logged") ? (
        <Link href="/sign-in" className={buttonVariants()}>
          Login
        </Link>
      ) : (
        <Button variant={"destructive"} onClick={resetErrorBoundary}>
          Retry
        </Button>
      )}
    </div>
  );
}
