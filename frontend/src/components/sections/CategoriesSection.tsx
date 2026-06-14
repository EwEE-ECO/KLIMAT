import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SectionTitle } from "@/components/ui/SectionTitle"

const categories = [
  { name: "Настенные сплит-системы", slug: "/catalog?type=nastenniy", image: "https://kvadroklimat.ru/upload/iblock/44a/dx49e4o0tlju698litgpkcn56k70qomv.jpg", count: "120+" },
  { name: "Кассетные кондиционеры", slug: "/catalog?type=kassetniy", image: "https://kvadroklimat.ru/upload/iblock/d13/edto09z6vrzk94k3x0f8stiuil5t3whn.webp", count: "45+" },
  { name: "Канальные кондиционеры", slug: "/catalog?type=kanalniy", image: "https://kvadroklimat.ru/upload/iblock/237/t0jozeyouneuhtmkvmc686msb0cvvwlz.webp", count: "30+" },
  { name: "Мульти-сплит системы", slug: "/catalog?type=multisplit", image: "https://kvadroklimat.ru/upload/iblock/597/pgx2pivkopk9knyb3zzeqbblpepxgekf.jpg", count: "25+" },
  { name: "Мобильные кондиционеры", slug: "/catalog?type=mobilniy", image: "https://kvadroklimat.ru/upload/iblock/409/1z0u3k2tyhe951foiqzay6hugbh7i26s.webp", count: "20+" },
  { name: "Промышленные системы", slug: "/catalog?type=prom", image: "https://kvadroklimat.ru/upload/iblock/d95/zjyr050mfy80krlkqo5bsgy7uiu0bbio.webp", count: "15+" },
]

export function CategoriesSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-main">
        <SectionTitle tag="Каталог" title="Популярные категории" description="Широкий ассортимент климатической техники для любых помещений" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link key={cat.name} href={cat.slug} className="group relative overflow-hidden rounded-2xl aspect-[4/3] block">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-100 to-brand-200" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs font-medium text-white/70">{cat.count} моделей</p>
                <h3 className="text-lg font-bold text-white mt-1">{cat.name}</h3>
              </div>
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
