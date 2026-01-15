"use client";

import { useState } from "react";

import { Image01Icon, RefreshCw, Upload02Icon, Alert02Icon, Loading03Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useFileUploader } from "@/hooks/use-file-uploader";
import { UPLOAD_CONFIGS } from "@/lib/constants";
import { bytesToMB } from "@/lib/utils";

export default function LogFileUploader() {
  const fileInfo = UPLOAD_CONFIGS["image"];
  const maxSizeMB = bytesToMB(fileInfo.maxSize);

  // Dummy states for demonstration
  const [isUploading] = useState(false);
  const [progress] = useState(75);
  const [error] = useState<string | null>();
  const [uploadedImage] = useState<string | null>();

  const { getInputProps, getRootProps, isDragActive } = useFileUploader({
    fileType: "image",
  });

  if (uploadedImage) {
    return <SuccessState image={uploadedImage} />;
  }

  const renderState = () => {
    if (error) {
      return <ErrorState error={error} />;
    }

    if (isUploading) {
      return <ProgressState progress={progress} />;
    }

    return <IdleState maxSizeMB={maxSizeMB} />;
  };

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
          {renderState()}
        </div>
      </div>
    </div>
  );
}

interface ErrorStateProps {
  error: string | undefined;
}

function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
      <div
        aria-hidden="true"
        className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border border-destructive/20 bg-destructive/10"
      >
        <HugeiconsIcon icon={Alert02Icon} className="size-4 text-destructive" />
      </div>
      <p className="mb-1.5 font-medium text-sm text-destructive">Upload failed</p>
      <p className="text-muted-foreground text-xs mb-4">{error}</p>
      <Button className="mt-2" variant="outline">
        <HugeiconsIcon
          icon={RefreshCw}
          aria-hidden="true"
          className="-ms-1 size-4 opacity-60"
        />
        Retry upload
      </Button>
    </div>
  );
}

interface SuccessStateProps {
  image: string;
}

function SuccessState({ image }: SuccessStateProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleRemove = () => {
    // TODO: Implement remove functionality
    console.log("Remove image");
  };

  const handleOpenPreview = () => {
    setIsPreviewOpen(true);
  };

  // TODO: configure and use images from nextjs
  return (
    <>
      <div className="relative group">
        <img
          src={image}
          alt="Uploaded log image"
          className="w-full h-auto cursor-pointer transition-opacity group-hover:opacity-95 rounded-lg"
          onClick={handleOpenPreview}
        />

        <div className="absolute top-2 left-2 right-2">
          <Button
            size="sm"
            className="rounded-full shadow-lg bg-black/70 hover:bg-black/80 text-white border-0"
            onClick={handleRemove}
          >
            <HugeiconsIcon icon={Cancel01Icon} className="size-4" />
          </Button>
        </div>

        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          Click to preview
        </div>
      </div>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-7xl max-h-[90vh]">
          <DialogTitle className="text-lg font-semibold text-foreground">Memory Preview</DialogTitle>
          <div className="relative flex items-center justify-center w-full h-full min-h-[400px]">
            <img
              src={image}
              alt="Memory preview"
              className="w-auto h-auto max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            />
          </div>
          <p className="text-sm text-muted-foreground text-center mt-4">
            Relive this moment • Click outside or press ESC to close
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}

interface ProgressStateProps {
  progress: number;
}

function ProgressState({ progress }: ProgressStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
      <div className="mb-3 flex items-center justify-center">
        <div className="relative">
          <HugeiconsIcon
            icon={Loading03Icon}
            className="size-16 animate-spin text-primary"
          />
          <div className="absolute -inset-2 flex items-center justify-center">
            <span className="text-xs font-semibold text-primary">{progress}%</span>
          </div>
        </div>
      </div>
      <p className="mb-1.5 font-medium text-sm">Uploading your log image...</p>
      <Progress value={progress} className="w-full max-w-xs mt-2" />
      <p className="text-muted-foreground text-xs mt-2">
        {progress < 25
          ? "Starting upload..."
          : progress < 50
            ? "Processing image..."
            : progress < 75
              ? "Almost there..."
              : "Finalizing upload..."
        }
      </p>
    </div>
  );
}

interface IdleStateProps {
  maxSizeMB: number;
}

function IdleState({ maxSizeMB }: IdleStateProps) {
  return (
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
  );
}
