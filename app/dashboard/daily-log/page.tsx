import { Suspense } from "react";
import { Book01Icon, FireIcon, CalendarIcon, Smile } from "@hugeicons/core-free-icons";
import { StatCard, Stat } from "./_components/stat-card";
import { FilterControls } from "./_components/filter-controls";
import { DailyLogTable, DailyLog } from "./_components/daily-log-table";
import dayjs from "dayjs";
import { LOG_MOODS } from "@/lib/validation/daily-log.schema";

const Page = () => {
  const stats: Stat[] = [
    {
      id: "total-memories",
      icon: Book01Icon,
      label: "Total Memories",
      value: "1,247",
      description: "All time entries",
      color: "text-purple-400",
    },
    {
      id: "avg-mood",
      icon: Smile,
      label: "Emotional Peak",
      value: "Happy",
      description: "Dominant sentiment",
      color: "text-yellow-300",
    },
    {
      id: "current-streak",
      icon: FireIcon,
      label: "Current Streak",
      value: "12 days",
      description: "Keep it up!",
      color: "text-yellow-400",
    },
    {
      id: "consistency",
      icon: CalendarIcon,
      label: "Consistency",
      value: "85%",
      description: "Last 30 days",
      color: "text-green-400",
      progress: 85,
    },
  ];

  const dummyLogs: DailyLog[] = [
    {
      id: '1',
      createdAt: dayjs().subtract(1, 'day').toDate(),
      mood: LOG_MOODS[0],
      title: 'Fixed auth bug in dLog',
      tags: ['#nextjs', '#auth'],
    },
    {
      id: '2',
      createdAt: dayjs().subtract(2, 'days').toDate(),
      mood: LOG_MOODS[1],
      title: 'Learned about React Server Components and how they work with Next.js App Router',
      tags: ['#react', '#nextjs'],
    },
    {
      id: '3',
      createdAt: dayjs().subtract(3, 'days').toDate(),
      mood: LOG_MOODS[2],
      title: 'Grateful for the support from the community',
      tags: ['#community', '#gratitude'],
    },
    {
      id: '4',
      createdAt: dayjs().subtract(4, 'days').toDate(),
      mood: LOG_MOODS[3],
      title: 'Energized after morning workout',
      tags: ['#fitness', '#health'],
    },
    {
      id: '5',
      createdAt: dayjs().subtract(5, 'days').toDate(),
      mood: LOG_MOODS[4],
      title: 'Peaceful meditation session',
      tags: ['#mindfulness', '#meditation'],
    },
    {
      id: '6',
      createdAt: dayjs().subtract(6, 'days').toDate(),
      mood: LOG_MOODS[5],
      title: 'Neutral day, got some work done',
      tags: ['#work', '#productivity'],
    },
    {
      id: '7',
      createdAt: dayjs().subtract(7, 'days').toDate(),
      mood: LOG_MOODS[6],
      title: 'Reflective thoughts on life goals',
      tags: ['#reflection', '#goals'],
    },
    {
      id: '8',
      createdAt: dayjs().subtract(8, 'days').toDate(),
      mood: LOG_MOODS[7],
      title: 'Curious about AI advancements',
      tags: ['#ai', '#technology'],
    },
    {
      id: '9',
      createdAt: dayjs().subtract(9, 'days').toDate(),
      mood: LOG_MOODS[8],
      title: 'Struggling with time management',
      tags: ['#time', '#struggle'],
    },
    {
      id: '10',
      createdAt: dayjs().subtract(10, 'days').toDate(),
      mood: LOG_MOODS[9],
      title: 'Tired after long coding session',
      tags: ['#coding', '#tired'],
    },
  ];

  return (
    <div>
      <div className="grid py-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>
      <Suspense fallback={<div className="p-4">Loading filters...</div>}>
        <FilterControls />
      </Suspense>
      <div className="mt-2">
        <DailyLogTable data={dummyLogs} />
      </div>
    </div>
  );
};

export default Page;
