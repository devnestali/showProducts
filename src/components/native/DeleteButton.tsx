import { useState } from "react"
import { 
  AlertDialog, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "../ui/alert-dialog"

import { Button } from "../ui/button"

interface DeleteButtonParams {
  children: React.ReactNode
  onDelete: () => Promise<void>
}

export function DeleteButton({ children, onDelete }: DeleteButtonParams) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  async function handleClickToDelete() {
    await onDelete()
    setIsOpen(false)
  }
  
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que deseja excluir ?</AlertDialogTitle>
          <AlertDialogDescription>
            Está ação não pode ser desfeita. Isso vai apagar permanentemente o pedido.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
          <Button
            variant="destructive" 
            className="cursor-pointer"
            onClick={handleClickToDelete}
          >
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}