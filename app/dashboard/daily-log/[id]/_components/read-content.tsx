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
  Copy01Icon
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
import { useState } from "react";
import { DeleteDialog } from "../../_components/delete-dialog";
import {RenderEditor} from "@/components/shared/editor/render-editor"

type ReadDailyLogContentProps = {
  id: string;
};

export const ReadDailyLogContent = ({ id }: ReadDailyLogContentProps) => {
  const trpc = useTRPC();
  const { data: log } = useSuspenseQuery(
    trpc.daily_log.getById.queryOptions({ id }),
  );
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; logId?: string; logTitle?: string }>({
    open: false,
  });

  const day = dayjs(log.createdAt).format("DD");
  const month = dayjs(log.createdAt).format("MMMM");
  const year = dayjs(log.createdAt).format("YYYY");

import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";

const exportAsText = () => {
  const htmlContent = generateHTML(JSON.parse(log.content), [StarterKit]);
  const textContent = htmlContent.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  const content = `${log.title}\n\n${textContent}\n\nTags: ${log.tags?.join(', ') || ''}\n\nDate: ${dayjs(log.createdAt).format('MMMM D, YYYY')}`;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${log.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

  return (
    <>
      <SiteHeader label="Read Log">
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="outline" size="icon">
              <HugeiconsIcon icon={MoreVerticalIcon} className="h-4 w-4" />
            </Button>
          } />
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem render={<Link href={`/dashboard/daily-log/edit/${log.id}`} />}>
              <HugeiconsIcon icon={Edit02Icon} className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(window.location.href)}>
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
              onClick={() => setDeleteDialog({ open: true, logId: log.id, logTitle: log.title })}
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
                  <div className="text-2xl lg:text-3xl font-light text-muted-foreground/80 font-semibold mb-2">
                    {month}
                  </div>
                  <div className="text-lg lg:text-xl font-medium text-muted-foreground">
                    {year}
                  </div>
                </div>

                <div className="flex justify-center lg:justify-start">
                  <Badge className={`${moodColors[log.mood]} rounded-md text-sm uppercase px-6 py-3`}>
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
            setDeleteDialog({ open, logId: open ? deleteDialog.logId : undefined, logTitle: open ? deleteDialog.logTitle : undefined })
          }
          logId={deleteDialog.logId}
          logTitle={deleteDialog.logTitle || ''}
        />
      )}
    </>
  );
};
