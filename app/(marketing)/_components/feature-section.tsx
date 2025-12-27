import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import { Chart, Fingerprint, Pencil, Settings2, Sparkles, Zap } from "@hugeicons/core-free-icons";
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react';
import type React from "react";

type FeatureType = {
  title: string;
  icon: IconSvgElement;
  description: string;
};

export function FeatureSection() {
  return (
    <section className="space-y-8" >
      <div className="text-center">
        <h2 className="text-balance font-medium text-2xl md:text-4xl lg:text-5xl" id="features">
          Reflect. Grow. Own Your Journey.
        </h2>

        <p className="mt-4 text-balance text-muted-foreground text-sm md:text-base">
          Everything you need to journal mindfully, gain insights, and build habits.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard feature={feature} key={feature.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeatureCard({
  feature,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  feature: FeatureType;
}) {
  return (
    <div
      className={cn("relative overflow-hidden bg-background p-6", className)}
      {...props}
    >
      <div className="-mt-2 -ml-20 mask-[radial-gradient(farthest-side_at_top,white,transparent)] pointer-events-none absolute top-0 left-1/2 size-full">
        <GridPattern
          className="absolute inset-0 size-full stroke-foreground/20"
          height={40}
          width={40}
          x={5}
        />
      </div>
      <HugeiconsIcon
        icon={feature.icon}
        aria-hidden
        className="size-6 text-foreground/75"
        strokeWidth={2}
      />
      <h3 className="mt-10 text-sm md:text-base">{feature.title}</h3>
      <p className="relative z-20 mt-2 font-light text-muted-foreground text-xs">
        {feature.description}
      </p>
    </div>
  );
}

const features: FeatureType[] = [
  {
    title: "Quick Logs",
    icon: Zap,
    description: "Capture your thoughts in seconds—no distractions, just focus.",
  },
  {
    title: "Powerful Insights",
    icon: Chart,
    description: "Track habits, moods, and progress with smart analytics.",
  },
  {
    title: "Private & Secure",
    icon: Fingerprint,
    description: "Your reflections stay yours and ad-free.",
  },
  {
    title: "Customizable",
    icon: Pencil,
    description: "Tailor DLOG to your workflow with themes, tags, and prompts.",
  },
  {
    title: "AI-Assisted",
    icon: Sparkles,
    description: "Get gentle nudges and summaries to deepen your reflection.",
  },
  {
    title: "Full Control",
    icon: Settings2,
    description: "Export, sync, or share—your data, your rules.",
  },
];
