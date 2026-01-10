import { createDailyLogSchema, updateDailyLogSchema } from "@/lib/validation/daily-log.schema";
import { createTRPCRouter, protectedProcedure } from "../init";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";
import { LOG_MOOD } from "@/lib/generated/prisma/enums";

import z from "zod";
import { TRPCError } from "@trpc/server";
import { getConsistency, getLogStreak } from "../helper/dlog";

const getAllInputSchema = z.object({
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

export const dailyLogRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createDailyLogSchema)
    .mutation(async ({ ctx, input }) => {
      const today = dayjs().startOf("day").toDate();
      const isAreadyLogged = await prisma.dailyLog.findFirst({
        where: {
          userId: ctx.userId,
          createdAt: {
            gte: today,
          },
        },
      });

      if (isAreadyLogged) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You have already created a daily log today",
        });
      }

      await prisma.dailyLog.create({ data: { ...input, userId: ctx.userId } });
      return { message: "Daily log created successfully" };
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const log = await prisma.dailyLog.findFirst({
        where: {
          id: input.id,
          userId: ctx.userId,
        },
      });

      if (!log) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Daily log not found",
        });
      }

      return log;
    }),
  update: protectedProcedure
    .input(updateDailyLogSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;

      const existingLog = await prisma.dailyLog.findFirst({
        where: {
          id,
          userId: ctx.userId,
        },
      });

      if (!existingLog) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Daily log not found",
        });
      }

      await prisma.dailyLog.update({
        where: { id },
        data,
      });

      return { message: "Daily log updated successfully" };
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
              { title: { contains: search, mode: "insensitive" } },
              { content: { contains: search, mode: "insensitive" } },
            ],
          }),
          ...(mood && { mood: mood as LOG_MOOD }),
          ...(startDate || endDate
            ? {
              createdAt: {
                ...(startDate && {
                  gte: dayjs(startDate).startOf("day").toDate(),
                }),
                ...(endDate && { lte: dayjs(endDate).endOf("day").toDate() }),
              },
            }
            : {}),
        },
        orderBy: { createdAt: "desc" },
      });
      return logs;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const result = await prisma.dailyLog.delete({
        where: {
          id: input.id,
          userId: ctx.userId,
        },
      });

      if (!result) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Daily log not found",
        })
      }
      return { message: "Daily log deleted successfully" };
    }),
  stats: protectedProcedure.query(async ({ ctx }) => {
    const [totalMemories, avgMood, streak, { consistency }] = await Promise.all(
      [
        prisma.dailyLog.count({
          where: { userId: ctx.userId },
        }),
        prisma.dailyLog.groupBy({
          by: ["mood"],
          where: { userId: ctx.userId },
          _count: { mood: true },
          orderBy: { _count: { mood: "desc" } },
          take: 1,
        }),
        getLogStreak(ctx.userId),
        getConsistency(ctx.userId),
      ],
    );
    return [
      {
        id: "total-memories",
        label: "Total Memories",
        value: totalMemories.toLocaleString(),
        description: "All time entries",
        color: "text-purple-400",
      },
      {
        id: "avg-mood",
        label: "Emotional Peak",
        value: avgMood[0]?.mood || "--",
        description: "Dominant sentiment",
        color: "text-yellow-300",
      },
      {
        id: "current-streak",
        label: "Current Streak",
        value: `${streak} days`,
        description: "Keep it up!",
        color: "text-yellow-400",
      },
      {
        id: "consistency",
        label: "Consistency",
        value: `${consistency}%`,
        description: "Last 30 days",
        color: "text-green-400",
        progress: consistency,
      },
    ];
  }),
});
