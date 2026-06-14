"use client"

import { Package, ShoppingCart, DollarSign, TrendingUp } from "lucide-react"

const stats = [
  { icon: ShoppingCart, label: "Новых заказов", value: "12", change: "+3", color: "bg-blue-500" },
  { icon: DollarSign, label: "Выручка за неделю", value: "345 000 ₽", change: "+15%", color: "bg-green-500" },
  { icon: Package, label: "Товаров в каталоге", value: "156", change: "", color: "bg-brand-500" },
  { icon: TrendingUp, label: "Конверсия", value: "3.2%", change: "+0.5%", color: "bg-accent-400" },
]

const recentOrders = [
  { id: "1", number: "KV-001", customer: "Иван Петров", total: "34 990 ₽", status: "NEW", date: "14.06.2024" },
  { id: "2", number: "KV-002", customer: "Анна Смирнова", total: "45 990 ₽", status: "ACCEPTED", date: "14.06.2024" },
  { id: "3", number: "KV-003", customer: "Сергей Иванов", total: "89 990 ₽", status: "INSTALLATION", date: "13.06.2024" },
  { id: "4", number: "KV-004", customer: "Ольга Козлова", total: "25 990 ₽", status: "COMPLETED", date: "12.06.2024" },
]

const statusColors: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-700",
  ACCEPTED: "bg-yellow-100 text-yellow-700",
  INSTALLATION: "bg-purple-100 text-purple-700",
  COMPLETED: "bg-green-100 text-green-700",
}

const statusLabels: Record<string, string> = {
  NEW: "Новый",
  ACCEPTED: "Принят",
  INSTALLATION: "Монтаж",
  COMPLETED: "Завершён",
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              {stat.change && <span className="text-xs font-semibold text-green-600">{stat.change}</span>}
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Последние заказы</h3>
          <span className="text-xs text-gray-400">Сегодня</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-5 py-3 font-medium">Номер</th>
                <th className="px-5 py-3 font-medium">Клиент</th>
                <th className="px-5 py-3 font-medium">Сумма</th>
                <th className="px-5 py-3 font-medium">Статус</th>
                <th className="px-5 py-3 font-medium">Дата</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium">{order.number}</td>
                  <td className="px-5 py-3 text-gray-500">{order.customer}</td>
                  <td className="px-5 py-3 font-medium">{order.total}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${statusColors[order.status]}`}>{statusLabels[order.status]}</span>
                  </td>
                  <td className="px-5 py-3 text-gray-500">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
