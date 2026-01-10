"use client"
import { TextEditor } from "@/components/shared/editor/editor";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { moodEmojis } from "@/lib/moods";
import { CreateDailyLogInput, createDailyLogSchema, UpdateDailyLogInput, updateDailyLogSchema, LOG_MOODS } from "@/lib/validation/daily-log.schema";
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
import { useMemo, useState } from "react";

type WriteFormProps = {
  mode?: "write" | "update";
  defaultValues?: UpdateDailyLogInput;
  createdAt?: Date | string;
};

export const WriteForm = ({ mode = "write", defaultValues, createdAt }: WriteFormProps) => {
  const isUpdateMode = mode === "update";
  const date = createdAt ? dayjs(createdAt) : dayjs();
  const formattedDate = date.format("dddd, MMMM D, YYYY");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    createdAt ? new Date(createdAt) : undefined
  );

  const router = useRouter();
  const trpc = useTRPC();
  const form = useForm<CreateDailyLogInput | UpdateDailyLogInput>({
    resolver: zodResolver(isUpdateMode ? updateDailyLogSchema : createDailyLogSchema),
    defaultValues: defaultValues || {
      title: "",
      content: "",
      mood: undefined,
      tags: [],
    },
  });

  // Track if form has been modified
  const formValues = form.watch();
  const hasChanges = useMemo(() => {
    if (!isUpdateMode || !defaultValues) return true;

    return (
      formValues.title !== defaultValues.title ||
      formValues.content !== defaultValues.content ||
      formValues.mood !== defaultValues.mood ||
      JSON.stringify(formValues.tags) !== JSON.stringify(defaultValues.tags)
    );
  }, [formValues, defaultValues, isUpdateMode]);

  const createMutation = useMutation(
    trpc.daily_log.create.mutationOptions({
      onSuccess: () => {
        toast.success("Daily log created successfully!");
        form.reset();
        router.push("/dashboard/daily-log");
      },
      onError: (error) => {
        toast.error(error.message || "Something went wrong while creating the daily log.");
      }
    }),
  );

  const updateMutation = useMutation(
    trpc.daily_log.update.mutationOptions({
      onSuccess: () => {
        toast.success("Daily log updated successfully!");
        router.push("/dashboard/daily-log");
      },
      onError: (error) => {
        toast.error(error.message || "Something went wrong while updating the daily log.");
      }
    }),
  );

  const isPending = createMutation.isPending || updateMutation.isPending;

  const handleSave = (data: CreateDailyLogInput | UpdateDailyLogInput) => {
    if (isUpdateMode) {
      updateMutation.mutate(data as UpdateDailyLogInput);
    } else {
      createMutation.mutate(data as CreateDailyLogInput);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSave)}>

      <SiteHeader label={isUpdateMode ? "Edit Log" : "Write"}>
        <Button
          type="submit"
          className={"px-5"}
          disabled={isPending || (isUpdateMode && !hasChanges)}
        >
          {isPending ? (
            <>
              <Spinner /> {isUpdateMode ? "Updating..." : "Saving..."}
            </>
          ) : (
            isUpdateMode ? "Update Changes" : "Save"
          )}
        </Button>
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
              selected={selectedDate}
              onSelect={setSelectedDate}
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

