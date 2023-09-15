'use client'

import DetailsTable from "@/components/dashboard/detailsTable"
import OperationsChart from "@/components/dashboard/operationsChart"
import OverallPerformance from "@/components/dashboard/overallPerformance"
import StatusChart from "@/components/dashboard/statusChart"
import Loader from "@/components/general/loader"
import { trpc } from "@/lib/trpc/client"

import '@/styles/dashboard.css'
import { VALID_OPERATION } from "@/types/game"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const { status } = useSession()
  const { replace } = useRouter()
  const { data, isLoading } = trpc.statistics.getStatisticsByOperation.useQuery()

  const [selectedOperation, setSelectedOperation] = useState<VALID_OPERATION | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      replace('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  return (
    <>
      {data &&
        <div className="dashboard-wrapper">
          <div className="section">
            <div className="section-part">
              <h1>Operations Breakdown</h1>
              <OperationsChart data={data.statistics} selectedOperation={selectedOperation} onBarClick={(operation) => setSelectedOperation(prev => prev === operation ? null : operation)} />
            </div>
            <div className="section-part">
              <h1>Performance Summary</h1>
              <StatusChart data={data.statistics} selectedOperation={selectedOperation} />
            </div>
          </div>
          <div className="section">
            <div className="section-part">
              <h1>Detailed Data</h1>
              <DetailsTable data={data.statistics} />
            </div>
            <div className="section-part">
              <h1>Overall Performance</h1>
              <OverallPerformance data={data.statistics} />
            </div>
          </div>
        </div>
      }

      <Loader isLoading={isLoading} caption="Fetching your data, just a few more seconds" zIndex={999} backgroundColor="rgb(209 213 219)" />
    </>
  )
}