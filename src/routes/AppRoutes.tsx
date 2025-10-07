import { Navigate, Route, Routes } from "react-router-dom";

import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { Order } from "@/pages/Order";
import { OrdersGraph } from "@/pages/OrdersGraph";
import { Register } from "@/pages/Register";
import { useAuth } from "@/contexts/authContext";

export function AppRoutes() {
  const { token } = useAuth()
  
  return (
    <Routes>
      {
        token ? (
        <>
          <Route element={<Home />} path="/home" />
          <Route element={<Order />} path="/order/:orderId" />
          <Route element={<OrdersGraph />} path="/graph" />
          <Route element={<Navigate to="/home" replace />} path="/*" />
        </>
        ) : (
          <>
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            <Route element={<Navigate to="/login" replace />} path="/*" />
          </>
        )
      }
    </Routes>
  )
}