"use client";

import { useState } from "react";

import { Image01Icon, Upload02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useFileUploader } from "@/hooks/use-file-uploader";
import { UPLOAD_CONFIGS } from "@/lib/constants";
import { bytesToMB } from "@/lib/utils";

export default function LogFileUploader() {
  const fileInfo = UPLOAD_CONFIGS["image"];
  const maxSizeMB = bytesToMB(fileInfo.maxSize);

  // Dummy states for demonstration
  const [isUploading] = useState(true);
  const [progress] = useState(75);
  const [error] = useState<string | null>("Upload failed due to network error");

  const { getInputProps, getRootProps, isDragActive } = useFileUploader({
    fileType: "image",
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <div
          {...getRootProps()}
          className="relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-input border-dashed p-4 transition-colors has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
          data-dragging={isDragActive || undefined}
        >
          <input
            {...getInputProps()}
            aria-label="Upload image file"
            className="sr-only"
          />
          {isUploading ? (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <p className="mb-1.5 font-medium text-sm">Uploading your log image...</p>
              <Progress value={progress} className="w-full mt-2" />
              <p className="text-muted-foreground text-xs mt-2">{progress}% uploaded</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <div
                aria-hidden="true"
                className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
              >
                <HugeiconsIcon icon={Image01Icon} className="size-4 opacity-60" />
              </div>
              <p className="mb-1.5 font-medium text-sm">Drop your daily log image here</p>
              <p className="text-muted-foreground text-xs">
                SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)
              </p>
              <Button className="mt-4" variant="outline">
                <HugeiconsIcon
                  icon={Upload02Icon}
                  aria-hidden="true"
                  className="-ms-1 size-4 opacity-60"
                />
                Select image
              </Button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
