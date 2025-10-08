import type { User } from "@/components/native/Product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { api } from "@/lib/axios";

import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

type OrderParams = {
  orderId?: string
}

interface Order {
  data: {
    id: number
    title: string
    description: string
    orderDate: string
    userId: number
  }
}

export function Order() {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  
  const [userId, setUserId] = useState<number>()
  const [user, setUser] = useState<User>()
  
  const { orderId } = useParams<OrderParams>()

  async function updateOrder() {
    try {
      const response = await api.put(`/order/${orderId}`, {
        newTitle: title,
        newDescription: description
      })

      alert(response.data.message)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    async function fetchForCurrentOrder() {
      try {
        const { data }: Order = await api.get(`/order/${orderId}`)

        setTitle(data.title)
        setDescription(data.description)
        setUserId(data.userId)

      } catch (error) {
        console.error(error)
      }
    }

    fetchForCurrentOrder()
  }, [])

  useEffect(() => {
    async function fetchForCurrentUserOrder() {
      const { data } = await api.get('/user', { params: { userId: userId } })

      setUser({
        username: data.username,
        email: data.email
      })
    }

    fetchForCurrentUserOrder()
  }, [userId])
  
  return (
    <div className="w-screen flex flex-col justify-center gap-12 p-12">
      <div className="flex items-center gap-4">
        <a href="/">
          <ArrowLeft />
        </a>
        <h1 className="text-2xl text-accent-foreground">Pedido {orderId}</h1>
      </div>

      <form className="flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Título</label>
          <Input 
            type="text"
            id="title" 
            className="w-2xl" 
            placeholder="Digite o título do pedido..."
            value={title}
            onChange={(event) => setTitle(event.target.value)} 
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Descrição</label>
          <Textarea 
            id="description" 
            className="w-2xl h-16 resize-none" 
            placeholder="Digite a descrição do pedido..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <p>Usuário: {user?.username}</p>
          <p>Email: {user?.email}</p>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            variant="success"
            onClick={() => updateOrder()}
          >
            Alterar
          </Button>
        </div>
      </form>
    </div>
  )
}