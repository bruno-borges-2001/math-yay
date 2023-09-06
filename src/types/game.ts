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
  EASY,
  MEDIUM,
  HARD,
  IMPOSSIBLE
}

export type VALID_OPERATION = '+' | '-' | '*' | '/' | '**' | 'sqrt'

export type OperationReturn = {
  operation: VALID_OPERATION,
  operands: [number] | [number, number],
  result: number
}