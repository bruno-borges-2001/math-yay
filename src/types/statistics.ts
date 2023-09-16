import { VALID_OPERATION } from "./game";

export interface StatisticByOperation {
  userId: string | null;
  userName: string | null;
  operation: VALID_OPERATION;
  skippedQuestions: number;
  correctQuestions: number;
  incorrectQuestions: number;
}