import type { Metadata } from "next"
import Image from "next/image"
import { Shield, Award, Users, Building2, Target, Leaf, Heart, Phone, Mail, Clock } from "lucide-react"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { BrandsMarquee } from "@/components/sections/BrandsMarquee"

export const metadata: Metadata = {
  title: "О компании",
  description: "КвадроКлимат — продажа, установка и обслуживание климатической техники в Краснодаре и Краснодарском крае.",
}

export default function AboutPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container-main">
        <SectionTitle tag="О компании" title="КвадроКлимат" description="Продажа, установка и обслуживание климатической техники" />

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
            <p>«КвадроКлимат» — молодая, но опытная команда специалистов, которая предоставляет комплекс услуг по продаже, установке и обслуживанию климатической техники.</p>
            <p>«КвадроКлимат» работает по всей территории Краснодарского края. Наши специалисты могут выехать на монтаж или для проведения сервисных работ в любой, даже самый отдаленный населенный пункт нашего края. При необходимости поможем и соседям :)</p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
            <Image src="https://kvadroklimat.ru/upload/iblock/44a/dx49e4o0tlju698litgpkcn56k70qomv.jpg" alt="О компании" fill className="object-cover" sizes="50vw" />
          </div>
        </div>

        <div className="bg-brand-50 rounded-3xl p-8 md:p-12 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-brand-500" />
            <h3 className="text-2xl font-bold text-gray-900">Наша цель</h3>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
            Наша цель — повысить качество жизни наших клиентов, создавая комфортный микроклимат в их домах и на работе. Мы продаем только качественное оборудование и профессионально его устанавливаем и обслуживаем. Мы делаем вашу жизнь приятнее. В свою очередь, клиенты помогают нам расти и занимать лидирующие позиции по уровню продаж, а также обеспечивать рост нашего бизнеса.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-10">Почему мы</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-brand-500 flex items-center justify-center mx-auto mb-5">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">Качество и доступность</h4>
              <p className="text-gray-600">Качественные товары по доступным ценам. Мы работаем только с надежными поставщиками климатической техники и выбираем только то оборудование, которое отвечает запросам наших клиентов.</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-brand-500 flex items-center justify-center mx-auto mb-5">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">Ответственность</h4>
              <p className="text-gray-600">Наше кредо — ответственность и обязательность. Считаем это важнейшими качествами. Делаем все в срок и очень качественно. За нами не придется переделывать и исправлять, потому что мы делаем, как для себя!</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-brand-500 flex items-center justify-center mx-auto mb-5">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">Экологичность</h4>
              <p className="text-gray-600">Мы за экологичность. Бережем наш край, нашу уникальную природу.</p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Building2, stat: "2014", label: "Год основания" },
            { icon: Award, stat: "40+", label: "Брендов-партнёров" },
            { icon: Users, stat: "500+", label: "Выполненных проектов" },
            { icon: Shield, stat: "5 лет", label: "Гарантия на оборудование" },
          ].map((item) => (
            <div key={item.label} className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <item.icon className="w-8 h-8 text-brand-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{item.stat}</p>
              <p className="text-sm text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">Сертификаты</h3>
          <p className="text-gray-500 text-center mb-10 max-w-xl mx-auto">Официальные документы, подтверждающие качество нашей работы</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm group cursor-pointer">
              <div className="aspect-[3/4] bg-gray-50 relative overflow-hidden">
                <img src="/certificates/cert-1.jpg" alt="Сертификат ООО EUROHOFF" className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-gray-900">Сертификат ООО «EUROHOFF»</p>
                <p className="text-xs text-gray-500 mt-1">Подтверждение партнёрства</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm group cursor-pointer">
              <div className="aspect-[3/4] bg-gray-50 relative overflow-hidden">
                <img src="/certificates/cert-2.jpg" alt="Сертификат ООО Denko" className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-gray-900">Сертификат ООО «Denko»</p>
                <p className="text-xs text-gray-500 mt-1">Подтверждение партнёрства</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm group cursor-pointer">
              <div className="aspect-[3/4] bg-gray-50 relative overflow-hidden">
                <img src="/certificates/cert-3.jpg" alt="Сертификат ООО Dahatsu" className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-gray-900">Сертификат ООО «Dahatsu»</p>
                <p className="text-xs text-gray-500 mt-1">Подтверждение партнёрства</p>
              </div>
            </div>
          </div>
        </div>

        <BrandsMarquee />

        <div className="bg-brand-900 rounded-3xl p-8 md:p-12 text-white">
          <h3 className="text-2xl font-bold mb-8">Реквизиты компании</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <p className="text-sm text-white/60 mb-0.5">Телефон / WhatsApp</p>
                  <a href="tel:+79181638377" className="text-white font-medium hover:text-brand-400 transition-colors">+7 (918) 163-83-77</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <p className="text-sm text-white/60 mb-0.5">Эл. почта</p>
                  <a href="mailto:info@kvadroklimat.ru" className="text-white font-medium hover:text-brand-400 transition-colors">info@kvadroklimat.ru</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <p className="text-sm text-white/60 mb-0.5">Режим работы</p>
                  <p className="text-white font-medium">Пн-Пт 09-18, Сб 09-15, Вс — выходной</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 space-y-3 text-sm">
              <p><span className="text-white/60">ИНН:</span> <span className="text-white font-medium">235300220152</span></p>
              <p><span className="text-white/60">р/с:</span> <span className="text-white font-medium">40802810530160000611</span></p>
              <p><span className="text-white/60">БИК:</span> <span className="text-white font-medium">040349602</span></p>
              <p><span className="text-white/60">к/с:</span> <span className="text-white font-medium">30101810100000000602</span></p>
              <p className="text-white/60 text-xs pt-2 border-t border-white/10">КРАСНОДАРСКОЕ ОТДЕЛЕНИЕ N8619 ПАО СБЕРБАНК</p>
              <p className="text-white/60 text-xs pt-2 border-t border-white/10">Индивидуальный предприниматель Попов Виталий Николаевич</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
