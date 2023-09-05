export enum GAME_MODE {
  SMALL,
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