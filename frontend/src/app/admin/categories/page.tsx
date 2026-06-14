"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/Button"

const categories = [
  { name: "Настенные сплит-системы", slug: "nastenniy", count: 45 },
  { name: "Кассетные кондиционеры", slug: "kassetniy", count: 12 },
  { name: "Канальные кондиционеры", slug: "kanalniy", count: 8 },
  { name: "Мульти-сплит системы", slug: "multisplit", count: 15 },
  { name: "Мобильные кондиционеры", slug: "mobilniy", count: 6 },
]

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Категории</h1>
        <Button variant="primary" size="sm" className="gap-1"><Plus className="w-4 h-4" /> Добавить</Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs uppercase tracking-wider bg-gray-50">
              <th className="px-5 py-3 font-medium">Название</th>
              <th className="px-5 py-3 font-medium">Slug</th>
              <th className="px-5 py-3 font-medium">Товаров</th>
              <th className="px-5 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.slug} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-5 py-3 font-medium">{cat.name}</td>
                <td className="px-5 py-3 text-gray-500">/{cat.slug}</td>
                <td className="px-5 py-3">{cat.count}</td>
                <td className="px-5 py-3"><button className="text-xs text-brand-500 hover:text-brand-600">Редактировать</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
