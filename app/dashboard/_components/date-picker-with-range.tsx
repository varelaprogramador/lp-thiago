'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DateRange } from 'react-day-picker'
import { useEffect, useState, useTransition } from 'react'
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export const DatePickerWithRange = ({
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { replace } = useRouter()
  const pathnames = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [date, setDate] = useState<DateRange | undefined>(undefined)

  const handleDateChange = (date: DateRange | undefined) => {
    const params = new URLSearchParams(searchParams.toString())

    if (date?.from) {
      params.set('from', date.from.toISOString())
    } else {
      params.delete('from')
    }

    if (date?.to) {
      params.set('to', date.to.toISOString())
    } else {
      params.delete('to')
    }

    setDate(date)
    startTransition(() => {
      replace(`${pathnames}?${params.toString()}`, {
        scroll: false,
      })
    })
  }

  useEffect(() => {
    const from = searchParams.get('from')
    const to = searchParams.get('to')

    const dateStateIsEmpty = !date?.from && !date?.to

    if (from && to && dateStateIsEmpty) {
      setDate({
        from: new Date(from),
        to: new Date(to),
      })
    }
  }, [searchParams])

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y', {
                    locale: ptBR,
                  })}{' '}
                  -{' '}
                  {format(date.to, 'LLL dd, y', {
                    locale: ptBR,
                  })}
                </>
              ) : (
                format(date.from, 'LLL dd, y', {
                  locale: ptBR,
                })
              )
            ) : (
              <span>
                Selecione um intervalo de datas{' '}
                <span className="text-muted-foreground">...</span>
              </span>
            )}

            {isPending && <Loader2 className="size-4 animate-spin" />}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            locale={ptBR}
            selected={date}
            numberOfMonths={2}
            defaultMonth={date?.from}
            onSelect={date => {
              handleDateChange(date)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
