import { addStatistic } from "@/lib/api/statistics/mutations";
import { getStatisticsByOperation, getStatisticsByStatus } from "@/lib/api/statistics/queries";
import { insertResultsSchema } from "@/lib/db/schema/statistics";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const statisticsRouter = router({
  getStatisticsByOperation: protectedProcedure.query(async (opts) => {
    return getStatisticsByOperation(opts.ctx.session.user.id);
  }),
  getStatisticsByStatus: protectedProcedure.query(async (opts) => {
    return getStatisticsByStatus(opts.ctx.session.user.id);
  }),
  addStatistic: publicProcedure.input(insertResultsSchema).mutation(async (opts) => {
    if (!opts.ctx.session) return false;
    return addStatistic({ ...opts.input, userId: opts.ctx.session.user.id })
  })
});
