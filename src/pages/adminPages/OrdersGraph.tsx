import { useEffect, useState } from "react";
import {  CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

import { Header } from "@/components/native/Header";

import { api } from "@/lib/axios";
import { AxiosError } from "axios";

type GraphInfoData = {
  date: string
  orders: number
}


export function OrdersGraph() {
  const [graphInfo, setGraphInfo] = useState<GraphInfoData[]>([])


  useEffect(() => {
    async function fetchForGraphInfo() {
      try {
        const response = await api.get('/graph')

        const graphInfoTransformed: GraphInfoData[] = Object.entries(response.data).map(
          ([date, orders]) => ({
            date,
            orders: orders as number
          })
        )

        setGraphInfo(graphInfoTransformed)
      } catch (error) {
        if(error instanceof AxiosError) {
          alert(error.response?.data.message)
        } else {
          alert('Erro desconhecido. Entre em contato com o desenvolvedor.')
        }
      }
    }

    fetchForGraphInfo()
  }, [])

  return (
    <div className="w-screen">
      <Header />

      <div className="p-12">
        <h1 className="text-center text-3xl font-bold text-foreground mb-3">Pedidos realizados no mês</h1>
        <p className="text-center text-sm text-muted-foreground mb-20">No gráfico abaixo você poderá ver todos os pedidos realizados no mês atual.</p>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={graphInfo} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis dataKey="date" />
            
            <YAxis width={100} tickLine={false} tick={false} />
            
            <Tooltip
              content={({ payload }) => {
                if (payload && payload.length) {
                  return (
                    <div className="bg-accent-foreground rounded-sm p-2">
                      <p className="text-sm text-black">Pedidos realizados</p>
                      <p className="text-center text-[#00bc7d] font-semibold">{payload[0].value}</p>
                    </div>
                  )
                }
              }}
            />
            
            <Line 
              type="natural" 
              dataKey="orders" 
              stroke="var(--chart-2)" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}