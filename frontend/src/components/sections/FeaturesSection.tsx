import { Shield, Award, Truck, Headphones, Wrench, Clock } from "lucide-react"
import { SectionTitle } from "@/components/ui/SectionTitle"

const features = [
  { icon: Shield, title: "Оригинальная техника", desc: "Только официальная продукция от производителей с полным пакетом документов" },
  { icon: Award, title: "Сертификаты дилеров", desc: "Официальные сертификаты DENKO, Daikin, Mitsubishi Electric, Bosch" },
  { icon: Truck, title: "Бесплатный замер", desc: "Выезд инженера на объект в удобное для вас время, консультация" },
  { icon: Wrench, title: "Профессиональный монтаж", desc: "Сертифицированные монтажники с опытом от 5 лет, гарантия на работы" },
  { icon: Headphones, title: "Поддержка 24/7", desc: "Консультации по выбору, эксплуатации и обслуживанию техники" },
  { icon: Clock, title: "Быстрая установка", desc: "Монтаж за 1 день. Работаем аккуратно, без пыли и грязи" },
]

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-main">
        <SectionTitle tag="Преимущества" title="Почему выбирают нас" description="Более 10 лет мы обеспечиваем комфорт в домах и офисах Краснодара" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="group p-6 md:p-8 rounded-2xl bg-gray-50 hover:bg-brand-50 transition-colors duration-300">
              <div className="w-14 h-14 rounded-xl bg-brand-500 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
