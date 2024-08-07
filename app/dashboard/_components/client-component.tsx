'use client'

import { Lead } from '@prisma/client'

interface ClientComponentProps {
  data: Lead[]
}

export const ClientComponent = ({ data }: ClientComponentProps) => {
  return <main></main>
}
