import { router } from "../trpc";
import { statisticsRouter } from "./statistics";

export const appRouter = router({
  statistics: statisticsRouter,
});

export type AppRouter = typeof appRouter;
