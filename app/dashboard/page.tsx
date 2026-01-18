"use client";

import SiteHeader from "@/components/shared/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Book01Icon,
  CalendarIcon,
  FireIcon,
  Smile,
  TradeUpFreeIcons as TrendUpIcon,
  GlobalSearchIcon,
  GooglePhotosIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  // Mock data for dashboard overview
  const quickStats = [
    {
      label: "Total Entries",
      value: "127",
      icon: Book01Icon,
      color: "text-blue-500",
      trend: "+12% this month",
    },
    {
      label: "Current Streak",
      value: "7 days",
      icon: FireIcon,
      color: "text-orange-500",
      trend: "Keep it up!",
    },
    {
      label: "Average Mood",
      value: "Peaceful",
      icon: Smile,
      color: "text-green-500",
      trend: "Improving",
    },
    {
      label: "Goals Progress",
      value: "65%",
      icon: TrendUpIcon,
      color: "text-purple-500",
      trend: "3 of 5 completed",
    },
  ];

  const recentActivities = [
    { date: "Today", title: "Morning reflection", mood: "Energized" },
    { date: "Yesterday", title: "Evening thoughts", mood: "Peaceful" },
    { date: "2 days ago", title: "Work achievements", mood: "Productive" },
  ];

  const quickActions = [
    {
      label: "View Calendar",
      href: "/dashboard/calendar",
      icon: CalendarIcon,
      description: "See your journal timeline",
    },
    {
      label: "Track Goals",
      href: "/dashboard/goals",
      icon: GlobalSearchIcon,
      description: "Monitor your progress",
    },
    {
      label: "Browse Photos",
      href: "/dashboard/photos",
      icon: GooglePhotosIcon,
      description: "Your visual memories",
    },
  ];

  return (
    <div>
      <SiteHeader label="Dashboard" />

      {/* Welcome Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Welcome back! 👋</h2>
        <p className="text-muted-foreground">
          Here&apos;s your journaling overview
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden group">
            <CardHeader>
              <div className="flex items-center justify-between">
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
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.trend}</p>
            </CardContent>
            <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-110 transition-transform duration-300" />
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">
                      {activity.mood}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/dashboard/daily-log">View All Entries</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer border border-transparent hover:border-primary/20">
                    <HugeiconsIcon
                      icon={action.icon}
                      strokeWidth={2}
                      className="h-5 w-5 text-primary"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{action.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goals Overview Section */}
      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Active Goals</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/goals">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Daily Journaling", progress: 87, current: 26, target: 30 },
              { name: "Morning Meditation", progress: 65, current: 13, target: 20 },
              { name: "Gratitude Practice", progress: 45, current: 9, target: 20 },
            ].map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{goal.name}</span>
                  <span className="text-muted-foreground">
                    {goal.current}/{goal.target} days
                  </span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
