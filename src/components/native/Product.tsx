import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Pencil, Trash2 } from 'lucide-react'

import { Button } from "../ui/button";

import { DeleteButton } from "./DeleteButton";
import type { Order } from "@/pages/adminPages/Home";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";

export interface User {
  username: string
  email: string
}

type ProductData = {
  data: Order
}

export function Product({ data }: ProductData) {
  const [userData, setUserData] = useState<User>()

  const navigate = useNavigate()

  function handleNavigationToOrder() {
    navigate(`/order/${data.id}`)
  }

  async function handleDeleteOrder() {
    try {
      const response = await api.delete(`/order/${data.id}`)

      alert(response.data.message)
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message)
      } else {
        alert('Erro desconhecido. Entre em contato com o desenvolvedor.')
      }
    }
  }

  useEffect(() => {
    async function fetchForUserOrder() {
      try {
        const response = await api.get('/user', { params: { userId: data.userId } })

        setUserData({
          username: response.data.username,
          email: response.data.email
        })
      } catch (error) {
        if (error instanceof AxiosError) {
          alert(error.response?.data.message)
        } else {
          alert('Erro desconhecido. Entre em contato com o desenvolvedor.')
        }
      }
    }

    fetchForUserOrder()
  }, [])

  return (
    <div className="flex flex-col gap-3 bg-accent p-6 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl leading-relaxed text-accent-foreground">
            {data.title}
          </h1>
          <p className="text-accent-foreground opacity-80">
            {data.description}
          </p>

          <div className="flex flex-col justify-center">
            <ul className="list-disc pl-4 mt-8">
              <li>Usuário: {userData?.username}</li>
              <li>Email: {userData?.email}</li>
              <li>Data: {data.orderDate.split('T')[0]}</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            variant="default" 
            className="p-4 cursor-pointer"
            onClick={() => handleNavigationToOrder()}
          >
            <Pencil size={18}/>
          </Button>
          
          <div>
           <DeleteButton
            onDelete={handleDeleteOrder}
           >
            <Button 
              variant="destructive" 
              className="p-4 cursor-pointer"
            >
              <Trash2 size={18}/>
            </Button>
           </DeleteButton>
          </div>
        </div>
      
      </div>
    </div>
  )
}