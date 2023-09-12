'use client'

import PieChart from "@/components/dashboard/pieChart"
import { trpc } from "@/lib/trpc/client"
import { RESULT_STATUS, VALID_OPERATION } from "@/types/game"
import { StatisticByOperation } from "@/types/statistics"

import { Cell, Pie } from 'recharts'

function parseOperationName(operation: VALID_OPERATION) {
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

type ChartValue = { name: string, value: number, status?: RESULT_STATUS }
type ParsedStatisticByOperationType = [ChartValue[], ChartValue[]]

function parseStatisticsByOperation(data?: StatisticByOperation[]) {
  if (!data) return [[], []]
  return data.reduce((prev, value): ParsedStatisticByOperationType => {
    const operationName = parseOperationName(value.operation)
    const [correct, incorrect, skipped] = [value.correctQuestions, value.incorrectQuestions, value.skippedQuestions].map(Number)
    const questionsCount = correct + incorrect + skipped
    return [
      [...prev[0], { name: operationName, value: questionsCount }],
      [
        ...prev[1],
        { name: `${operationName} - CORRECT`, value: correct, status: RESULT_STATUS.CORRECT },
        { name: `${operationName} - INCORRECT`, value: incorrect, status: RESULT_STATUS.INCORRECT },
        { name: `${operationName} - SKIPPED`, value: skipped, status: RESULT_STATUS.SKIPPED }
      ]
    ]
  }, [[], []] as ParsedStatisticByOperationType)
}

const STATUS_COLOR = {
  [RESULT_STATUS.CORRECT]: 'green',
  [RESULT_STATUS.INCORRECT]: 'red',
  [RESULT_STATUS.SKIPPED]: 'gray'
}

export default function Dashboard() {
  const { data: byOperation } = trpc.statistics.getStatisticsByOperation.useQuery()

  const [opData1, opData2] = parseStatisticsByOperation(byOperation?.statistics)

  return (
    <div className="h-[100vh] w-full overflow-hidden">
      <PieChart className="w-60 aspect-square">
        {(width, height) => {
          const min = Math.min(width, height) / 2
          return (
            <>
              <Pie data={opData1} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={min * 0.5} fill="#8884d8" />
              <Pie data={opData2} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={min * 0.6} outerRadius={min * 0.8} fill="#82ca9d" >
                {opData2.map(el => <Cell key={el.name} fill={STATUS_COLOR[el.status!]} />)}
              </Pie>
            </>
          )
        }}
      </PieChart>
    </div>
  )
}