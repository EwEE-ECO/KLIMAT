"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/Button"

const services = [
  { name: "Монтаж сплит-системы до 12 BTU", price: "5 000 ₽", category: "Монтаж" },
  { name: "Монтаж сплит-системы 18-24 BTU", price: "7 000 ₽", category: "Монтаж" },
  { name: "Чистка кондиционера", price: "1 500-3 000 ₽", category: "Обслуживание" },
  { name: "Дозаправка хладагентом", price: "2 000-4 000 ₽", category: "Обслуживание" },
]

export default function AdminServicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Услуги</h1>
        <Button variant="primary" size="sm" className="gap-1"><Plus className="w-4 h-4" /> Добавить</Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs uppercase tracking-wider bg-gray-50">
              <th className="px-5 py-3 font-medium">Название</th>
              <th className="px-5 py-3 font-medium">Цена</th>
              <th className="px-5 py-3 font-medium">Категория</th>
              <th className="px-5 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {services.map((s, i) => (
              <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-5 py-3 font-medium">{s.name}</td>
                <td className="px-5 py-3 font-medium text-brand-500">{s.price}</td>
                <td className="px-5 py-3 text-gray-500">{s.category}</td>
                <td className="px-5 py-3"><button className="text-xs text-brand-500 hover:text-brand-600">Редактировать</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
