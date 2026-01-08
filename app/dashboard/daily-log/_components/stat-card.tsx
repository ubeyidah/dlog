import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { Progress } from "@/components/ui/progress";
import {
  Book01Icon,
  CalendarIcon,
  FireIcon,
  Smile,
} from "@hugeicons/core-free-icons";

export interface Stat {
  id: string;
  label: string;
  value: string;
  description: string;
  color: string;
  progress?: number;
}

interface StatCardProps {
  stat: Stat;
}

export function StatCard({ stat }: StatCardProps) {
  let Icon;

  switch (stat.id) {
    case "total-memories":
      Icon = Book01Icon;
      break;
    case "avg-mood":
      Icon = Smile;
      break;
    case "current-streak":
      Icon = FireIcon;
      break;
    case "consistency":
      Icon = CalendarIcon;
  }
  return (
    <Card className="relative group">
      <CardHeader>
        <div className="w-24 h-24 rounded-lg bg-primary/10 group-hover:rotate-6 group-hover:-bottom-4 transition-transform duration-300 absolute rotate-12 -right-6 -bottom-10 p-2">
          {Icon && (
            <HugeiconsIcon
              icon={Icon}
              strokeWidth={2}
              className="opacity-10 size-12"
            />
          )}
        </div>
        <div className="flex items-center gap-2">
          {Icon && (
            <HugeiconsIcon
              icon={Icon}
              strokeWidth={2}
              className={`h-5 w-5 ${stat.color}`}
            />
          )}
          <CardTitle className="text-sm uppercase font-bold text-foreground/60">
            {stat.label}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{stat.value}</p>
        <p className="text-xs text-muted-foreground mt-2 mb-1">
          {stat.description}
        </p>
        {stat.progress && (
          <Progress value={stat.progress} className={"rounded-full"} />
        )}
      </CardContent>
    </Card>
  );
}
