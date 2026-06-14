import { Star, Quote } from "lucide-react"
import { SectionTitle } from "@/components/ui/SectionTitle"

const reviews = [
  { name: "Алексей М.", text: "Заказывал сплит-систему DENKO с установкой. Приехали на следующий день, всё сделали аккуратно, даже пылесосом убрались. Рекомендую!", rating: 5, date: "12.05.2024" },
  { name: "Елена К.", text: "Отличный сервис! Помогли с выбором кондиционера для квартиры 45м². Установили за один день. Цены адекватные, спасибо команде!", rating: 5, date: "28.04.2024" },
  { name: "Сергей В.", text: "Поставили Daikin в офис. Работают тихо, охлаждают отлично. Монтажники профессиональные, всё объяснили про эксплуатацию. Буду обращаться ещё.", rating: 5, date: "15.04.2024" },
  { name: "Ольга П.", text: "Выбирала кондиционер для спальни. Менеджер подробно проконсультировал, посоветовал тихую модель. Всё устраивает, спасибо!", rating: 5, date: "02.04.2024" },
]

export function ReviewsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-main">
        <SectionTitle tag="Отзывы" title="Что говорят наши клиенты" description="Реальные отзывы людей, которые уже воспользовались нашими услугами" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div key={review.name} className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
              <Quote className="w-8 h-8 text-brand-200 mb-3" />
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">&quot;{review.text}&quot;</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">{review.name}</span>
                <span className="text-xs text-gray-400">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
