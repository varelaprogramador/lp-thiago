import { useState } from 'react'

import { Button } from '@/components/ui/button'

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog'

export const useConfirm = (): [
  () => JSX.Element,
  (title: string, message: string) => Promise<unknown>,
] => {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void
  } | null>(null)

  const confirm = async (title: string, message: string) => {
    setTitle(title)
    setMessage(message)

    return new Promise((resolve, reject) => {
      setPromise({ resolve })
    })
  }

  const handleClose = () => {
    setPromise(null)
  }

  const handleConfirm = () => {
    promise?.resolve(true)
    handleClose()
  }

  const handleCancel = () => {
    promise?.resolve(false)
    handleClose()
  }

  const ConfirmationDialog = () => (
    <Dialog open={promise !== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="pt-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return [ConfirmationDialog, confirm]
}
