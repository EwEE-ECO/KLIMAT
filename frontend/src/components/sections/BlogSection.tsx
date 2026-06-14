import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar } from "lucide-react"
import { SectionTitle } from "@/components/ui/SectionTitle"

const posts = [
  {
    title: "Как выбрать кондиционер для квартиры: полное руководство 2024",
    excerpt: "Подробный гайд по выбору сплит-системы: мощность, тип, бренд, дополнительные функции.",
    image: "https://kvadroklimat.ru/upload/iblock/597/pgx2pivkopk9knyb3zzeqbblpepxgekf.jpg",
    date: "15.05.2024",
    category: "Советы",
    slug: "/blog/kak-vybrat-kondicioner",
  },
  {
    title: "Монтаж кондиционера: этапы, стоимость, важные нюансы",
    excerpt: "Из чего складывается цена установки и на что обратить внимание при монтаже.",
    image: "https://kvadroklimat.ru/upload/iblock/409/1z0u3k2tyhe951foiqzay6hugbh7i26s.webp",
    date: "10.05.2024",
    category: "Советы",
    slug: "/blog/montazh-kondicionera",
  },
  {
    title: "Акция: скидка 20% на монтаж при покупке кондиционера",
    excerpt: "Только в июне — специальное предложение на установку сплит-систем.",
    image: "https://kvadroklimat.ru/upload/iblock/d95/zjyr050mfy80krlkqo5bsgy7uiu0bbio.webp",
    date: "01.06.2024",
    category: "Акции",
    slug: "/blog/skidka-montazh",
  },
]

export function BlogSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-main">
        <SectionTitle tag="Блог" title="Полезные статьи" description="Советы по выбору, эксплуатации и обслуживанию климатической техники" />
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={post.slug} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
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
    </section>
  )
}
