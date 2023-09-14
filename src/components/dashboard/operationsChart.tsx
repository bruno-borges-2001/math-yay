import { OPERATIONS_COLOR, OperationName, getOperationByName, getOperationName } from "@/lib/dashboard/utils";
import { VALID_OPERATION } from "@/types/game";
import { StatisticByOperation } from "@/types/statistics";
import { Bar, Cell, LabelList, Tooltip, XAxis, YAxis } from "recharts";
import BarChart from "../charts/barChart";

interface OperationsChartProps {
  data: StatisticByOperation[]
  selectedOperation?: VALID_OPERATION | null
  onBarClick?: (label: VALID_OPERATION) => void
}

function parseOperations(data: StatisticByOperation[]) {
  return data.reduce((prev, value) => {
    const [correct, incorrect, skipped] = [value.correctQuestions, value.incorrectQuestions, value.skippedQuestions].map(Number)
    const questionsCount = correct + incorrect + skipped
    return [...prev, { name: getOperationName(value.operation), operation: value.operation, "Questions Answered": questionsCount }]
  }, [] as { name: OperationName, operation: VALID_OPERATION, "Questions Answered": number }[])
}

export default function OperationsChart({ data, onBarClick, selectedOperation }: OperationsChartProps) {
  const parsedData = parseOperations(data)

  return (
    <BarChart data={parsedData} className="w-full h-full grow shrink">
      {() => (
        <>
          <XAxis dataKey="name" className="cursor-pointer" onClick={(label: any) => onBarClick && onBarClick(getOperationByName(label.value as OperationName))} />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="Questions Answered"
            onClick={(value: { operation: VALID_OPERATION }) => onBarClick && onBarClick(value.operation)}
          >
            {parsedData.map(el => (
              <Cell
                key={el.name}
                fill={OPERATIONS_COLOR[el.name]}
                className="cursor-pointer"
                opacity={selectedOperation && selectedOperation !== el.operation ? 0.5 : 1} />
            ))}
            <LabelList dataKey="Questions Answered" position="insideTop" formatter={(value: number) => value || ''} fill="black" />
          </Bar>
        </>
      )}
    </BarChart>
  )
}