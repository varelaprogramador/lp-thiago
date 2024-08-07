'use client'

import { z } from 'zod'
import { toast } from 'sonner'
import { useTransition } from 'react'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

let ReactPixel: any = null

if (typeof window !== 'undefined') {
  import('react-facebook-pixel')
    .then(x => x.default)
    .then(currReactPixel => {
      ReactPixel = currReactPixel
    })
}

import { createLead } from '../actions'
import { redirectTo } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { PhoneInput } from '@/components/phone-input'
import { useOpenCreateLeadModal } from '../hooks/use-open-create-lead-modal'

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog'

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'

const schema = z.object({
  phone: z.string().trim().min(10, 'Número de telefone inválido'),
})

export const CreateLeadModal = () => {
  const [isPending, startTransition] = useTransition()
  const { isOpen, onClose, eventId, whatsappGroup } = useOpenCreateLeadModal()

  const form = useForm<z.infer<typeof schema>>({
    disabled: isPending,
    resolver: zodResolver(schema),
    defaultValues: {
      phone: '',
    },
  })

  const onSubmit = form.handleSubmit(async (values: z.infer<typeof schema>) => {
    startTransition(async () => {
      try {
        const res = await createLead({
          eventId,
          phone: values.phone,
        })

        if (res.error) {
          toast.error(res.error)
        }

        if (res.success) {
          toast.success(res.success)

          ReactPixel.track(
            'Lead',
            {},
            {
              eventID: eventId,
            },
          )

          if (whatsappGroup) {
            redirectTo(whatsappGroup)
          }
        }
      } catch (error) {
        toast.error('Ocorreu um erro ao enviar o formulário. Tente novamente.')
      }
    })
  })

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        form.reset()
        onClose()
      }}
    >
      <DialogContent className="w-full max-w-[90%] rounded-md sm:max-w-md">
        <DialogHeader>
          <DialogDescription className="text-center">
            Preencha o formulário e entre no nosso Grupo VIP do WhatsApp.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={onSubmit}>
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    WhatsApp <span className="text-red-500">*</span>
                  </FormLabel>

                  <FormControl>
                    <PhoneInput
                      value={field.value}
                      isDisabled={isPending}
                      onChange={field.onChange}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full gap-2 uppercase" disabled={isPending}>
              Quero entrar no Grupo VIP
              {isPending && <Loader2 className="size-4 animate-spin" />}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Seus dados estão seguros e não serão compartilhados com terceiros.
            </p>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
