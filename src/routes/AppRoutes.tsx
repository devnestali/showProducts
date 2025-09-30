import { Home } from "@/pages/Home";
import { Order } from "@/pages/Order";
import { Route, Routes } from "react-router-dom";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Home />} index />
      <Route element={<Order />} path="/order/:id" />
    </Routes>
  )
}