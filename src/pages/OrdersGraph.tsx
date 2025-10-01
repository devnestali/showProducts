import { Header } from "@/components/native/Header";
import {  CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";


const data = [
  { date: "2025-09-01", orders: 3 },
  { date: "2025-09-02", orders: 7 },
  { date: "2025-09-03", orders: 5 },
  { date: "2025-09-04", orders: 8 },
  { date: "2025-09-05", orders: 2 },
];


export function OrdersGraph() {
  return (
    <div className="w-screen">
      <Header />

      <div className="p-12">
        <h1 className="text-center text-3xl font-bold text-foreground mb-3">Pedidos realizados no mês</h1>
        <p className="text-center text-sm text-muted-foreground mb-20">No gráfico abaixo você poderá ver todos os pedidos realizados no mês atual.</p>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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