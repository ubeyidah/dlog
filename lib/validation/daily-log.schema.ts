import z from "zod"
import { LOG_MOOD } from "../generated/prisma/enums"

export const LOG_MOODS = Object.values(LOG_MOOD).map(mood => mood)

export const createDailyLogSchema = z.object({
  title: z.string().min(6, "title must be at least 6 characters long"),
  content: z.string().min(10, "content must be at least 10 characters long"),
  mood: z.enum([...LOG_MOODS], { message: "select a valid mood" }),
  tags: z.array(z.string()).optional(),
})

export type CreateDailyLogInput = z.infer<typeof createDailyLogSchema>
