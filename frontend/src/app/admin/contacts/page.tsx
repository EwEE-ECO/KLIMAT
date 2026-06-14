"use client"

const requests = [
  { name: "Алексей М.", phone: "+7 (918) 111-22-33", message: "Хочу установить кондиционер в спальне 18м²", source: "Сайт", date: "14.06.2024" },
  { name: "Елена К.", phone: "+7 (861) 444-55-66", message: "Нужна консультация по выбору сплит-системы", source: "Сайт", date: "13.06.2024" },
]

export default function AdminContactsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-900">Заявки с форм</h1>

      <div className="space-y-4">
        {requests.map((req, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-gray-100">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-gray-900">{req.name}</p>
                <p className="text-sm text-brand-500">{req.phone}</p>
              </div>
              <span className="text-xs text-gray-400">{req.date}</span>
            </div>
            <p className="text-sm text-gray-600">{req.message}</p>
            <p className="text-xs text-gray-400 mt-2">Источник: {req.source}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
