export interface EditingModalProps {
  id: string
  title: string
  author: string
  comment: string
  completion_date: string
  showModal: boolean
  handleClose: () => void
}
