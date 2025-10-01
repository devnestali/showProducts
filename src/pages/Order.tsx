import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";

export function Order() {
  return (
    <div className="w-screen flex flex-col justify-center gap-12 p-12">
      <div className="flex items-center gap-4">
        <a href="/">
          <ArrowLeft />
        </a>
        <h1 className="text-2xl text-accent-foreground">Pedido 1236</h1>
      </div>

      <form className="flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Título</label>
          <Input 
            type="text"
            id="title" 
            className="w-2xl" 
            placeholder="Digite o título do pedido..." 
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Descrição</label>
          <Textarea 
            id="description" 
            className="w-2xl h-16 resize-none" 
            placeholder="Digite a descrição do pedido..." 
          />
        </div>

        <div className="flex flex-col gap-1">
          <p>Usuário: John Doe</p>
          <p>Email: johndoe@example.com</p>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="success">Alterar</Button>
          <Button variant="destructive">Cancelar</Button>
        </div>
      </form>
    </div>
  )
}