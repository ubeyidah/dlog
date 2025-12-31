import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Book01Icon, FireIcon, CalendarIcon, Smile } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Progress } from "@/components/ui/progress";

const Page = () => {
  const stats = [
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

  return (
    <div>
      <div className="grid py-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.id} className="relative group">
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
        ))}
      </div>
    </div>
  );
};

export default Page;
