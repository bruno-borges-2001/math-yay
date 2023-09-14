'use client'

import OperationsChart from "@/components/dashboard/operationsChart"
import StatusChart from "@/components/dashboard/statusChart"
import Loader from "@/components/general/loader"
import { trpc } from "@/lib/trpc/client"

import '@/styles/dashboard.css'
import { VALID_OPERATION } from "@/types/game"
import { useState } from "react"

export default function Dashboard() {
  const { data, isLoading } = trpc.statistics.getStatisticsByOperation.useQuery()

  const [selectedOperation, setSelectedOperation] = useState<VALID_OPERATION | null>(null)

  return (
    <>
      {data &&
        <div className="dashboard-wrapper">
          <div className="section">
            <h1>Operations Breakdown</h1>
            <OperationsChart data={data.statistics} selectedOperation={selectedOperation} onBarClick={(operation) => setSelectedOperation(prev => prev === operation ? null : operation)} />
            <h1>Performance Summary</h1>
            <StatusChart data={data.statistics} selectedOperation={selectedOperation} />
          </div>
        </div>
      }

      <Loader isLoading={isLoading} caption="Fetching your data, just a few more seconds" zIndex={999} backgroundColor="rgb(209 213 219)" />
    </>
  )
}