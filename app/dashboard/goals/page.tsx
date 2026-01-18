"use client";

import SiteHeader from "@/components/shared/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  GlobalSearchIcon,
  CheckmarkCircle01Icon,
  Target01Icon,
  TrophyIcon,
  AddCircleIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const GoalsPage = () => {
  const activeGoals = [
    {
      id: 1,
      title: "Daily Journaling",
      description: "Write in journal every day for 30 days",
      progress: 87,
      current: 26,
      target: 30,
      category: "Habit",
      status: "active",
      dueDate: "2024-02-15",
    },
    {
      id: 2,
      title: "Morning Meditation",
      description: "Practice meditation for 20 days",
      progress: 65,
      current: 13,
      target: 20,
      category: "Wellness",
      status: "active",
      dueDate: "2024-02-10",
    },
    {
      id: 3,
      title: "Gratitude Practice",
      description: "List 3 things you're grateful for each day",
      progress: 45,
      current: 9,
      target: 20,
      category: "Mindfulness",
      status: "active",
      dueDate: "2024-02-20",
    },
  ];

  const completedGoals = [
    {
      id: 4,
      title: "Weekly Reflection",
      description: "Complete 4 weekly reflections",
      progress: 100,
      current: 4,
      target: 4,
      category: "Reflection",
      completedDate: "2024-01-15",
    },
    {
      id: 5,
      title: "Read 5 Books",
      description: "Read and journal about 5 books",
      progress: 100,
      current: 5,
      target: 5,
      category: "Learning",
      completedDate: "2024-01-10",
    },
  ];

  const goalStats = [
    {
      label: "Active Goals",
      value: "3",
      icon: Target01Icon,
      color: "text-blue-500",
    },
    {
      label: "Completed",
      value: "12",
      icon: CheckmarkCircle01Icon,
      color: "text-green-500",
    },
    {
      label: "Success Rate",
      value: "85%",
      icon: TrophyIcon,
      color: "text-yellow-500",
    },
    {
      label: "Total Goals",
      value: "15",
      icon: GlobalSearchIcon,
      color: "text-purple-500",
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Habit: "bg-blue-100 text-blue-700",
      Wellness: "bg-green-100 text-green-700",
      Mindfulness: "bg-purple-100 text-purple-700",
      Reflection: "bg-orange-100 text-orange-700",
      Learning: "bg-pink-100 text-pink-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <div>
      <SiteHeader label="Goals" />

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">Your Goals 🎯</h2>
            <p className="text-muted-foreground">
              Track your progress and stay motivated
            </p>
          </div>
          <Button>
            <HugeiconsIcon icon={AddCircleIcon} className="mr-2" />
            New Goal
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {goalStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={stat.icon}
                  strokeWidth={2}
                  className={`h-5 w-5 ${stat.color}`}
                />
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Goals */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Active Goals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeGoals.map((goal) => (
            <Card key={goal.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-base">{goal.title}</CardTitle>
                  <Badge className={getCategoryColor(goal.category)}>
                    {goal.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {goal.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="font-medium">Progress</span>
                      <span className="text-muted-foreground">
                        {goal.current}/{goal.target} days
                      </span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Due: {goal.dueDate}
                    </span>
                    <span className="font-semibold text-primary">
                      {goal.progress}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Completed Goals */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recently Completed</h3>
        <div className="space-y-3">
          {completedGoals.map((goal) => (
            <Card
              key={goal.id}
              className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <HugeiconsIcon
                      icon={CheckmarkCircle01Icon}
                      className="h-6 w-6 text-green-500"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{goal.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {goal.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getCategoryColor(goal.category)}>
                      {goal.category}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      Completed: {goal.completedDate}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Motivational Section */}
      <Card className="mt-6 bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="p-6 text-center">
          <HugeiconsIcon
            icon={TrophyIcon}
            className="h-12 w-12 mx-auto mb-3 text-primary"
          />
          <h3 className="text-xl font-bold mb-2">Keep Going! 🌟</h3>
          <p className="text-muted-foreground mb-4">
            You&apos;re on track to complete 3 more goals this month. Every day
            is a step forward!
          </p>
          <Button variant="default">View All Achievements</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalsPage;
