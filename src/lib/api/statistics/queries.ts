import { db } from "@/lib/db"
import { users } from "@/lib/db/schema/auth"
import { ResultsUserId, results } from "@/lib/db/schema/statistics"
import { RESULT_STATUS, VALID_OPERATION } from "@/types/game"
import { StatisticByOperation } from "@/types/statistics"
import { and, eq, sql } from "drizzle-orm"

export const getStatisticsByOperation = async (userId: ResultsUserId, operation?: VALID_OPERATION): Promise<{ statistics: StatisticByOperation[] }> => {
  const condition = userId
    ? operation
      ? and(eq(results.userId, userId), eq(results.operation, operation))
      : eq(results.userId, userId)
    : undefined

  const c = await db
    .select({
      userId: results.userId,
      userName: users.name,
      operation: results.operation,
      skippedQuestions: sql<number>`SUM(CASE WHEN ${results.status} = ${RESULT_STATUS.SKIPPED} THEN 1 ELSE 0 END)`,
      correctQuestions: sql<number>`SUM(CASE WHEN ${results.status} = ${RESULT_STATUS.CORRECT} THEN 1 ELSE 0 END)`,
      incorrectQuestions: sql<number>`SUM(CASE WHEN ${results.status} = ${RESULT_STATUS.INCORRECT} THEN 1 ELSE 0 END)`
    })
    .from(results)
    .leftJoin(users, eq(users.id, results.userId))
    .where(condition)
    .groupBy(results.userId, results.operation)

  return { statistics: c }
}