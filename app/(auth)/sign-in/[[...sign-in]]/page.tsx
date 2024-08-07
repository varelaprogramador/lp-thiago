import { SignIn } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'

import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await currentUser()

  if (user) redirect('/dashboard')

  return (
    <main className="flex min-h-dvh items-center justify-center p-6">
      <SignIn
        appearance={{
          elements: {
            footerAction: { display: 'none' },
          },
        }}
      />
    </main>
  )
}
