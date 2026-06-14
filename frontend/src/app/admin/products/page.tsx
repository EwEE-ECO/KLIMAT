"use client"

import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { formatPrice } from "@/lib/utils"

const products = [
  { id: "1", name: "DENKO DSX-12", category: "Настенные", price: 34990, stock: true, hit: true },
  { id: "2", name: "DAHATSU DN-18", category: "Настенные", price: 42990, stock: true, hit: true },
  { id: "3", name: "Daikin FTXB-N", category: "Настенные", price: 58990, stock: true, hit: false },
]

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Товары</h1>
        <Button variant="primary" size="sm" className="gap-1"><Plus className="w-4 h-4" /> Добавить</Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Поиск товаров..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs uppercase tracking-wider bg-gray-50">
              <th className="px-5 py-3 font-medium">Название</th>
              <th className="px-5 py-3 font-medium">Категория</th>
              <th className="px-5 py-3 font-medium">Цена</th>
              <th className="px-5 py-3 font-medium">Наличие</th>
              <th className="px-5 py-3 font-medium">Хит</th>
              <th className="px-5 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-5 py-3 font-medium">{p.name}</td>
                <td className="px-5 py-3 text-gray-500">{p.category}</td>
                <td className="px-5 py-3">{formatPrice(p.price)}</td>
                <td className="px-5 py-3"><span className={`px-2 py-0.5 text-xs font-medium rounded-full ${p.stock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{p.stock ? "В наличии" : "Нет"}</span></td>
                <td className="px-5 py-3">{p.hit ? <span className="text-red-500">★</span> : "—"}</td>
                <td className="px-5 py-3"><button className="text-xs text-brand-500 hover:text-brand-600">Редактировать</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
