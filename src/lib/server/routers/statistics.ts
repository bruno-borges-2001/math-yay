import { getUser } from "@/lib/api/auth/queries";
import { addStatistic } from "@/lib/api/statistics/mutations";
import { getStatisticsByOperation } from "@/lib/api/statistics/queries";
import { insertResultsSchema, resultsUserIdSchema } from "@/lib/db/schema/statistics";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const statisticsRouter = router({
  getStatistics: publicProcedure.input(resultsUserIdSchema).query(async (opts) => {
    if (!opts.input.userId && !opts.ctx.session) throw new Error('Invalid user ID')

    const userId = opts.input.userId ?? opts.ctx.session!.user.id
    return {
      ...(await getUser(userId)),
      ...(await getStatisticsByOperation(userId))
    };
  }),
  addStatistic: protectedProcedure.input(insertResultsSchema).mutation(async (opts) => {
    return addStatistic({ ...opts.input, userId: opts.ctx.session.user.id })
  })
});
