import { getOperationName } from "@/lib/dashboard/utils";
import { StatisticByOperation } from "@/types/statistics";
import { PolarAngleAxis, Radar } from "recharts";
import RadarChart from "../charts/radarChart";

interface OverallPerformance {
  data?: StatisticByOperation[]
}

function parseOperations(data?: StatisticByOperation[]) {
  if (!data) return []

  return data.map(value => {
    const [correct, incorrect, skipped] = [value.correctQuestions, value.incorrectQuestions, value.skippedQuestions].map(Number)
    const total = correct + incorrect + skipped
    return { name: getOperationName(value.operation), "Correctness Ratio": total > 0 ? correct / total : 0, fullMark: 1 }
  })
}

export default function OverallPerformance({ data }: OverallPerformance) {
  const parsedData = parseOperations(data)

  return (
    <RadarChart data={parsedData} className="w-full h-full grow shrink" >
      {() => (
        <>
          <PolarAngleAxis dataKey="name" />
          <Radar dataKey="Correctness Ratio" stroke="#7c3aed" fill="#4f46e5" fillOpacity={0.6} />
        </>
      )}
    </RadarChart>
  )
}