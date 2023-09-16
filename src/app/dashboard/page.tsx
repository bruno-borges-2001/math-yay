'use client'

import DetailsTable from "@/components/dashboard/detailsTable"
import OperationsChart from "@/components/dashboard/operationsChart"
import OverallPerformance from "@/components/dashboard/overallPerformance"
import ProfileData from "@/components/dashboard/profileData"
import StatusChart from "@/components/dashboard/statusChart"
import Loader from "@/components/general/loader"
import { trpc } from "@/lib/trpc/client"

import '@/styles/dashboard.css'
import { VALID_OPERATION } from "@/types/game"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const params = useSearchParams()

  const { data: session, status } = useSession()
  const { replace } = useRouter()

  const userId = params.get('id')
  const { data, isLoading } = trpc.statistics.getStatistics.useQuery({ userId })

  const isMyDashboard = !userId || session?.user.id === userId
  const username = data?.statistics[0].userName || session?.user.name

  const [selectedOperation, setSelectedOperation] = useState<VALID_OPERATION | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated' && !userId) {
      replace('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  return (
    <>
      {data &&
        <>
          <ProfileData userId={userId ?? session?.user.id} username={username} isMyDashboard={isMyDashboard} />
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
        </>
      }

      <Loader isLoading={isLoading} caption="Fetching your data, just a few more seconds" zIndex={999} className="bg-slate-300 dark:bg-slate-600" />
    </>
  )
}