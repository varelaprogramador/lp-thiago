import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'
import { ClientComponent } from './_components/client-component'
import { Prisma } from '@prisma/client'

export const metadata: Metadata = {
  title: 'Dashboard',
}

interface PageProps {
  searchParams: {
    to: string | null
    take: string | null
    from: string | null
    page: string | null
    search: string | null
  }
}

export default async function Page({
  searchParams: { search, page, take, from, to },
}: PageProps) {
  const user = await currentUser()

  if (!user) redirect('/sign-in')

  const limit = parseInt(take || '10')
  const pageInt = parseInt(page || '1')
  const offset = (pageInt - 1) * limit

  let toFormatted: Date | undefined
  let fromFormatted: Date | undefined

  if (from) {
    fromFormatted = new Date(from)
    fromFormatted.setHours(0, 0, 0, 0)
  }

  if (to) {
    toFormatted = new Date(to)
    toFormatted.setHours(23, 59, 59, 999)
  }

  let where: Prisma.LeadWhereInput = {}

  if (search) {
    where = {
      phone: {
        contains: search,
      },
    }
  }

  if (from) {
    where.createdAt = {
      gte: fromFormatted,
    }
  }

  if (to) {
    where.createdAt = {
      lte: toFormatted,
    }
  }

  if (from && to) {
    where.createdAt = {
      gte: fromFormatted,
      lte: toFormatted,
    }
  }

  const count = await db.lead.count({
    where,
  })

  const totalPages = Math.ceil((count || 0) / limit) || 1

  const data = await db.lead.findMany({
    where,
    take: limit,
    skip: offset,
    orderBy: {
      createdAt: 'desc',
    },
  })

  console.log(toFormatted)

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
