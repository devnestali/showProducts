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
}

export function DeleteButton({ children }: DeleteButtonParams) {
  return (
    <AlertDialog>
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
          <Button variant="destructive" className="cursor-pointer">Continue</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}