"use client"

const orders = [
  { id: "1", number: "KV-001", customer: "Иван Петров", phone: "+7 (861) 123-45-67", total: "34 990 ₽", status: "NEW", date: "14.06.2024" },
  { id: "2", number: "KV-002", customer: "Анна Смирнова", phone: "+7 (918) 765-43-21", total: "45 990 ₽", status: "ACCEPTED", date: "14.06.2024" },
  { id: "3", number: "KV-003", customer: "Сергей Иванов", phone: "+7 (988) 555-66-77", total: "89 990 ₽", status: "INSTALLATION", date: "13.06.2024" },
  { id: "4", number: "KV-004", customer: "Ольга Козлова", phone: "+7 (861) 333-44-55", total: "25 990 ₽", status: "COMPLETED", date: "12.06.2024" },
]

const statusColors: Record<string, string> = { NEW: "bg-blue-100 text-blue-700", ACCEPTED: "bg-yellow-100 text-yellow-700", INSTALLATION: "bg-purple-100 text-purple-700", COMPLETED: "bg-green-100 text-green-700" }
const statusLabels: Record<string, string> = { NEW: "Новый", ACCEPTED: "Принят", INSTALLATION: "Монтаж", COMPLETED: "Завершён" }

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-900">Заказы</h1>

      <div className="flex gap-2">
        {Object.entries(statusLabels).map(([key, label]) => (
          <button key={key} className={`px-3 py-1.5 text-xs font-medium rounded-lg ${key === "NEW" ? "bg-brand-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{label}</button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs uppercase tracking-wider bg-gray-50">
              <th className="px-5 py-3 font-medium">№</th>
              <th className="px-5 py-3 font-medium">Клиент</th>
              <th className="px-5 py-3 font-medium">Телефон</th>
              <th className="px-5 py-3 font-medium">Сумма</th>
              <th className="px-5 py-3 font-medium">Статус</th>
              <th className="px-5 py-3 font-medium">Дата</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-5 py-3 font-medium">{order.number}</td>
                <td className="px-5 py-3">{order.customer}</td>
                <td className="px-5 py-3 text-gray-500">{order.phone}</td>
                <td className="px-5 py-3 font-medium">{order.total}</td>
                <td className="px-5 py-3"><span className={`px-2.5 py-1 text-xs font-medium rounded-full ${statusColors[order.status]}`}>{statusLabels[order.status]}</span></td>
                <td className="px-5 py-3 text-gray-500">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
