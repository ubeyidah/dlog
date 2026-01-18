import { createTRPCRouter } from '../init';
import { dailyLogRouter } from './daily-log';
import { s3BucketRoute } from './s3';

export const appRouter = createTRPCRouter({
  daily_log: dailyLogRouter,
  s3: s3BucketRoute
});

// export type definition of API
export type AppRouter = typeof appRouter;
