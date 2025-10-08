import { Header } from "@/components/native/Header"
import { Product } from "@/components/native/Product"
import { api } from "@/lib/axios"
import { AxiosError } from "axios"

import { useEffect, useState } from "react"

export interface Order {
  id: number
  title: string
  description: string
  orderDate: string
  userId: number
}

export function Home() {
  const [orders, setOrders] = useState<Order[]>([])
  
  useEffect(() => {
    async function fetchForOrders() {
      try {
        const { data } = await api.get('/order')

        setOrders(data)

      } catch (error) {
        if(error instanceof AxiosError) {
          alert(error.response?.data.message)
        } else {
          alert('Erro desconhecido. Entre em contato com o desenvolvedor.')
        }
      }
    }

    fetchForOrders()
  }, [])
  return (
    <div className="w-screen">
      <Header />

      <div className="flex flex-col gap-4 px-16 py-8">
        {
          orders.map((order, _) => {
            return (
              <Product 
                key={order.id} 
                data={order}
              />
            )
          })
        }
      </div>
    </div>
  )
}