import z from "zod"
import { LOG_MOOD } from "../generated/prisma/enums"

export const LOG_MOODS = Object.values(LOG_MOOD).map(mood => mood)


export const createDailyLogSchema = z.object({
  title: z
    .string()
    .min(6, "Title should be at least 6 characters."),
  content: z
    .string()
    .min(10, "Content should be at least 10 characters."),
  mood: z
    .enum([...LOG_MOODS], {
      message: "Please select a valid mood.",
    }),
  tags: z.array(z.string()).optional(),
});
export type CreateDailyLogInput = z.infer<typeof createDailyLogSchema>

export const updateDailyLogSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(6, "Title should be at least 6 characters."),
  content: z
    .string()
    .min(10, "Content should be at least 10 characters."),
  mood: z
    .enum([...LOG_MOODS], {
      message: "Please select a valid mood.",
    }),
  tags: z.array(z.string()).optional(),
});
export type UpdateDailyLogInput = z.infer<typeof updateDailyLogSchema>



export const getAllInputSchema = z.object({
  search: z.string().optional(),
  mood: z.string().nullable().optional(),
  startDate: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val ? new Date(val) : null)),
  endDate: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val ? new Date(val) : null)),
});
