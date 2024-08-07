'use client'

import 'dayjs/locale/pt-br'

import dayjs from 'dayjs'
import Link from 'next/link'
import * as XLSX from 'xlsx'
import { toast } from 'sonner'
import { saveAs } from 'file-saver'
import { Lead } from '@prisma/client'
import { UserButton } from '@clerk/nextjs'
import { FaWhatsapp } from 'react-icons/fa'
import { TbTableExport } from 'react-icons/tb'
import { useState, useTransition } from 'react'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, SquareMousePointer, Trash } from 'lucide-react'

import { Hint } from '@/components/hint'
import { Pagination } from './pagination'
import { SearchInput } from './search-input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useConfirm } from '@/hooks/use-confirm'
import { Checkbox } from '@/components/ui/checkbox'
import { bulkDeleteLeads, exportLeads } from '@/features/leads/actions'
import { DatePickerWithRange } from '@/app/dashboard/_components/date-picker-with-range'

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
  const { refresh } = useRouter()
  const searchParams = useSearchParams()
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [isExportingLeads, startExportingLeadsTransition] = useTransition()
  const [isDeletingSelectedItems, startDeletingSelectedItemsTransition] =
    useTransition()

  const [ConfirmDialog, confirmDialog] = useConfirm()

  const handleSelectItem = (id: string) => {
    setSelectedItems(prevState => {
      if (prevState.includes(id)) {
        return prevState.filter(item => item !== id)
      }

      return [...prevState, id]
    })
  }

  const handleSelectAll = () => {
    const actualSelectedItems = selectedItems
    const actualData = data.map(item => item.id)

    const diff = actualData.filter(item => !actualSelectedItems.includes(item))

    setSelectedItems(prevState => {
      if (diff.length > 0) {
        return [...prevState, ...diff]
      }

      return [...prevState.filter(item => !actualData.includes(item))]
    })
  }

  const handleDeleteSelectedItems = async () => {
    const ok = await confirmDialog(
      'Excluir leads selecionados',
      'Você tem certeza que deseja excluir os leads selecionados?',
    )

    if (!ok) return

    startDeletingSelectedItemsTransition(async () => {
      try {
        const res = await bulkDeleteLeads(selectedItems)

        if (res.error) {
          toast.error(res.error)
        }

        if (res.success) {
          refresh()
          toast.success(res.success)
          setSelectedItems([])
        }
      } catch (error) {
        toast.error('Ocorreu um erro ao excluir os leads. Tente novamente.')
      }
    })
  }

  const handleExportLeads = async () => {
    startExportingLeadsTransition(async () => {
      try {
        const res = await exportLeads({
          to: searchParams.get('to'),
          from: searchParams.get('from'),
          search: searchParams.get('search'),
        })

        if (res.error) {
          toast.error(res.error)
        }

        if (res.success) {
          toast.success(res.success)

          const wb = XLSX.utils.book_new()
          const ws = XLSX.utils.json_to_sheet(res.data)
          XLSX.utils.book_append_sheet(wb, ws, 'Leads')
          const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })

          const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          })

          saveAs(blob, 'leads.xlsx')
        }
      } catch (error) {
        toast.error('Ocorreu um erro ao exportar os leads. Tente novamente.')
      }
    })
  }

  return (
    <>
      <main>
        <Card>
          <CardContent className="flex items-center justify-end p-4">
            <UserButton showName />
          </CardContent>
        </Card>

        <Card className="m-4">
          <CardHeader>
            <CardTitle>Lista de leads</CardTitle>
            <CardDescription>
              Lista de leads com informações detalhadas
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex flex-col justify-between gap-2 xl:flex-row">
              <SearchInput />

              <div className="flex flex-col gap-2 md:flex-row">
                <DatePickerWithRange />

                <Hint label="Exportar leads">
                  <Button
                    variant="outline"
                    disabled={isExportingLeads}
                    onClick={handleExportLeads}
                    className="ml-auto w-full gap-2 md:w-fit"
                  >
                    {isExportingLeads ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <TbTableExport className="size-4" />
                    )}

                    <span>Exportar leads</span>
                  </Button>
                </Hint>

                <Button
                  className="gap-2"
                  variant="destructive"
                  onClick={handleDeleteSelectedItems}
                  disabled={
                    selectedItems.length === 0 ||
                    isDeletingSelectedItems ||
                    isExportingLeads
                  }
                >
                  {isDeletingSelectedItems ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Trash className="size-4" />
                  )}
                  {selectedItems.length > 0
                    ? `Excluir ${selectedItems.length} selecionados`
                    : 'Excluir selecionados'}
                </Button>
              </div>
            </div>

            <Table className="border">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[1rem]">
                    <SquareMousePointer
                      className="size-5 cursor-pointer"
                      onClick={() => {
                        handleSelectAll()
                      }}
                    />
                  </TableHead>
                  <TableHead className="w-[7rem]">Contato</TableHead>
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
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={() => handleSelectItem(item.id)}
                        />
                      </TableCell>
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

      <ConfirmDialog />
    </>
  )
}
