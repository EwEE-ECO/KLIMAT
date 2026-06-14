import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductDetail } from "./ProductDetail"

const products = {
  "denko-dsx-12": {
    id: "1", name: "Сплит-система DENKO DSX-12", slug: "denko-dsx-12",
    price: 34990, oldPrice: 42990, images: [], rating: 4.8, reviewCount: 124,
    brand: "DENKO", isHit: true, article: "DSX-12-2024",
    description: "Настенная сплит-система DENKO DSX-12 — оптимальное решение для квартиры или небольшого офиса площадью до 35 м². Инверторный компрессор обеспечивает экономичное энергопотребление, низкий уровень шума и быстрый выход на заданную температуру. Современный дизайн, пульт ДУ в комплекте, функция авторестарта.",
    specs: { "Мощность охлаждения": "12 000 BTU (3.5 кВт)", "Мощность обогрева": "13 000 BTU (3.8 кВт)", "Площадь помещения": "до 35 м²", "Уровень шума": "22-42 дБ", "Класс энергоэффективности": "A++", "Хладагент": "R32", "Тип": "Настенная сплит-система", "Цвет": "Белый", "Вес": "9.5 кг (внутренний блок)" },
  },
}

export function generateStaticParams() {
  return Object.keys(products).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = products[slug as keyof typeof products]
  if (!product) return { title: "Товар не найден" }
  return { title: `${product.name} — купить в Краснодаре`, description: `${product.brand} ${product.name} по цене ${product.price} ₽. Характеристики, фото, отзывы. Доставка и монтаж.`, openGraph: { title: product.name, description: `${product.name} — цена ${product.price} ₽` } }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = products[slug as keyof typeof products]
  if (!product) notFound()
  return <ProductDetail product={product} />
}
