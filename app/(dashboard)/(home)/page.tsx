import { GetPeriods } from '@/actions/analytics/getPeriods';
import React, { Suspense } from 'react'

function HomePage() {
  return (
    <div>
      <Suspense>
        <PeriodSelectorWrapper />
      </Suspense>
    </div>
  )
}
async function PeriodSelectorWrapper(){
  const periods = await GetPeriods();
  return <pre>{JSON.stringify(periods, null, 4)}</pre>
}
export default HomePage
