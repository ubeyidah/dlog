import { createDailyLogSchema, LOG_MOODS } from "@/lib/validation/daily-log.schema";
import { createTRPCRouter, protectedProcedure } from "../init";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";

import z from "zod";

const getAllInputSchema = z.object({
  search: z.string().optional(),
  mood: z.enum(LOG_MOODS).nullable().optional(),
  startDate: z.string().nullable().optional().transform((val) => val ? new Date(val) : null),
  endDate: z.string().nullable().optional().transform((val) => val ? new Date(val) : null),
});

export const dailyLogRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createDailyLogSchema)
    .mutation(async ({ ctx, input }) => {
      const today = dayjs().startOf('day').toDate()
      const isAreadyLogged = await prisma.dailyLog.findFirst({
        where: {
          userId: ctx.userId,
          createdAt: {
            gte: today
          }
        }
      })

      if (isAreadyLogged) {
        // throw new TRPCError({ code: "BAD_REQUEST", message: "You have already created a daily log today" })
      }

      await prisma.dailyLog.create({ data: { ...input, userId: ctx.userId } })
      return { message: "Daily log created successfully" }
    }),
  getAll: protectedProcedure
    .input(getAllInputSchema)
    .query(async ({ ctx, input }) => {
      const { search, mood, startDate, endDate } = input;
      const logs = await prisma.dailyLog.findMany({
        where: {
          userId: ctx.userId,
          ...(search && {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { content: { contains: search, mode: 'insensitive' } },
            ],
          }),
          ...(mood && { mood }),
          ...(startDate || endDate ? {
            createdAt: {
              ...(startDate && { gte: dayjs(startDate).startOf('day').toDate() }),
              ...(endDate && { lte: dayjs(endDate).endOf('day').toDate() })
            },
          } : {}),
        },
        orderBy: { createdAt: 'desc' },
      });
      return logs;
    })
})
