"use client";

import SiteHeader from "@/components/shared/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Chart02FreeIcons,
  TrendUpIcon,
  CalendarIcon,
  Smile,
  FireIcon,
  Book01Icon,
} from "@hugeicons/core-free-icons";
import { Progress } from "@/components/ui/progress";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, Line, LineChart, XAxis, YAxis } from "recharts";

const StatsPage = () => {
  // Mock data for charts
  const moodTrendData = [
    { month: "Jan", score: 7.5 },
    { month: "Feb", score: 6.8 },
    { month: "Mar", score: 8.2 },
    { month: "Apr", score: 7.9 },
    { month: "May", score: 8.5 },
    { month: "Jun", score: 8.8 },
  ];

  const entryFrequencyData = [
    { day: "Mon", entries: 12 },
    { day: "Tue", entries: 15 },
    { day: "Wed", entries: 10 },
    { day: "Thu", entries: 18 },
    { day: "Fri", entries: 14 },
    { day: "Sat", entries: 8 },
    { day: "Sun", entries: 9 },
  ];

  const moodDistribution = [
    { mood: "Productive", count: 35, color: "bg-blue-500" },
    { mood: "Peaceful", count: 28, color: "bg-green-500" },
    { mood: "Energized", count: 22, color: "bg-orange-500" },
    { mood: "Reflective", count: 18, color: "bg-purple-500" },
    { mood: "Grateful", count: 15, color: "bg-pink-500" },
    { mood: "Other", count: 9, color: "bg-gray-500" },
  ];

  const topTags = [
    { tag: "gratitude", count: 42 },
    { tag: "work", count: 38 },
    { tag: "personal-growth", count: 31 },
    { tag: "mindfulness", count: 27 },
    { tag: "relationships", count: 23 },
  ];

  const stats = [
    {
      label: "Total Entries",
      value: "127",
      change: "+12%",
      icon: Book01Icon,
      color: "text-blue-500",
    },
    {
      label: "Current Streak",
      value: "7 days",
      change: "Best: 14 days",
      icon: FireIcon,
      color: "text-orange-500",
    },
    {
      label: "Avg Mood Score",
      value: "8.2/10",
      change: "+0.5 this month",
      icon: Smile,
      color: "text-green-500",
    },
    {
      label: "Writing Consistency",
      value: "73%",
      change: "+5% from last month",
      icon: CalendarIcon,
      color: "text-purple-500",
    },
  ];

  const chartConfig = {
    score: {
      label: "Mood Score",
      color: "hsl(var(--primary))",
    },
    entries: {
      label: "Entries",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <div>
      <SiteHeader label="Stats & Analytics" />

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Your Journey Insights 📊</h2>
        <p className="text-muted-foreground">
          Track your progress and patterns over time
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={stat.icon}
                  strokeWidth={2}
                  className={`h-5 w-5 ${stat.color}`}
                />
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Mood Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={TrendUpIcon}
                className="h-5 w-5 text-primary"
              />
              Mood Trend (Last 6 Months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
              <LineChart data={moodTrendData}>
                <XAxis dataKey="month" />
                <YAxis domain={[0, 10]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Entry Frequency Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Chart02FreeIcons}
                className="h-5 w-5 text-primary"
              />
              Weekly Entry Pattern
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
              <BarChart data={entryFrequencyData}>
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="entries" fill="hsl(var(--primary))" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Mood Distribution & Tags */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mood Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Mood Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {moodDistribution.map((item, index) => {
                const total = moodDistribution.reduce(
                  (acc, curr) => acc + curr.count,
                  0
                );
                const percentage = Math.round((item.count / total) * 100);
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded ${item.color}`} />
                        <span className="font-medium">{item.mood}</span>
                      </div>
                      <span className="text-muted-foreground">
                        {item.count} entries ({percentage}%)
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Most Used Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topTags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                      {index + 1}
                    </span>
                    <span className="font-medium">#{tag.tag}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {tag.count} times
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Writing Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground mb-1">
                Average Words per Entry
              </p>
              <p className="text-2xl font-bold">247</p>
            </div>
            <div className="p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground mb-1">
                Most Productive Time
              </p>
              <p className="text-2xl font-bold">9:00 AM</p>
            </div>
            <div className="p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground mb-1">
                Longest Streak
              </p>
              <p className="text-2xl font-bold">14 days</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsPage;
