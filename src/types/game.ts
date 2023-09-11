export enum GAME_MODE {
  NORMAL = 'normal',
  UNLIMITED = 'unlimited',
}

export enum GAME_STATE {
  UNSTARTED,
  IN_PROGRESS,
  FINISHED
}

export enum GAME_DIFFICULTY {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  IMPOSSIBLE = 'impossible',
}

export enum RESULT_STATUS {
  SKIPPED,
  CORRECT,
  INCORRECT
}

export type VALID_OPERATION = '+' | '-' | '*' | '/' | '**' | 'sqrt'

export type OperationReturn = {
  operation: VALID_OPERATION,
  operands: [number] | [number, number],
  result: number
}

export type RoundResult = { answer?: RESULT_STATUS, round: number }
export type DetailedResult = OperationReturn & RoundResult
