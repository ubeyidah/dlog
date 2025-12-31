import { createDailyLogSchema } from "@/lib/validation/daily-log.schema";
import { createTRPCRouter, protectedProcedure } from "../init";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";
import { TRPCError } from "@trpc/server";


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
        throw new TRPCError({ code: "BAD_REQUEST", message: "You have already created a daily log today" })
      }

      await prisma.dailyLog.create({ data: { ...input, userId: ctx.userId } })
      return { message: "Daily log created successfully" }
    })
})
