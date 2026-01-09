import prisma from "@/lib/prisma";
import dayjs from "dayjs";

export const getLogStreak = async (userId: string) => {
  const logs = await prisma.dailyLog.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: { createdAt: true },
  });

  if (!logs.length) return 0;

  let streak = 1;
  let lastDate = dayjs(logs[0].createdAt).startOf("day");

  for (let i = 1; i <= logs.length; i++) {
    const currentDate = dayjs(logs[i].createdAt).startOf("day");

    if (lastDate.diff(currentDate, "day") == 1) {
      streak++;
      lastDate = currentDate;
    } else if (lastDate.diff(currentDate, "day") > 1) {
      break;
    }
  }
  return streak;
};

export const getConsistancy = async (userId: string, dayRange: number = 30) => {
  const startDate = dayjs()
    .subtract(dayRange - 1, "day")
    .startOf("day");
  const logs = await prisma.dailyLog.findMany({
    where: {
      userId,
      createdAt: {
        gte: startDate.toDate(),
      },
    },
  });

  const uniqueDays = new Set(
    logs.map((log) => dayjs(log.createdAt).format("YYYY-MM-DD")),
  );

  const daysDone = uniqueDays.size;
  const consistancy = Math.round((daysDone / dayRange) * 100);
  return {
    dayRange,
    daysDone,
    consistancy,
  };
};
