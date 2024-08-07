'use client'

import { ChevronLeftIcon, ChevronRightIcon, Loader2 } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'

import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from '@/components/ui/select'
import { useTransition } from 'react'

interface ClientComponentProps {
  totalPages: number
  currentPage?: number
  totalRegisters: number
  totalSelectedRows?: number
  isRowSelectedEnabled?: boolean
}

export const Pagination = ({
  totalPages,
  totalRegisters,
  currentPage = 1,
  totalSelectedRows,
  isRowSelectedEnabled,
}: ClientComponentProps) => {
  const { replace } = useRouter()
  const pathnames = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const take = parseInt(searchParams.get('take') || '10')

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())

    if (page > 1) {
      params.set('page', page.toString())
    } else {
      params.delete('page')
    }

    startTransition(() => {
      replace(`${pathnames}?${params.toString()}`, {
        scroll: false,
      })
    })
  }

  const handleTakeChange = (take: number) => {
    const params = new URLSearchParams(searchParams.toString())

    if (take > 10) {
      params.set('take', take.toString())
    }

    if (take === 10) {
      params.delete('take')
    }

    startTransition(() => {
      replace(`${pathnames}?${params.toString()}`, {
        scroll: false,
      })
    })
  }

  return (
    <div className="flex flex-col items-center justify-between gap-4 px-2 md:flex-row">
      {isRowSelectedEnabled && (
        <div className="text-sm text-muted-foreground">
          {totalSelectedRows} de {totalRegisters} item(s) selecionado(s)
        </div>
      )}

      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Items por página</p>
        <Select
          value={take.toString()}
          onValueChange={value => {
            const pageSize = parseInt(value)
            handleTakeChange(pageSize)
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={take.toString()} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map(pageSize => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex max-w-fit items-center justify-center gap-2">
          <span className="text-nowrap text-sm font-medium">
            Página {currentPage} de {totalPages}{' '}
          </span>
          {isPending && <Loader2 className="size-4 animate-spin" />}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            className="hidden size-8 p-0 lg:flex"
            onClick={() => {
              handlePageChange(1)
            }}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            className="size-8 p-0"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            className="size-8 p-0"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
