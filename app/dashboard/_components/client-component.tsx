'use client'

import 'dayjs/locale/pt-br'

import dayjs from 'dayjs'
import Link from 'next/link'
import { useState } from 'react'
import { Lead } from '@prisma/client'
import { UserButton } from '@clerk/nextjs'
import { FaWhatsapp } from 'react-icons/fa'
import relativeTime from 'dayjs/plugin/relativeTime'

import { Pagination } from './pagination'
import { SearchInput } from './search-input'
import { Badge } from '@/components/ui/badge'

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from '@/components/ui/table'

import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardContent,
  CardDescription,
} from '@/components/ui/card'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

interface ClientComponentProps {
  data: Lead[]
  totalPages: number
  currentPage: number
  totalRegisters: number
}

export const ClientComponent = ({
  data,
  currentPage,
  totalPages,
  totalRegisters,
}: ClientComponentProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  return (
    <main>
      <Card>
        <CardContent className="flex items-center justify-end p-4">
          <UserButton showName />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de leads</CardTitle>
          <CardDescription>
            Lista de leads com informações detalhadas
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <SearchInput />

          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[15rem]">Contato</TableHead>
                <TableHead className="w-[6.875rem]">Cidade</TableHead>
                <TableHead className="w-[4.375rem]">Estado</TableHead>
                <TableHead className="w-[4.375rem]">País</TableHead>
                <TableHead className="w-[6.875rem]">IP</TableHead>
                <TableHead className="w-[6.875rem]">OS</TableHead>
                <TableHead className="w-[6.875rem]">Navegador</TableHead>
                <TableHead className="w-[6.875rem]">Criado em</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.map(item => {
                const unformattedPhone = item.phone.replace(/\D/g, '')

                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Badge variant="outline" className="text-nowrap">
                        <Link
                          target="_blank"
                          rel="noopener noreferrer"
                          referrerPolicy="no-referrer"
                          href={`https://wa.me/${
                            item.phone.startsWith('+')
                              ? unformattedPhone
                              : `+55${unformattedPhone}`
                          }`}
                          className="flex max-w-fit items-center gap-1.5 hover:underline"
                        >
                          <FaWhatsapp className="size-4 text-green-500" />{' '}
                          {item.phone ?? 'N/A'}
                        </Link>
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline" className="text-nowrap">
                        {item?.city ?? 'N/A'}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline" className="text-nowrap">
                        {item?.state ?? 'N/A'}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline" className="text-nowrap">
                        {item?.country ?? 'N/A'}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline" className="text-nowrap">
                        {item?.ip ?? 'N/A'}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline" className="text-nowrap">
                        {item?.osName ?? 'N/A'}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline" className="text-nowrap">
                        {item?.browserName ?? 'N/A'}
                      </Badge>
                    </TableCell>

                    <TableCell className="flex flex-col items-end gap-1">
                      <Badge variant="outline" className="text-nowrap">
                        {dayjs(item.createdAt).format('DD/MM/YYYY HH:mm:ss')}
                      </Badge>
                      <Badge variant="outline" className="text-nowrap">
                        {dayjs().to(new Date(item.createdAt))}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>

        <CardFooter>
          <div className="flex-1">
            <Pagination
              isRowSelectedEnabled
              totalPages={totalPages}
              currentPage={currentPage}
              totalRegisters={totalRegisters}
              totalSelectedRows={selectedItems.length}
            />
          </div>
        </CardFooter>
      </Card>
    </main>
  )
}
