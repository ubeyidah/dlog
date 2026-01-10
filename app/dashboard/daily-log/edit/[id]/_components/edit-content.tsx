"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { WriteForm } from "../../../write/_components/write-form";

type EditDailyLogContentProps = {
  id: string;
};

export const EditDailyLogContent = ({ id }: EditDailyLogContentProps) => {
  const trpc = useTRPC();
  const { data: log } = useSuspenseQuery(
    trpc.daily_log.getById.queryOptions({ id }),
  );

  return (
    <WriteForm
      mode="update"
      defaultValues={{
        id: log.id,
        title: log.title,
        content: log.content,
        mood: log.mood,
        tags: log.tags || [],
      }}
      createdAt={log.createdAt}
    />
  );
};
