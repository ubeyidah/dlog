import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import { Progress } from "@/components/ui/progress";

export interface Stat {
  id: string;
  icon: IconSvgElement;
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
  return (
    <Card className="relative group">
      <CardHeader>
        <div className="w-24 h-24 rounded-lg bg-primary/10 group-hover:rotate-6 group-hover:-bottom-4 transition-transform duration-300 absolute rotate-12 -right-6 -bottom-10" />
        <div className="flex items-center gap-2">
          {stat.icon && <HugeiconsIcon icon={stat.icon} strokeWidth={2} className={`h-5 w-5 ${stat.color}`} />}
          <CardTitle className="text-sm uppercase font-bold text-foreground/60">{stat.label}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{stat.value}</p>
        <p className="text-xs text-muted-foreground mt-2 mb-1">{stat.description}</p>
        {stat.progress && (
          <Progress value={stat.progress} className={"rounded-full"} />
        )}
      </CardContent>
    </Card>
  );
}
