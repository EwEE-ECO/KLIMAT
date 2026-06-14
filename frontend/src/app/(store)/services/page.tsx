import type { Metadata } from "next"
import { Wrench, Settings, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { SectionTitle } from "@/components/ui/SectionTitle"

export const metadata: Metadata = {
  title: "Услуги по монтажу и обслуживанию кондиционеров",
  description: "Профессиональный монтаж, обслуживание и ремонт кондиционеров в Краснодаре. Гарантия на работы до 3 лет.",
}

const services = [
  { icon: Wrench, name: "Монтаж сплит-системы", price: "от 5 000 ₽", desc: "Стандартная установка кондиционера: крепление блоков, прокладка трассы, вакуумирование, тестовый пуск.", warranty: "3 года" },
  { icon: Settings, name: "Обслуживание", price: "от 1 500 ₽", desc: "Чистка фильтров, проверка давления, дозаправка хладагентом, диагностика дренажной системы.", warranty: "1 год" },
  { icon: CheckCircle, name: "Ремонт", price: "от 2 000 ₽", desc: "Диагностика неисправностей, замена компрессора, ремонт электронных плат, замена вентиляторов.", warranty: "1 год" },
  { icon: CheckCircle, name: "Демонтаж кондиционера", price: "от 2 500 ₽", desc: "Аккуратный демонтаж с сохранением хладагента для последующей установки на новом месте.", warranty: "—" },
]

const priceList = [
  { name: "Монтаж сплит-системы до 12 BTU", price: "5 000 ₽" },
  { name: "Монтаж сплит-системы 18-24 BTU", price: "7 000 ₽" },
  { name: "Монтаж мульти-сплит системы", price: "8 000-12 000 ₽" },
  { name: "Монтаж кассетного кондиционера", price: "10 000-15 000 ₽" },
  { name: "Чистка кондиционера", price: "1 500-3 000 ₽" },
  { name: "Дозаправка хладагентом", price: "2 000-4 000 ₽" },
  { name: "Диагностика неисправностей", price: "1 000 ₽" },
  { name: "Демонтаж кондиционера", price: "2 500-4 000 ₽" },
]

export default function ServicesPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="container-main">
          <SectionTitle tag="Услуги" title="Монтаж, обслуживание и ремонт" description="Профессиональные услуги по установке и обслуживанию климатической техники" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {services.map((service) => (
              <div key={service.name} className="p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-brand-500 text-white flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{service.name}</h3>
                <p className="text-sm text-gray-500 mb-3 leading-relaxed">{service.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-brand-500">{service.price}</span>
                  {service.warranty !== "—" && <span className="text-xs text-gray-400">Гарантия {service.warranty}</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Прайс-лист на услуги</h3>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {priceList.map((item, i) => (
                <div key={item.name} className={`flex items-center justify-between px-6 py-4 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <span className="text-sm font-semibold text-gray-900">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/contacts">
              <Button variant="secondary" size="lg" className="gap-2">
                Заказать выезд специалиста <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
