import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";
import { useState } from "react";

export function Form() {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')


  async function createOrder() {
    try {
      const response = await api.post('/order', {
        title: title,
        description: description
      })

      alert(response.data.message)

      setTitle('')
      setDescription('')
      
    } catch (error) {
      if(error instanceof AxiosError) {
        alert(error.response?.data.message)
      } else {
        alert('Erro desconhecido. Entre em contato com o desenvolvedor.')
      }

    }
  }
  
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card className="w-1/2 h-10/12 p-8 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl">Formulário de pedido</CardTitle>
          <CardDescription className="text-md">Faça seu pedido agora mesmo</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="title">Título</label>
              <Input 
                type="text"
                id="title"
                placeholder="Digite o título do pedido..."
                onChange={(event) => setTitle(event.target.value)}
                value={title}
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="description">Descrição</label>
              <Textarea 
                id="description"
                className="h-32"
                placeholder="Digite a descrição do pedido..."
                onChange={(event) => setDescription(event.target.value)}
                value={description}
              />
            </div>

            <div>
              <Button 
                type="button"
                variant="success"
                onClick={() => createOrder()}
              >
                Enviar pedido
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}