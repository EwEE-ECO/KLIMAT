import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/Button"

const posts: Record<string, any> = {
  "kak-vybrat-kondicioner": {
    title: "Как выбрать кондиционер для квартиры: полное руководство 2024",
    date: "15.05.2024", category: "Советы", author: "Иван Попов",
    content: `<p>Выбор кондиционера — ответственная задача, от которой зависит комфорт в вашем доме на долгие годы. В этом руководстве мы разберём все ключевые параметры.</p>
    <h2>1. Тип кондиционера</h2>
    <p>Самый популярный вариант — настенная сплит-система. Она подходит для квартир и небольших офисов. Кассетные модели — для помещений с подвесным потолком, канальные — для скрытого монтажа.</p>
    <h2>2. Мощность охлаждения</h2>
    <p>Основной параметр — BTU (британская тепловая единица). Для комнаты 20 м² достаточно 9 000 BTU (2.6 кВт), для 35 м² — 12 000 BTU (3.5 кВт).</p>
    <h2>3. Инвертор vs On/Off</h2>
    <p>Инверторные модели экономичнее на 30-40%, работают тише и точнее поддерживают заданную температуру.</p>
    <h2>4. Бренд</h2>
    <p>Мы рекомендуем: DENKO (лучшее соотношение цена-качество), Daikin и Mitsubishi Electric (премиум), Ballu, ROVEX (бюджетный сегмент).</p>`
  }
}

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = posts[slug]
  if (!post) return { title: "Статья не найдена" }
  return { title: post.title, description: post.excerpt, openGraph: { title: post.title, description: post.excerpt } }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts[slug]
  if (!post) notFound()

  return (
    <div className="py-8 md:py-12">
      <div className="container-main max-w-3xl">
        <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand-500 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Назад к блогу
        </Link>

        <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
          <span className="px-3 py-1 text-xs font-semibold text-accent-400 bg-accent-50 rounded-full">{post.category}</span>
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 5 мин чтения</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-2">{post.title}</h1>
        <p className="text-sm text-gray-400 mb-8">Автор: {post.author}</p>

        <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 mb-4">Нужна помощь с выбором кондиционера?</p>
          <Link href="/contacts"><Button variant="secondary">Связаться с нами</Button></Link>
        </div>
      </div>
    </div>
  )
}
