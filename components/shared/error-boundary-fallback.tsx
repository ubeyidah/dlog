"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Warning } from "@hugeicons/core-free-icons";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="bg-destructive/5 p-6 py-12 rounded-lg flex flex-col items-center text-center">
      <HugeiconsIcon icon={Warning} className="w-12 h-12 text-red-500 mb-4" />
      <h3 className="text-lg font-mono text-red-700 uppercase">Something went wrong</h3>
      <p className="text-destructive mb-5">{error.message || "An error occurred while loading the content."}</p>
      {error.message.includes("logged") ?
        <Link href="/sign-in" className={buttonVariants()}>Login</Link> :
        <Button variant={"destructive"} onClick={resetErrorBoundary}>Retry</Button>}
    </div>
  );
}
