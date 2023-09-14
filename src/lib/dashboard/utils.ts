import { RESULT_STATUS, VALID_OPERATION } from "@/types/game"

export type OperationName = 'Addition' | 'Subtraction' | 'Multiplication' | 'Division' | 'Exponential' | 'Square Root'

export function getOperationName(operation: VALID_OPERATION): OperationName {
  switch (operation) {
    case '+':
      return 'Addition'
    case '-':
      return 'Subtraction'
    case '*':
      return 'Multiplication'
    case '/':
      return 'Division'
    case '**':
      return 'Exponential'
    case 'sqrt':
      return 'Square Root'
  }
}

export function getOperationByName(operation: OperationName): VALID_OPERATION {
  switch (operation) {
    case 'Addition':
      return '+'
    case 'Subtraction':
      return '-'
    case 'Multiplication':
      return '*'
    case 'Division':
      return '/'
    case 'Exponential':
      return '**'
    case 'Square Root':
      return 'sqrt'
  }
}

export const OPERATIONS_COLOR: Record<OperationName, string> = {
  Addition: "#3498db",
  Subtraction: "#d35400",
  Multiplication: "#27ae60",
  Division: "#f39c12",
  Exponential: "#8e44ad",
  "Square Root": "#c0392b",
}

export const STATUS_COLOR = {
  [RESULT_STATUS.CORRECT]: '#2ecc71',
  [RESULT_STATUS.INCORRECT]: '#e74c3c',
  [RESULT_STATUS.SKIPPED]: '#95a5a6'
}