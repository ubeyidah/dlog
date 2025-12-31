import { createTRPCRouter } from '../init';
import { dailyLogRouter } from './daily-log';

export const appRouter = createTRPCRouter({
  daily_log: dailyLogRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
