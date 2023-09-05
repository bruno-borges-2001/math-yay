import { GAME_MODE, OperationReturn, VALID_OPERATION } from "@/types/game";
import { randomFloat, randomInt } from "../utils";

const OPERATIONS: Record<GAME_MODE, VALID_OPERATION[]> = {
  [GAME_MODE.SMALL]: ['+', '-'],
  [GAME_MODE.MEDIUM]: ['+', '-', '*', '/'],
  [GAME_MODE.HARD]: ['+', '-', '*', '/', '**', 'sqrt'],
  [GAME_MODE.IMPOSSIBLE]: ['*', '/', '**', 'sqrt']
}

const generateOperand = (operation: VALID_OPERATION, mode: GAME_MODE, round: number): number => {
  switch (operation) {
    case '+':
    case '-':
      return round > 30
        ? randomFloat(1 + 5 * Math.floor(round / 15), 10 * (1 + Math.floor(round / 20)), 1 + Math.floor(round / 100))
        : randomInt(1 + 5 * Math.floor(round / 10), 10 * (2 + Math.floor(round / 10)))
    case '*':
      return round > 50
        ? randomFloat(1 + 5 * Math.floor(round / 15), 10 * (1 + Math.floor(round / 40)), 1 + Math.floor(round / 150))
        : randomInt(1 + 5 * Math.floor(round / 10), 10 * (2 + Math.floor(round / 20)))
    case '/':
      return round > 100
        ? randomFloat(1 + 5 * Math.floor(round / 30), 10 * (1 + Math.floor(round / 40)), 1 + Math.floor(round / 300))
        : randomInt(1 + 5 * Math.floor(round / 20), 10 * (2 + Math.floor(round / 30)))
    case "**":
      return round > 150
        ? randomFloat(1 + 5 * Math.floor(round / 50), 5 * (1 + Math.floor(round / 80)), 1 + Math.floor(round / 500))
        : randomInt(1 + 5 * Math.floor(round / 30), 5 * (2 + Math.floor(round / 50)))
    case 'sqrt':
      return round > 200
        ? randomFloat(1 + 5 * Math.floor(round / 100), 5 * (1 + Math.floor(round / 100)), 1 + Math.floor(round / 1000))
        : randomInt(1 + 5 * Math.floor(round / 50), 10 * (2 + Math.floor(round / 80)))
  }
}

export const generate = (mode = GAME_MODE.MEDIUM, round = 0): OperationReturn => {
  if (!Object.values(GAME_MODE).includes(mode)) {
    throw new Error("Invalid game mode");
  }

  const possibleOperations = OPERATIONS[mode]

  const operation = possibleOperations[randomInt(0, possibleOperations.length)];

  const operand1 = generateOperand(operation, mode, round)

  switch (operation) {
    case 'sqrt':
      return {
        operation,
        operands: [operand1 ** 2],
        result: operand1
      }
    case '**': {
      const operand2 = randomInt(1 + Math.floor(round / 20), 4 + Math.floor(round / 10))
      return {
        operation,
        operands: [operand1, operand2],
        result: operand1 ** operand2
      }
    }
    case '/': {
      const operand2 = randomInt(1 + Math.floor(round / 15), 10 + Math.floor(round / 5))
      return {
        operation,
        operands: [operand1 * operand2, operand1],
        result: operand2
      }
    }
    default: {
      const operand2 = generateOperand(operation, mode, round)
      return {
        operation,
        operands: [operand1, operand2],
        result: eval(`${operand1} ${operation} ${operand2}`) as number
      }
    }
  }
}