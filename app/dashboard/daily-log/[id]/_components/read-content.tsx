"use client";

import { Badge } from "@/components/ui/badge";
import { moodEmojis } from "@/lib/moods";
import { LOG_MOODS } from "@/lib/validation/daily-log.schema";
import { moodColors } from "../../_components/daily-log-table";
import dayjs from "dayjs";
import {
  Edit02Icon,
  Share08Icon,
  Delete01Icon,
  MoreVerticalIcon,
  Download01Icon,
  Copy01Icon,
  PrinterIcon
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
import { DailyLog } from "@/lib/types";

// Dummy data generator
const getDummyLog = (id: string) => {
  const sampleContent = [
    "Today was a productive day. I managed to complete all my tasks and even had time to reflect on my goals. The weather was beautiful, which put me in a great mood. I spent some quality time with family and felt grateful for the simple things in life.",
    "Feeling inspired after reading that book. The ideas are flowing, and I'm excited to start new projects. Sometimes it's the small things that make the biggest difference in our daily lives.",
    "Had a challenging day at work, but I'm grateful for the opportunity to learn and grow. Taking time to meditate helped me find peace amidst the chaos. Tomorrow is a new day.",
    "Energized and ready to tackle the week ahead. Made progress on my personal development goals and connected with some amazing people. Life is good when you're aligned with your purpose.",
    "A day of reflection and introspection. Thinking about my journey so far and feeling proud of how far I've come. The key to happiness is gratitude and mindfulness.",
  ];

  const sampleTitles = [
    "A Productive Morning",
    "Inspiring Thoughts",
    "Finding Inner Peace",
    "New Beginnings",
    "Grateful Reflections",
    "Creative Flow",
    "Mindful Moments",
  ];

  const hash = id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const moodIndex = hash % LOG_MOODS.length;
  const contentIndex = (hash + 1) % sampleContent.length;
  const titleIndex = (hash + 2) % sampleTitles.length;

  return {
    id,
    title: sampleTitles[titleIndex],
    content: sampleContent[contentIndex],
    mood: LOG_MOODS[moodIndex],
    tags: ["reflection", "growth", "mindfulness"].slice(0, (hash % 3) + 1),
    createdAt: new Date(Date.now() - (hash % 30) * 24 * 60 * 60 * 1000), // Random date within last 30 days
  };
};

type ReadDailyLogContentProps = {
  id: string;
};

export const ReadDailyLogContent = ({ id }: ReadDailyLogContentProps) => {
  const log = getDummyLog(id);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; log?: DailyLog }>({
    open: false,
  });

  const day = dayjs(log.createdAt).format("D");
  const month = dayjs(log.createdAt).format("MMMM");
  const year = dayjs(log.createdAt).format("YYYY");

  const exportAsText = () => {
   const content = `${log.title}\n\n${log.content}\n\nTags: ${log.tags.join(', ')}\n\nDate: ${dayjs(log.createdAt).format('MMMM D, YYYY')}`;
   const blob = new Blob([content], { type: 'text/plain' });
   const url = URL.createObjectURL(blob);
   const a = document.createElement('a');
   a.href = url;
   a.download = `${log.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
   document.body.appendChild(a);
   a.click();
   document.body.removeChild(a);
   URL.revokeObjectURL(url);
  }

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
              onClick={() => setDeleteDialog({ open: true, log: log as DailyLog })}
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

            {/* Right Column - Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-8">
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
                  {log.title}
                </h1>

                <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
                  <div className="text-foreground leading-relaxed whitespace-pre-wrap text-lg lg:text-xl">
                    {log.content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {deleteDialog.log && (
        <DeleteDialog
          open={deleteDialog.open}
          onOpenChange={(open) =>
            setDeleteDialog({ open, log: open ? deleteDialog.log : undefined })
          }
          logId={deleteDialog.log.id}
          logTitle={deleteDialog.log.title}
        />
      )}
    </>
  );
};
