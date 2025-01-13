import React, { Suspense } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ShieldIcon } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton';
export default function CredentialsPage() {
  return (
    <div className='flex flex-1 flex-col h-full'>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <h1 className='text-3xl font-bold'>Credentials</h1>
          <p className='text-muted-foreground'>Manage your Credentials</p>
        </div>
      </div>

      <div className='h-full py-6 space-y-8'>
        <Alert>
          <ShieldIcon className='h-4 w-4 stroke-primary'/>
          <AlertTitle className='text-primary'>Encryption</AlertTitle>
          <AlertDescription>
            All information is securly encrypted, ensuring your data remains
            safe
          </AlertDescription>
        </Alert>

        <Suspense fallback={<Skeleton className='h-[300px] w-full '/>}>
          <UserCredentials />
        </Suspense>
      </div>
    </div>
  )
}


async function UserCredentials() {
  return (
    <div>
      User creds
    </div>
  );
}