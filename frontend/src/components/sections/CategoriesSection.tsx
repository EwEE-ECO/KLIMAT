import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SectionTitle } from "@/components/ui/SectionTitle"

const categories = [
  { name: "Настенные сплит-системы", slug: "/catalog?type=nastenniy", count: "120+" },
  { name: "Кассетные кондиционеры", slug: "/catalog?type=kassetniy", count: "45+" },
  { name: "Канальные кондиционеры", slug: "/catalog?type=kanalniy", count: "30+" },
  { name: "Мульти-сплит системы", slug: "/catalog?type=multisplit", count: "25+" },
  { name: "Мобильные кондиционеры", slug: "/catalog?type=mobilniy", count: "20+" },
  { name: "Промышленные системы", slug: "/catalog?type=prom", count: "15+" },
]

export function CategoriesSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-main">
        <SectionTitle tag="Каталог" title="Популярные категории" description="Широкий ассортимент климатической техники для любых помещений" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link key={cat.name} href={cat.slug} className="group block p-6 rounded-2xl border border-gray-200 bg-white hover:border-brand-500 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-400">{cat.count} моделей</p>
                  <h3 className="text-lg font-bold text-gray-900 mt-1 group-hover:text-brand-500 transition-colors">{cat.name}</h3>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-brand-500 transition-colors shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
