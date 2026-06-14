import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowRight } from "lucide-react"
import { SectionTitle } from "@/components/ui/SectionTitle"

export const metadata: Metadata = {
  title: "Блог о климатической технике",
  description: "Полезные статьи о выборе, монтаже и обслуживании кондиционеров и сплит-систем.",
}

const posts = [
  { title: "Как выбрать кондиционер для квартиры: полное руководство 2024", slug: "kak-vybrat-kondicioner", excerpt: "Подробный гайд: мощность, тип, бренд, инвертор, функции. Всё, что нужно знать перед покупкой.", image: "", date: "15.05.2024", category: "Советы" },
  { title: "Монтаж кондиционера: этапы, стоимость, важные нюансы", slug: "montazh-kondicionera", excerpt: "Из чего складывается цена установки, как подготовить помещение, на что обратить внимание при выборе монтажников.", image: "", date: "10.05.2024", category: "Советы" },
  { title: "Скидка 20% на монтаж при покупке кондиционера", slug: "skidka-montazh", excerpt: "Только в июне — специальное предложение на установку сплит-систем.", image: "", date: "01.06.2024", category: "Акции" },
  { title: "Инвертор или on/off: какой кондиционер выбрать?", slug: "invertor-ili-on-off", excerpt: "Сравнение технологий, экономия электроэнергии, уровень шума и стоимость.", image: "", date: "25.04.2024", category: "Советы" },
  { title: "Обслуживание кондиционера: как продлить срок службы", slug: "obsluzhivanie-kondicionera", excerpt: "Регулярная чистка, проверка давления, сезонное обслуживание — советы специалистов.", image: "", date: "20.04.2024", category: "Советы" },
  { title: "Новинки DENKO 2024: что нового?", slug: "novinki-denko-2024", excerpt: "Обзор новых моделей кондиционеров DENKO — улучшенный дизайн, тише, экономичнее.", image: "", date: "10.04.2024", category: "Новости" },
]

export default function BlogPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container-main">
        <SectionTitle tag="Блог" title="Полезные статьи и новости" description="Советы экспертов, новинки рынка, акции и специальные предложения" />

        <div className="flex flex-wrap gap-2 mb-8">
          {["Все", "Советы", "Новости", "Акции"].map((cat) => (
            <button key={cat} className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${cat === "Все" ? "bg-brand-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{cat}</button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                </div>
                <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold text-white bg-accent-400 rounded-full">{post.category}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  <Calendar className="w-3.5 h-3.5" /> {post.date}
                </div>
                <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-brand-500 transition-colors line-clamp-2">{post.title}</h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-brand-500">
                  Читать <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
