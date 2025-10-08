import { Route, Routes } from "react-router-dom";

import { Home } from "@/pages/adminPages/Home";
import { Login } from "@/pages/signPages/Login";
import { Order } from "@/pages/adminPages/Order";
import { OrdersGraph } from "@/pages/adminPages/OrdersGraph";
import { Register } from "@/pages/signPages/Register";
import { useAuth } from "@/contexts/authContext";
import { Form } from "@/pages/userPages/Form";

export function AppRoutes() {
  const { token, isAdmin, isLoading } = useAuth()

  if(isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        Carregando...
      </div>
    )
  }
  
  return (
    <Routes>
      {token ? (
        isAdmin ? (
          <>
            <Route element={<Home />} path="/" />
            <Route element={<Order />} path="/order/:orderId" />
            <Route element={<OrdersGraph />} path="/graph" />
          </>
        ) : (
          <>
            <Route element={<Form />} path="/" />
          </>
        )
      ) : (
      <>
        <Route element={<Login />} path="/" />
        <Route element={<Register />} path="/register" />
      </>
    )}  
    </Routes>
    
  )
}