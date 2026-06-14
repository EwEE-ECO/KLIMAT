import { ProductCard } from "@/components/ui/ProductCard"
import { SectionTitle } from "@/components/ui/SectionTitle"

const hits = [
  { id: "1", name: "Сплит-система DENKO DSX-12", slug: "denko-dsx-12", price: 34990, oldPrice: 42990, images: [], rating: 4.8, reviewCount: 124, isHit: true, brand: "DENKO" },
  { id: "2", name: "Сплит-система DAHATSU DN-18", slug: "dahatsu-dn-18", price: 42990, oldPrice: 51990, images: [], rating: 4.7, reviewCount: 98, isHit: true, brand: "DAHATSU" },
  { id: "3", name: "Сплит-система ROVEX RS-09", slug: "rovex-rs-09", price: 25990, images: [], rating: 4.6, reviewCount: 76, isHit: true, brand: "ROVEX" },
  { id: "4", name: "Кондиционер Ballu BSW-12HN1", slug: "ballu-bsw-12hn1", price: 38990, oldPrice: 45990, images: [], rating: 4.9, reviewCount: 156, isHit: true, brand: "Ballu" },
  { id: "5", name: "Сплит-система Daikin FTXB-N", slug: "daikin-ftxb-n", price: 58990, images: [], rating: 4.9, reviewCount: 89, isHit: true, brand: "Daikin" },
  { id: "6", name: "Mitsubishi Electric MSZ-LN", slug: "mitsubishi-msz-ln", price: 79990, images: [], rating: 5.0, reviewCount: 67, isHit: true, brand: "Mitsubishi Electric" },
]

export function HitsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-main">
        <SectionTitle tag="Хиты продаж" title="Популярные товары" description="Самые выбираемые модели наших клиентов" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {hits.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
