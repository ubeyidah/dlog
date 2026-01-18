"use client";

import SiteHeader from "@/components/shared/site-header";
import { Card, CardContent } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Image02Icon,
  Calendar03Icon,
  FilterIcon,
  GridIcon,
  Menu01Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const PhotosPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Mock photo data with journal connections
  const photos = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
      title: "Morning Sunrise Walk",
      date: "2024-01-18",
      mood: "Energized",
      tags: ["nature", "morning"],
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400",
      title: "Productive Workspace",
      date: "2024-01-17",
      mood: "Productive",
      tags: ["work", "focus"],
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400",
      title: "Evening Reflection",
      date: "2024-01-16",
      mood: "Peaceful",
      tags: ["sunset", "calm"],
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400",
      title: "Weekend Adventure",
      date: "2024-01-15",
      mood: "Inspired",
      tags: ["nature", "adventure"],
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
      title: "Forest Therapy",
      date: "2024-01-14",
      mood: "Grateful",
      tags: ["nature", "mindfulness"],
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400",
      title: "Coffee & Contemplation",
      date: "2024-01-13",
      mood: "Reflective",
      tags: ["coffee", "thoughts"],
    },
  ];

  return (
    <div>
      <SiteHeader label="Photos" />

      {/* Header with filters and view toggle */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Visual Memories 📸</h2>
            <p className="text-muted-foreground">
              Your journal entries in pictures
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <HugeiconsIcon icon={FilterIcon} className="mr-2" />
              Filter
            </Button>
            <div className="flex items-center border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                className="rounded-r-none"
                onClick={() => setViewMode("grid")}
              >
                <HugeiconsIcon icon={GridIcon} />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                className="rounded-l-none"
                onClick={() => setViewMode("list")}
              >
                <HugeiconsIcon icon={Menu01Icon} />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Image02Icon}
                  className="h-5 w-5 text-primary"
                />
                <div>
                  <p className="text-2xl font-bold">127</p>
                  <p className="text-xs text-muted-foreground">Total Photos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Calendar03Icon}
                  className="h-5 w-5 text-primary"
                />
                <div>
                  <p className="text-2xl font-bold">45</p>
                  <p className="text-xs text-muted-foreground">This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-muted-foreground">Collections</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div>
                <p className="text-2xl font-bold">23</p>
                <p className="text-xs text-muted-foreground">Tagged</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Photo Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <Card
              key={photo.id}
              className="group overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-video overflow-hidden bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="font-medium mb-1">{photo.title}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="px-2 py-0.5 bg-white/20 rounded">
                        {photo.mood}
                      </span>
                      <span>{photo.date}</span>
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="font-medium mb-1">{photo.title}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{photo.date}</p>
                  <div className="flex gap-1">
                    {photo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {photos.map((photo) => (
            <Card
              key={photo.id}
              className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-4 p-4">
                <div className="relative w-32 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium mb-1">{photo.title}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{photo.date}</span>
                    <span>•</span>
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded">
                      {photo.mood}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  {photo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-muted rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State for when no photos */}
      {photos.length === 0 && (
        <Card className="py-16">
          <CardContent className="text-center">
            <HugeiconsIcon
              icon={Image02Icon}
              className="h-16 w-16 mx-auto mb-4 text-muted-foreground"
            />
            <h3 className="text-xl font-semibold mb-2">No photos yet</h3>
            <p className="text-muted-foreground mb-4">
              Add photos to your journal entries to see them here
            </p>
            <Button>Add Your First Photo</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PhotosPage;
