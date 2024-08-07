'use client'

import { useTransition } from 'react'
import { Loader2, Search } from 'lucide-react'
import { useDebouncedCallback } from 'use-debounce'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Input } from '@/components/ui/input'

export const SearchInput = () => {
  const { replace } = useRouter()
  const pathnames = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const handleChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      const params = new URLSearchParams(searchParams.toString())

      if (value) {
        params.set('search', value)
      } else {
        params.delete('search')
      }

      params.delete('page')
      startTransition(() => {
        replace(`${pathnames}?${params.toString()}`, {
          scroll: false,
        })
      })
    },
    500,
  )

  return (
    <div className="relative">
      {isPending ? (
        <div className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 transform">
          <Loader2 className="size-4 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 transform text-muted-foreground" />
      )}
      <Input
        type="search"
        onChange={handleChange}
        placeholder="Buscar lead..."
        defaultValue={searchParams.get('search') || ''}
        className="w-full pl-10 md:w-[12.5rem] lg:w-[21rem]"
      />
    </div>
  )
}
