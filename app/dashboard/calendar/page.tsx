"use client";

import SiteHeader from "@/components/shared/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CalendarIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Mock journal entries data
  const journalEntries: Record<
    string,
    { mood: string; title: string; hasPhoto: boolean }
  > = {
    "2024-01-15": {
      mood: "Productive",
      title: "Great day at work",
      hasPhoto: true,
    },
    "2024-01-16": {
      mood: "Peaceful",
      title: "Evening reflection",
      hasPhoto: false,
    },
    "2024-01-17": {
      mood: "Energized",
      title: "Morning workout",
      hasPhoto: true,
    },
    "2024-01-18": {
      mood: "Grateful",
      title: "Family time",
      hasPhoto: false,
    },
  };

  const getMoodColor = (mood: string) => {
    const colors: Record<string, string> = {
      Productive: "bg-blue-500",
      Peaceful: "bg-green-500",
      Energized: "bg-orange-500",
      Grateful: "bg-pink-500",
      Inspired: "bg-purple-500",
      Reflective: "bg-indigo-500",
    };
    return colors[mood] || "bg-gray-500";
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const formatDateKey = (day: number) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    return `${year}-${month}-${dayStr}`;
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const today = new Date();
  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  // Calculate stats for the current month
  const currentMonthEntries = Object.keys(journalEntries).filter((key) => {
    const entryDate = new Date(key);
    return (
      entryDate.getMonth() === currentDate.getMonth() &&
      entryDate.getFullYear() === currentDate.getFullYear()
    );
  }).length;

  return (
    <div>
      <SiteHeader label="Calendar" />

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Journal Calendar 📅</h2>
        <p className="text-muted-foreground">
          View your journaling journey over time
        </p>
      </div>

      {/* Monthly Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">This Month</p>
            <p className="text-2xl font-bold">{currentMonthEntries} entries</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Streak</p>
            <p className="text-2xl font-bold">7 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Best Month</p>
            <p className="text-2xl font-bold">December</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Days</p>
            <p className="text-2xl font-bold">127</p>
          </CardContent>
        </Card>
      </div>

      {/* Calendar */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon icon={CalendarIcon} className="h-5 w-5" />
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={previousMonth}>
                <HugeiconsIcon icon={ArrowLeft01Icon} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
              >
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={nextMonth}>
                <HugeiconsIcon icon={ArrowRight01Icon} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center text-sm font-semibold text-muted-foreground p-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for days before the month starts */}
            {Array.from({ length: startingDayOfWeek }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}

            {/* Actual days of the month */}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const dateKey = formatDateKey(day);
              const entry = journalEntries[dateKey];
              const isTodayDate = isToday(day);

              return (
                <div
                  key={day}
                  className={cn(
                    "aspect-square p-2 rounded-lg border relative cursor-pointer transition-all hover:shadow-md",
                    isTodayDate && "border-primary border-2",
                    entry && "bg-primary/5"
                  )}
                >
                  <div className="text-sm font-medium mb-1">{day}</div>
                  {entry && (
                    <div className="space-y-1">
                      <div
                        className={cn(
                          "w-full h-1 rounded-full",
                          getMoodColor(entry.mood)
                        )}
                      />
                      {entry.hasPhoto && (
                        <div className="text-xs">📸</div>
                      )}
                    </div>
                  )}
                  {isTodayDate && (
                    <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded" />
              <span className="text-sm">Productive</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded" />
              <span className="text-sm">Peaceful</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded" />
              <span className="text-sm">Energized</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-pink-500 rounded" />
              <span className="text-sm">Grateful</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded" />
              <span className="text-sm">Inspired</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">📸 Has Photo</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarPage;
