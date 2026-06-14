import Link from "next/link"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-brand-900 text-gray-300">
      <div className="container-main py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-brand-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <div>
                <span className="text-lg font-bold text-white leading-tight">КвадроКлимат</span>
                <span className="block text-xs text-gray-400 leading-tight">Климатическая техника</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">Продажа и монтаж кондиционеров в Краснодаре. Более 40 брендов, 10 лет опыта, 500+ проектов.</p>
            <div className="flex gap-3">
              <a href="https://wa.me/79181638377" className="w-9 h-9 rounded-lg bg-brand-800 flex items-center justify-center hover:bg-brand-500 hover:text-white transition-colors" aria-label="WhatsApp">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href="https://t.me/kvadroklimat" className="w-9 h-9 rounded-lg bg-brand-800 flex items-center justify-center hover:bg-brand-500 hover:text-white transition-colors" aria-label="Telegram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Каталог</h3>
            <ul className="space-y-2.5">
              <li><Link href="/catalog?type=nastenniy" className="text-sm text-gray-400 hover:text-brand-500 transition-colors">Настенные сплит-системы</Link></li>
              <li><Link href="/catalog?type=kassetniy" className="text-sm text-gray-400 hover:text-brand-500 transition-colors">Кассетные кондиционеры</Link></li>
              <li><Link href="/catalog?type=kanalniy" className="text-sm text-gray-400 hover:text-brand-500 transition-colors">Канальные кондиционеры</Link></li>
              <li><Link href="/catalog?type=multisplit" className="text-sm text-gray-400 hover:text-brand-500 transition-colors">Мульти-сплит системы</Link></li>
              <li><Link href="/catalog?type=mobilniy" className="text-sm text-gray-400 hover:text-brand-500 transition-colors">Мобильные кондиционеры</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Информация</h3>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-sm text-gray-400 hover:text-brand-500 transition-colors">О компании</Link></li>
              <li><Link href="/services" className="text-sm text-gray-400 hover:text-brand-500 transition-colors">Услуги и цены</Link></li>
              <li><Link href="/blog" className="text-sm text-gray-400 hover:text-brand-500 transition-colors">Блог</Link></li>
              <li><Link href="/contacts" className="text-sm text-gray-400 hover:text-brand-500 transition-colors">Контакты</Link></li>
              <li><Link href="/privacy" className="text-sm text-gray-400 hover:text-brand-500 transition-colors">Политика конфиденциальности</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-brand-500 shrink-0" />
                <span className="text-sm text-gray-400">г. Краснодар, ул. Ростовское шоссе, д. 30/7</span>
              </li>
              <li>
                <a href="tel:+79181638377" className="flex items-center gap-3 text-sm text-gray-400 hover:text-brand-500 transition-colors">
                  <Phone className="w-4 h-4 text-brand-500 shrink-0" />+7 (918) 163-83-77
                </a>
              </li>
              <li>
                <a href="mailto:info@kvadroklimat.ru" className="flex items-center gap-3 text-sm text-gray-400 hover:text-brand-500 transition-colors">
                  <Mail className="w-4 h-4 text-brand-500 shrink-0" />info@kvadroklimat.ru
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-brand-500 shrink-0" />
                <span className="text-sm text-gray-400">Пн-Пт: 9:00–19:00<br />Сб-Вс: 10:00–17:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-brand-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2024 КвадроКлимат. ИП Попов В.Н. Все права защищены.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-brand-500 transition-colors">Политика конфиденциальности</Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-brand-500 transition-colors">Обработка персональных данных</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
