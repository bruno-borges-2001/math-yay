import { db } from "@/lib/db"
import { ResultsUserId, results } from "@/lib/db/schema/statistics"
import { ResultStatus, VALID_OPERATION } from "@/types/game"
import { and, eq, sql } from "drizzle-orm"

export const getStatisticsByOperation = async (userId: ResultsUserId, operation?: VALID_OPERATION) => {
  const condition = userId
    ? operation
      ? and(eq(results.userId, userId), eq(results.operation, operation))
      : eq(results.userId, userId)
    : undefined

  const c = await db
    .select({
      userId: results.userId,
      operation: results.operation,
      skippedQuestions: sql<number>`SUM(CASE WHEN ${results.status} = ${ResultStatus.SKIPPED} THEN 1 ELSE 0 END)`,
      correctQuestions: sql<number>`SUM(CASE WHEN ${results.status} = ${ResultStatus.CORRECT} THEN 1 ELSE 0 END)`,
      incorrectQuestions: sql<number>`SUM(CASE WHEN ${results.status} = ${ResultStatus.INCORRECT} THEN 1 ELSE 0 END)`
    })
    .from(results)
    .where(condition)
    .groupBy(results.userId, results.operation)

  return { statistics: c }
}

export const getStatisticsByStatus = async (userId: ResultsUserId, status?: ResultStatus) => {
  const condition = userId
    ? status
      ? and(eq(results.userId, userId), eq(results.status, status))
      : eq(results.userId, userId)
    : undefined

  const c = await db
    .select({
      userId: results.userId,
      status: results.status,
      plusQuestions: sql<number>`SUM(CASE WHEN ${results.operation} = '+' THEN 1 ELSE 0 END)`,
      minusQuestions: sql<number>`SUM(CASE WHEN ${results.operation} = '-' THEN 1 ELSE 0 END)`,
      timesQuestions: sql<number>`SUM(CASE WHEN ${results.operation} = '*' THEN 1 ELSE 0 END)`,
      divisionQuestions: sql<number>`SUM(CASE WHEN ${results.operation} = '/' THEN 1 ELSE 0 END)`,
      powerQuestions: sql<number>`SUM(CASE WHEN ${results.operation} = '**' THEN 1 ELSE 0 END)`,
      sqrtQuestions: sql<number>`SUM(CASE WHEN ${results.operation} = 'sqrt' THEN 1 ELSE 0 END)`,
    })
    .from(results)
    .where(condition)
    .groupBy(results.userId, results.status)

  return { statistics: c }
}