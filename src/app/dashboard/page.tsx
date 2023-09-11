'use client'

import { trpc } from "@/lib/trpc/client"
import { VALID_OPERATION } from "@/types/game"
import { StatisticByOperation } from "@/types/statistics"

import { Pie, PieChart } from 'recharts'

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

type ChartValue = { name: string, value: number }
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
        { name: `${operationName} - CORRECT`, value: correct },
        { name: `${operationName} - INCORRECT`, value: incorrect },
        { name: `${operationName} - SKIPPED`, value: skipped }
      ]
    ]
  }, [[], []] as ParsedStatisticByOperationType)

}

export default function Dashboard() {
  const { data: byOperation } = trpc.statistics.getStatisticsByOperation.useQuery()

  const [opData1, opData2] = parseStatisticsByOperation(byOperation?.statistics)

  console.log(opData1, opData2)

  return (
    <div className="h-[100vh] w-full overflow-hidden">
      <PieChart width={730} height={250}>
        <Pie data={opData1} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
        <Pie data={opData2} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
      </PieChart>
    </div>
  )
}