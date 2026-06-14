"use client"

import { useState } from "react"
import Link from "next/link"
import { SlidersHorizontal, X } from "lucide-react"
import { ProductCard } from "@/components/ui/ProductCard"
import { Button } from "@/components/ui/Button"

const products = [
  { id: "1", name: "Сплит-система DENKO DSX-12", slug: "denko-dsx-12", price: 34990, oldPrice: 42990, images: [], rating: 4.8, reviewCount: 124, isHit: true, brand: "DENKO", shortDesc: "12 000 BTU, настенная" },
  { id: "2", name: "Сплит-система DAHATSU DN-18", slug: "dahatsu-dn-18", price: 42990, oldPrice: 51990, images: [], rating: 4.7, reviewCount: 98, isHit: true, brand: "DAHATSU", shortDesc: "18 000 BTU, настенная" },
  { id: "3", name: "Сплит-система ROVEX RS-09", slug: "rovex-rs-09", price: 25990, images: [], rating: 4.6, reviewCount: 76, isHit: true, brand: "ROVEX", shortDesc: "9 000 BTU, настенная" },
  { id: "4", name: "Кондиционер Ballu BSW-12HN1", slug: "ballu-bsw-12hn1", price: 38990, oldPrice: 45990, images: [], rating: 4.9, reviewCount: 156, isHit: true, brand: "Ballu", shortDesc: "12 000 BTU, инвертор" },
  { id: "5", name: "Сплит-система Daikin FTXB-N", slug: "daikin-ftxb-n", price: 58990, images: [], rating: 4.9, reviewCount: 89, brand: "Daikin", shortDesc: "12 000 BTU, премиум" },
  { id: "6", name: "Mitsubishi Electric MSZ-LN", slug: "mitsubishi-msz-ln", price: 79990, images: [], rating: 5.0, reviewCount: 67, brand: "Mitsubishi Electric", shortDesc: "12 000 BTU, инвертор" },
  { id: "7", name: "Кондиционер LG S09SWP", slug: "lg-s09swp", price: 45990, images: [], rating: 4.7, reviewCount: 112, brand: "LG", shortDesc: "9 000 BTU, инвертор" },
  { id: "8", name: "Сплит-система Samsung SH12", slug: "samsung-sh12", price: 49990, images: [], rating: 4.6, reviewCount: 88, brand: "Samsung", shortDesc: "12 000 BTU, инвертор" },
  { id: "9", name: "Bosch CL8000i", slug: "bosch-cl8000i", price: 54990, oldPrice: 62990, images: [], rating: 4.8, reviewCount: 45, brand: "Bosch", shortDesc: "12 000 BTU, премиум" },
  { id: "10", name: "Сплит-система Toshiba RAS-10", slug: "toshiba-ras-10", price: 42990, images: [], rating: 4.7, reviewCount: 34, brand: "Toshiba", shortDesc: "10 000 BTU, инвертор" },
  { id: "11", name: "DENKO DSX-24 Inverter", slug: "denko-dsx-24", price: 54990, images: [], isNew: true, rating: 4.9, reviewCount: 23, brand: "DENKO", shortDesc: "24 000 BTU, инвертор" },
  { id: "12", name: "DAHATSU DN-24 Pro", slug: "dahatsu-dn-24-pro", price: 62990, images: [], isNew: true, rating: 4.8, reviewCount: 17, brand: "DAHATSU", shortDesc: "24 000 BTU, премиум" },
]

const brands = ["Все", "DENKO", "DAHATSU", "ROVEX", "Ballu", "Daikin", "Mitsubishi Electric", "LG", "Samsung", "Bosch"]
const types = ["Все", "Настенная", "Кассетная", "Канальная", "Мульти-сплит", "Мобильная"]
const roomAreas = ["Любая", "до 20 м²", "20-30 м²", "30-40 м²", "40+ м²"]

export function CatalogContent() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState("Все")
  const [selectedType, setSelectedType] = useState("Все")
  const [selectedArea, setSelectedArea] = useState("Любая")
  const [sort, setSort] = useState("popular")
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })

  const filtered = products.filter((p) => {
    if (selectedBrand !== "Все" && p.brand !== selectedBrand) return false
    return true
  })

  return (
    <div className="container-main py-8 md:py-12">
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-brand-500">Главная</Link>
        <span>/</span>
        <span className="text-gray-600">Каталог</span>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Каталог кондиционеров</h1>
          <p className="text-sm text-gray-500 mt-1">{filtered.length} товаров</p>
        </div>
        <div className="flex items-center gap-3">
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400">
            <option value="popular">По популярности</option>
            <option value="price_asc">Цена: по возрастанию</option>
            <option value="price_desc">Цена: по убыванию</option>
            <option value="name">По названию</option>
            <option value="new">По новизне</option>
          </select>
          <button onClick={() => setFilterOpen(!filterOpen)} className="lg:hidden p-2 text-gray-500 hover:text-brand-500 rounded-lg hover:bg-brand-50 transition-colors">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <aside className={`lg:block space-y-6 ${filterOpen ? "block" : "hidden"}`}>
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Фильтры</h3>
              <button onClick={() => setFilterOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
            </div>

            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Бренд</h4>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <button key={brand} onClick={() => setSelectedBrand(brand)} className={`block w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors ${selectedBrand === brand ? "bg-brand-500 text-white" : "text-gray-600 hover:bg-gray-200"}`}>
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Тип</h4>
                <div className="space-y-2">
                  {types.map((type) => (
                    <button key={type} onClick={() => setSelectedType(type)} className={`block w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors ${selectedType === type ? "bg-brand-500 text-white" : "text-gray-600 hover:bg-gray-200"}`}>
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Площадь помещения</h4>
                <div className="space-y-2">
                  {roomAreas.map((area) => (
                    <button key={area} onClick={() => setSelectedArea(area)} className={`block w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors ${selectedArea === area ? "bg-brand-500 text-white" : "text-gray-600 hover:bg-gray-200"}`}>
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Цена</h4>
                <div className="flex gap-2">
                  <input type="number" placeholder="от" value={priceRange.min} onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })} className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400" />
                  <input type="number" placeholder="до" value={priceRange.max} onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })} className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400" />
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-3">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 flex items-center justify-center gap-2">
            <Button variant="outline" size="sm" disabled>Назад</Button>
            <Button variant="primary" size="sm">1</Button>
            <Button variant="ghost" size="sm">2</Button>
            <Button variant="ghost" size="sm">3</Button>
            <Button variant="ghost" size="sm">Вперёд</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
