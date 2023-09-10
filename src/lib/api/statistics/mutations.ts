import { db } from "@/lib/db";
import { NewResult, insertResultsSchema, results } from "@/lib/db/schema/statistics";

export const addStatistic = async (statistic: NewResult) => {
  const newStatistic = insertResultsSchema.parse(statistic);
  try {
    await db.insert(results).values(newStatistic);
    return true;
  } catch (err) {
    return { error: (err as Error).message ?? "Error, please try again" };
  }
};
