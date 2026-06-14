import { Users, Building2, BadgeCheck, Shield } from "lucide-react"
import { SectionTitle } from "@/components/ui/SectionTitle"

const reasons = [
  {
    icon: Building2,
    title: "Официальный дилер",
    desc: "Прямые поставки от производителей. Вся техника сертифицирована.",
    stat: "40+",
    statLabel: "брендов",
  },
  {
    icon: BadgeCheck,
    title: "Гарантия качества",
    desc: "На оборудование до 5 лет, на монтажные работы до 3 лет.",
    stat: "5 лет",
    statLabel: "гарантии",
  },
  {
    icon: Users,
    title: "Опытные специалисты",
    desc: "Сертифицированные инженеры с опытом работы от 5 лет.",
    stat: "50+",
    statLabel: "специалистов",
  },
  {
    icon: Shield,
    title: "Безопасная сделка",
    desc: "Наличный и безналичный расчет. Работаем с НДС и без НДС.",
    stat: "100%",
    statLabel: "довольных клиентов",
  },
]

export function WhyUsSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-main">
        <SectionTitle tag="О нас" title="Почему выбирают нас" description="КвадроКлимат — надежный партнер для вашего комфорта" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason) => (
            <div key={reason.title} className="relative p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-brand-500 text-white flex items-center justify-center mb-5">
                <reason.icon className="w-7 h-7" />
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-brand-500">{reason.stat}</span>
                <span className="block text-xs text-gray-400 uppercase tracking-wider">{reason.statLabel}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{reason.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
