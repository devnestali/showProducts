import { Header } from "@/components/native/Header"
import { Product } from "@/components/native/Product"

export function Home() {
  return (
    <div className="w-screen">
      <Header />

      <div className="flex flex-col gap-4 px-16 py-8">
        <Product />
      </div>
    </div>
  )
}