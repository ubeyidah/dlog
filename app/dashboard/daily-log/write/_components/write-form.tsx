"use client"
import { TextEditor } from "@/components/shared/editor/editor";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { moodEmojis } from "@/lib/moods";
import { CreateDailyLogInput, createDailyLogSchema, LOG_MOODS } from "@/lib/validation/daily-log.schema";
import dayjs from "dayjs";
import { useTRPC } from "@/trpc/client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TagInput } from "@/components/shared/tag-input";
import SiteHeader from "@/components/shared/site-header";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export const WriteForm = () => {
  const date = dayjs();
  const formattedDate = date.format("dddd, MMMM D, YYYY");

  const router = useRouter()
  const trpc = useTRPC();
  const form = useForm<CreateDailyLogInput>({
    resolver: zodResolver(createDailyLogSchema),
    defaultValues: {
      title: "",
      content: "",
      mood: undefined,
      tags: [],
    },
  });
  const { mutate, isPending } = useMutation(
    trpc.daily_log.create.mutationOptions({
      onSuccess: () => {
        toast.success("Daily log created successfully!");
        form.reset();
        router.push("/dashboard/daily-log");
      },
      onError: (error) => {
        toast.error(error.message || "Something went wrong while creating the daily log.");
      }
    },

    ),
  );

  const handleSave = (data: CreateDailyLogInput) => {
    mutate(data);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSave)}>

      <SiteHeader label="Write">
        <Button type="submit" className={"px-5"} disabled={isPending}>{isPending ? <><Spinner /> Saving...</> : "Save"}</Button>
      </SiteHeader>
      <div className="grid gap-6 md:grid-cols-[3fr_1fr]">

        <div>
          <div className="py-5">
            <h1 className="text-2xl py-1 font-bold text-muted-foreground">
              {formattedDate}
            </h1>
          </div>
          <div className="space-y-4">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <input
                    {...field}
                    placeholder="What defines today?"
                    className={cn("bg-border/40 p-3 outline-none border border-transparent focus:border-border w-full text-xl font-sans text-foreground placeholder:font-semibold rounded-sm", fieldState.invalid && "border-destructive/50")}
                    id="title"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <TextEditor
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    invalid={fieldState.invalid}
                    className="w-full"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

          </div>
        </div>
        <div className="space-y-3 py-5">
          <div>
            <h3 className="px-1">Calendar View</h3>
            <Calendar
              mode="single"
              className="rounded-md px-0! w-full"
            />
          </div>
          <div>

            <Controller
              name="mood"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="mood">Mood</FieldLabel>
                  <Select
                    value={field.value ?? ""}
                    id="mood"
                    onValueChange={(value) => field.onChange(value)}
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectTrigger className={"w-full"} onBlur={field.onBlur}>
                      <SelectValue onBlur={field.onBlur}>
                        {field.value
                          ? `${moodEmojis[field.value]} ${field.value.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}`
                          : "Select mood"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {LOG_MOODS.map((mood) => (
                        <SelectItem
                          key={mood}
                          value={mood}
                          className="capitalize"
                        >
                          {moodEmojis[mood]} {mood.toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <div>
            <Controller
              name="tags"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="tags">Tags</FieldLabel>
                  <TagInput invalid={fieldState.invalid} value={field.value || []} onChange={(tags) => field.onChange(tags)} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

          </div>
        </div>
      </div>
    </form>
  );
};

