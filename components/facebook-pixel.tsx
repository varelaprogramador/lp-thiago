'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

interface FacebookPixelProps {
  pixelId: string
}

export const FacebookPixel = ({ pixelId }: FacebookPixelProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!pixelId) return

    import('react-facebook-pixel')
      .then(x => x.default)
      .then(ReactPixel => {
        ReactPixel.init(pixelId)
        ReactPixel.pageView()
      })
  }, [pathname, pixelId, searchParams])

  return null
}
