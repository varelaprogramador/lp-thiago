import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'
import { ClientComponent } from './_components/client-component'

export const metadata: Metadata = {
  title: 'Dashboard',
}

interface PageProps {
  searchParams: {
    take: string | null
    page: string | null
    search: string | null
  }
}

export default async function Page({
  searchParams: { search, page, take },
}: PageProps) {
  const user = await currentUser()

  if (!user) redirect('/sign-in')

  const limit = parseInt(take || '10')
  const pageInt = parseInt(page || '1')
  const offset = (pageInt - 1) * limit

  const count = await db.lead.count()

  const totalPages = Math.ceil((count || 0) / limit) || 1

  const data = await db.lead.findMany({
    take: limit,
    skip: offset,
    where: {
      phone: {
        contains: search || '',
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  if (pageInt > totalPages) {
    return redirect(`/dashboard?page=${totalPages}`)
  }

  if (pageInt < 1) {
    return redirect(`/dashboard`)
  }

  return (
    <ClientComponent
      data={data}
      currentPage={pageInt}
      totalPages={totalPages}
      totalRegisters={count || 0}
    />
  )
}
