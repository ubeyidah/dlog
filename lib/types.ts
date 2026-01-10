import { AppRouter } from '@/trpc/routers/_app';
import type { inferProcedureOutput } from '@trpc/server';

export type DailyLog = inferProcedureOutput<AppRouter['daily_log']['getAll']>[0];
