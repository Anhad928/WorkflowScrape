import { GetPeriods } from '@/actions/analytics/getPeriods';
import React, { Suspense } from 'react'
import PeriodSelector from './_components/PeriodSelector';
import { Period } from '@/types/analytics';
import { waitFor } from '@/lib/helper/waitFor';
import { Skeleton } from '@/components/ui/skeleton';
import { GetStatsCardsValues } from '@/actions/analytics/getStatsCardsValues';

function HomePage({searchParams}: {
  searchParams: {month?: string, year?: string};
}) {
  const currentDate = new Date();
  const { month, year } = searchParams;
  const period: Period ={
    month: month ? parseInt(month) : currentDate.getMonth(),
    year: year ? parseInt(year) : currentDate.getFullYear(),
  };
  return (
    <div className='flex flex-1 flex-col h-full'>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-bold'>Home</h1>
        <Suspense fallback={<Skeleton className='w-[180]px h-[40px]' />}>
          <PeriodSelectorWrapper selectedPeriod={period}/>
        </Suspense>
      </div>
      <StatsCards selectedPeriod={period}/>
    </div>
  )
}
async function PeriodSelectorWrapper({selectedPeriod}: {selectedPeriod: Period}) {
  await waitFor(4500);
  const periods = await GetPeriods();
  return (
    <PeriodSelector selectedPeriod={selectedPeriod} periods = {periods}></PeriodSelector>
  )
}

async function StatsCards({ selectedPeriod }: { selectedPeriod: Period }) {
  const data = await GetStatsCardsValues(selectedPeriod)
  return <pre>{JSON.stringify(data, null, 4)}</pre>
}
export default HomePage
