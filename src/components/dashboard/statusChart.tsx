import { STATUS_COLOR } from "@/lib/dashboard/utils";
import { RESULT_STATUS, VALID_OPERATION } from "@/types/game";
import { StatisticByOperation } from "@/types/statistics";
import { useMemo } from "react";
import { Cell, LabelList, Legend, Pie } from "recharts";
import PieChart from "../charts/pieChart";

interface StatusChartProps {
  data: StatisticByOperation[];
  selectedOperation: VALID_OPERATION | null;
}

function parseOperations(data: StatisticByOperation[], selectedOperation: VALID_OPERATION | null) {
  if (!selectedOperation) {
    return data.reduce((prev, value) => {
      return [
        { ...prev[0], value: prev[0].value + Number(value.correctQuestions) },
        { ...prev[1], value: prev[1].value + Number(value.incorrectQuestions) },
        { ...prev[2], value: prev[2].value + Number(value.skippedQuestions) }
      ]
    }, [
      { name: "Correct", status: RESULT_STATUS.CORRECT, value: 0 },
      { name: "Incorrect", status: RESULT_STATUS.INCORRECT, value: 0 },
      { name: "Skipped", status: RESULT_STATUS.SKIPPED, value: 0 },
    ])
  }

  const value = data.find(el => el.operation === selectedOperation)

  if (!value) return []

  const [correct, incorrect, skipped] = [value.correctQuestions, value.incorrectQuestions, value.skippedQuestions].map(Number)

  return [
    { name: "Correct", status: RESULT_STATUS.CORRECT, value: correct },
    { name: "Incorrect", status: RESULT_STATUS.INCORRECT, value: incorrect },
    { name: "Skipped", status: RESULT_STATUS.SKIPPED, value: skipped },
  ]
}


export default function StatusChart({ data, selectedOperation }: StatusChartProps) {
  const parsedData = useMemo(() => parseOperations(data, selectedOperation), [data, selectedOperation])

  return (
    <PieChart className="w-full h-full grow shrink">
      {(width, height) => (
        <>
          <Pie data={parsedData} dataKey="value" name="name" cx="50%" cy="50%" outerRadius={Math.min(width, height) * 0.4} fill="red">
            {parsedData.map(el => <Cell key={el.name} fill={STATUS_COLOR[el.status]} />)}
            <LabelList dataKey="value" position="inside" formatter={(value: number) => value || ''} />
          </Pie>
          <Legend />
        </>
      )}
    </PieChart>
  )
}