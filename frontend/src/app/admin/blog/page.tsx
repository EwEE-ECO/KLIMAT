"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/Button"

const posts = [
  { title: "Как выбрать кондиционер для квартиры", date: "15.05.2024", category: "Советы", published: true },
  { title: "Монтаж кондиционера: этапы и стоимость", date: "10.05.2024", category: "Советы", published: true },
  { title: "Скидка 20% на монтаж", date: "01.06.2024", category: "Акции", published: true },
]

export default function AdminBlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Блог</h1>
        <Button variant="primary" size="sm" className="gap-1"><Plus className="w-4 h-4" /> Новая статья</Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs uppercase tracking-wider bg-gray-50">
              <th className="px-5 py-3 font-medium">Заголовок</th>
              <th className="px-5 py-3 font-medium">Категория</th>
              <th className="px-5 py-3 font-medium">Дата</th>
              <th className="px-5 py-3 font-medium">Статус</th>
              <th className="px-5 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, i) => (
              <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-5 py-3 font-medium">{post.title}</td>
                <td className="px-5 py-3 text-gray-500">{post.category}</td>
                <td className="px-5 py-3 text-gray-500">{post.date}</td>
                <td className="px-5 py-3"><span className={`px-2 py-0.5 text-xs font-medium rounded-full ${post.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{post.published ? "Опубликовано" : "Черновик"}</span></td>
                <td className="px-5 py-3"><button className="text-xs text-brand-500 hover:text-brand-600">Редактировать</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
