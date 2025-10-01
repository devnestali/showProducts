import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { Order } from "@/pages/Order";
import { OrdersGraph } from "@/pages/OrdersGraph";
import { Register } from "@/pages/Register";
import { Route, Routes } from "react-router-dom";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Home />} index />
      <Route element={<Order />} path="/order/:id" />
      <Route element={<OrdersGraph />} path="/orders-graph" />
      <Route element={<Login />} path="/login" />
      <Route element={<Register />} path="/register" />
    </Routes>
  )
}