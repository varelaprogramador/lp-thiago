import { create } from 'zustand'

type OpenCreateLeadModalState = {
  isOpen: boolean
  eventId?: string
  onClose: () => void
  whatsappGroup?: string
  onOpen: ({
    eventId,
    whatsappGroup,
  }: {
    eventId: string
    whatsappGroup?: string
  }) => void
}

export const useOpenCreateLeadModal = create<OpenCreateLeadModalState>(set => ({
  isOpen: false,
  eventId: undefined,
  whatsappGroup: undefined,
  onClose: () =>
    set({
      isOpen: false,
      eventId: undefined,
      whatsappGroup: undefined,
    }),
  onOpen: ({
    eventId,
    whatsappGroup,
  }: {
    eventId: string
    whatsappGroup?: string
  }) =>
    set({
      isOpen: true,
      eventId,
      whatsappGroup,
    }),
}))
