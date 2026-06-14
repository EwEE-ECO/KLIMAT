import type { Metadata } from "next"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { SectionTitle } from "@/components/ui/SectionTitle"

export const metadata: Metadata = {
  title: "Контакты",
  description: "Контакты магазина климатической техники КвадроКлимат в Краснодаре. Адрес: Ростовское шоссе, 30/7, телефон, email, схема проезда.",
}

export default function ContactsPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container-main">
        <SectionTitle tag="Контакты" title="Как нас найти" description="Будем рады видеть вас в нашем офисе или ответим на любые вопросы онлайн" />

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-brand-500 text-white flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Адрес</h3>
                <p className="text-gray-500">г. Краснодар, ул. Ростовское шоссе, д. 30/7, кор.2<br />ЖК «Лучший»</p>
              </div>
            </div>

            <a href="tel:+79181638377" className="block p-6 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-4 hover:bg-brand-50 transition-colors group">
              <div className="w-14 h-14 rounded-xl bg-brand-500 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Телефон / WhatsApp</h3>
                <p className="text-xl font-bold text-brand-500">+7 (918) 163-83-77</p>
                <p className="text-xs text-gray-400 mt-1">Пн-Пт 09-18, Сб 09-15</p>
              </div>
            </a>

            <a href="mailto:info@kvadroklimat.ru" className="block p-6 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-4 hover:bg-brand-50 transition-colors group">
              <div className="w-14 h-14 rounded-xl bg-brand-500 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                <p className="text-lg font-medium text-brand-500">info@kvadroklimat.ru</p>
              </div>
            </a>

            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-brand-500 text-white flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Режим работы</h3>
                <p className="text-gray-500">Пн-Пт: 09-18<br />Сб: 09-15<br />Вс: выходной</p>
              </div>
            </div>

            <div className="flex gap-3">
              <a href="https://wa.me/79181638377" className="flex-1 p-4 rounded-2xl bg-green-50 border border-green-100 text-center hover:bg-green-100 transition-colors">
                <svg className="w-6 h-6 text-green-600 mx-auto mb-1" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <span className="text-sm font-medium text-green-700">WhatsApp</span>
              </a>
              <a href="https://t.me/kvadroklimat" className="flex-1 p-4 rounded-2xl bg-sky-50 border border-sky-100 text-center hover:bg-sky-100 transition-colors">
                <Send className="w-6 h-6 text-sky-600 mx-auto mb-1" />
                <span className="text-sm font-medium text-sky-700">Telegram</span>
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Обратная связь</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Ваше имя" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
                <input type="tel" placeholder="Телефон" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
                <textarea placeholder="Ваше сообщение" rows={4} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none" />
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-400" />
                  <span className="text-xs text-gray-500">Согласен на обработку персональных данных</span>
                </label>
                <Button variant="primary" size="lg" className="w-full">Отправить</Button>
              </form>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-100 h-[350px]">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=39.000304%2C45.100746&z=16&pt=39.000304%2C45.100746&l=map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Яндекс.Карта — офис КвадроКлимат"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
