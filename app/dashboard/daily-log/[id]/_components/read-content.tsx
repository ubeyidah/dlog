"use client";

import { Badge } from "@/components/ui/badge";
import { moodEmojis } from "@/lib/moods";
import { moodColors } from "../../_components/daily-log-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import dayjs from "dayjs";
import {
  Edit02Icon,
  Share08Icon,
  Delete01Icon,
  MoreVerticalIcon,
  Download01Icon,
  Copy01Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/shared/site-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteDialog } from "../../_components/delete-dialog";
import { RenderEditor } from "@/components/shared/editor/render-editor";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type ReadDailyLogContentProps = {
  id: string;
};

type ImageViewState = "hidden" | "revealed" | "expanded";

export const ReadDailyLogContent = ({ id }: ReadDailyLogContentProps) => {
  const trpc = useTRPC();
  const { data: log } = useSuspenseQuery(
    trpc.daily_log.getById.queryOptions({ id }),
  );
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    logId?: string;
    logTitle?: string;
  }>({
    open: false,
  });
  const [imageViewById, setImageViewById] = useState<
    Record<string, ImageViewState>
  >({});

  const getImageViewState = (fileId: string): ImageViewState => {
    return imageViewById[fileId] ?? "hidden";
  };

  const setImageViewState = (fileId: string, next: ImageViewState): void => {
    setImageViewById((prev) => ({
      ...prev,
      [fileId]: next,
    }));
  };

  const day = dayjs(log.createdAt).format("DD");
  const month = dayjs(log.createdAt).format("MMMM");
  const year = dayjs(log.createdAt).format("YYYY");
  const expandedFile = log.files?.find(
    (file) => getImageViewState(file.id) === "expanded",
  );

  useEffect(() => {
    if (!expandedFile) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setImageViewState(expandedFile.id, "revealed");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expandedFile]);

  const exportAsText = () => {
    const htmlContent = generateHTML(JSON.parse(log.content), [StarterKit]);
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    const rawTextContent = tempDiv.textContent || "";
    const textContent = rawTextContent.replace(/\s+/g, " ").trim();
    const content = `${log.title}\n\n${textContent}\n\nTags: ${log.tags?.join(", ") || ""}\n\nDate: ${dayjs(log.createdAt).format("MMMM D, YYYY")}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${log.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadImage = async (fileKey: string, fileName: string): Promise<void> => {
    try {
      const response = await fetch(`https://dlog.t3.storage.dev/${fileKey}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download image:", error);
      toast.error("Failed to download image");
    }
  };

  return (
    <>
      <SiteHeader label="Read Log">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" size="icon">
                <HugeiconsIcon icon={MoreVerticalIcon} className="h-4 w-4" />
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              render={<Link href={`/dashboard/daily-log/edit/${log.id}`} />}
            >
              <HugeiconsIcon icon={Edit02Icon} className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(window.location.href);
                  toast.success("Link copied to clipboard");
                } catch (error) {
                  console.error("Failed to copy link:", error);
                  toast.error("Failed to copy link");
                }
              }}
            >
              <HugeiconsIcon icon={Copy01Icon} className="h-4 w-4 mr-2" />
              Copy Link
            </DropdownMenuItem>
            <DropdownMenuItem onClick={exportAsText}>
              <HugeiconsIcon icon={Download01Icon} className="h-4 w-4 mr-2" />
              Export as Text
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HugeiconsIcon icon={Share08Icon} className="h-4 w-4 mr-2" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={() =>
                setDeleteDialog({
                  open: true,
                  logId: log.id,
                  logTitle: log.title,
                })
              }
            >
              <HugeiconsIcon icon={Delete01Icon} className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SiteHeader>

      <div className="min-h-screen bg-background">
        <div className="container max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-8">
              <div className="space-y-6">
                <div className="text-center lg:text-left">
                  <div className="text-6xl lg:text-7xl font-bold text-primary/40 mb-4 tracking-tight">
                    {day}
                  </div>
                  <div className="text-2xl lg:text-3xl font-semibold text-muted-foreground/80 mb-2">
                    {month}
                  </div>
                  <div className="text-lg lg:text-xl font-medium text-muted-foreground">
                    {year}
                  </div>
                </div>

                <div className="flex justify-center lg:justify-start">
                  <Badge
                    className={`${moodColors[log.mood]} rounded-md text-sm uppercase px-6 py-3`}
                  >
                    {moodEmojis[log.mood]} {log.mood.toLowerCase()}
                  </Badge>
                </div>

                {log.tags.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-muted-foreground">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                      {log.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="rounded-full px-3 py-1.5 text-sm font-medium"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {log.files && log.files.length > 0 && (
                  <div className="space-y-4">
                    {log.files.map((file) => {
                      const imageState = getImageViewState(file.id);
                      const isRevealed = imageState !== "hidden";
                      const isExpanded = imageState === "expanded";

                      return (
                        <div key={file.id} className="space-y-4">
                          <div className="relative [perspective:1200px]">
                            <div
                              className={cn(
                                "grid w-full transition-transform duration-700 [transform-style:preserve-3d]",
                                isRevealed && "[transform:rotateY(180deg)]",
                              )}
                            >
                              <div className="col-start-1 row-start-1 w-full min-h-48 rounded-lg border-2 border-dashed border-muted-foreground/20 bg-muted/30 [backface-visibility:hidden]">
                                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                                  <p className="text-sm text-muted-foreground">
                                    Hidden image
                                  </p>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      setImageViewState(file.id, "revealed")
                                    }
                                  >
                                    Show image
                                  </Button>
                                </div>
                              </div>

                              <div className="col-start-1 row-start-1 w-full overflow-hidden rounded-lg border-b border-muted/40 shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)]">
                                <button
                                  type="button"
                                  className="group relative w-full"
                                  onClick={() =>
                                    setImageViewState(file.id, "expanded")
                                  }
                                >
                                  <img
                                    src={`https://dlog.t3.storage.dev/${file.fileKey}`}
                                    alt={log.title}
                                    className="w-full h-auto object-contain"
                                  />
                                  <span className="absolute inset-0 bg-black/30 opacity-0 transition-opacity group-hover:opacity-100" />
                                  <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                                    <HugeiconsIcon
                                      icon={ViewIcon}
                                      className="h-4 w-4 mr-2"
                                    />
                                    View full image
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>

                          {imageState !== "hidden" && (
                            <div className="flex flex-wrap gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setImageViewState(file.id, "hidden")
                                }
                              >
                                Hide image
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  downloadImage(
                                    file.fileKey,
                                    `${log.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}-${file.id}.jpg`,
                                  )
                                }
                              >
                                <HugeiconsIcon
                                  icon={Download01Icon}
                                  className="h-4 w-4 mr-2"
                                />
                                Download
                              </Button>
                              {isExpanded && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    setImageViewState(file.id, "revealed")
                                  }
                                >
                                  Collapse preview
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-8">
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
                  {log.title}
                </h1>

                <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
                  <div className="text-foreground leading-relaxed whitespace-pre-wrap text-lg lg:text-xl">
                    <RenderEditor json={JSON.parse(log.content)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {deleteDialog.logId && (
        <DeleteDialog
          open={deleteDialog.open}
          onOpenChange={(open) =>
            setDeleteDialog({
              open,
              logId: open ? deleteDialog.logId : undefined,
              logTitle: open ? deleteDialog.logTitle : undefined,
            })
          }
          logId={deleteDialog.logId}
          logTitle={deleteDialog.logTitle || ""}
        />
      )}

      {expandedFile && (
        <div
          className="fixed inset-0 z-50 bg-black/70"
          onClick={() => setImageViewState(expandedFile.id, "revealed")}
        >
          <div className="flex h-full w-full items-center justify-center p-4">
            <div
              className="w-full max-w-5xl space-y-4"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setImageViewState(expandedFile.id, "revealed")
                  }
                >
                  Close
                </Button>
              </div>
              <img
                src={`https://dlog.t3.storage.dev/${expandedFile.fileKey}`}
                alt={log.title}
                className="w-full h-auto rounded-lg shadow-sm"
              />
              <Button
                size="sm"
                onClick={() =>
                  downloadImage(
                    expandedFile.fileKey,
                    `${log.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}-${expandedFile.id}.jpg`,
                  )
                }
              >
                <HugeiconsIcon
                  icon={Download01Icon}
                  className="h-4 w-4 mr-2"
                />
                Download image
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
