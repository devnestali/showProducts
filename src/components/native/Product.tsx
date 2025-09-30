import { Button } from "../ui/button";
import { Pencil, Trash2 } from 'lucide-react'

export function Product() {
  return (
    <div className="flex flex-col gap-3 bg-accent p-6 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl leading-relaxed text-accent-foreground">Realizar pedidos de folhas</h1>
          <p className="text-accent-foreground opacity-80">É necessario fazer um pedido de folhas para a papelaria</p>

          <div className="flex flex-col justify-center">
            <ul className="list-disc pl-4">
              <li>Usuário: John Doe</li>
              <li>Email: johndoe@example.com</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            variant="default" 
            className="p-4"
          >
            <Pencil size={18}/>
          </Button>
          <Button 
            variant="destructive" 
            className="p-4"
          >
            <Trash2 size={18}/>
          </Button>
        </div>
      </div>
    </div>
  )
}