import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'
import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const copyToClipboard = (text: string) => {
  window.navigator.clipboard.writeText(text).then(() => {
    toast.success('Copiado para a área de transferência')
  })
}

export const redirectTo = (url: string) => {
  window.location.href = url
}
