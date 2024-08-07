import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip'

export interface HintProps {
  label: string
  sideOffset?: number
  alignOffset?: number
  children: React.ReactNode
  align?: 'start' | 'center' | 'end'
  side?: 'left' | 'right' | 'top' | 'bottom'
}

export const Hint = ({
  side,
  label,
  align,
  children,
  sideOffset,
  alignOffset,
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          className="select-none pointer-events-none"
        >
          <p className="font-semibold">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
