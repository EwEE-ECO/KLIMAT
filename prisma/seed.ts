import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const adminEmail = "admin@kvadroklimat.ru"
  const existing = await prisma.user.findUnique({ where: { email: adminEmail } })
  if (!existing) {
    const hashedPassword = await bcrypt.hash("admin123", 10)
    await prisma.user.create({
      data: { email: adminEmail, name: "Admin", password: hashedPassword, role: "ADMIN" },
    })
    console.log("Admin user created: admin@kvadroklimat.ru / admin123")
  }

  const categories = [
    { name: "Настенные сплит-системы", slug: "nastenniy", description: "Классические настенные кондиционеры для квартир и офисов", order: 1 },
    { name: "Кассетные кондиционеры", slug: "kassetniy", description: "Для помещений с подвесным потолком", order: 2 },
    { name: "Канальные кондиционеры", slug: "kanalniy", description: "Скрытый монтаж за подвесным потолком", order: 3 },
    { name: "Мульти-сплит системы", slug: "multisplit", description: "Один наружный блок + несколько внутренних", order: 4 },
    { name: "Мобильные кондиционеры", slug: "mobilniy", description: "Переносные кондиционеры без монтажа", order: 5 },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({ where: { slug: cat.slug }, update: cat, create: cat })
  }

  const products = [
    { name: "Сплит-система DENKO DSX-12", slug: "denko-dsx-12", article: "DSX-12", price: 34990, oldPrice: 42990, brand: "DENKO", isHit: true, categorySlug: "nastenniy" },
    { name: "Сплит-система DAHATSU DN-18", slug: "dahatsu-dn-18", article: "DN-18", price: 42990, oldPrice: 51990, brand: "DAHATSU", isHit: true, categorySlug: "nastenniy" },
    { name: "Сплит-система ROVEX RS-09", slug: "rovex-rs-09", article: "RS-09", price: 25990, brand: "ROVEX", isHit: true, categorySlug: "nastenniy" },
    { name: "Кондиционер Ballu BSW-12HN1", slug: "ballu-bsw-12hn1", article: "BSW-12HN1", price: 38990, oldPrice: 45990, brand: "Ballu", isHit: true, categorySlug: "nastenniy" },
    { name: "Сплит-система Daikin FTXB-N", slug: "daikin-ftxb-n", article: "FTXB-N", price: 58990, brand: "Daikin", categorySlug: "nastenniy" },
    { name: "Mitsubishi Electric MSZ-LN", slug: "mitsubishi-msz-ln", article: "MSZ-LN", price: 79990, brand: "Mitsubishi Electric", categorySlug: "nastenniy" },
  ]

  const cats = await prisma.category.findMany()
  const categoryIds = new Map(cats.map((c) => [c.slug, c.id]))

  for (const p of products) {
    const categoryId = categoryIds.get(p.categorySlug)
    if (categoryId) {
      await prisma.product.upsert({
        where: { slug: p.slug },
        update: { categoryId, name: p.name, price: p.price, oldPrice: p.oldPrice, brand: p.brand, isHit: p.isHit, rating: 4.8, reviewCount: Math.floor(Math.random() * 100) + 10 },
        create: { categoryId, name: p.name, slug: p.slug, article: p.article, price: p.price, oldPrice: p.oldPrice, brand: p.brand, isHit: p.isHit, images: [], rating: 4.8, reviewCount: Math.floor(Math.random() * 100) + 10, inStock: true },
      })
    }
  }

  const services = [
    { name: "Монтаж сплит-системы до 12 BTU", slug: "montazh-do-12", price: 5000, category: "Монтаж", order: 1 },
    { name: "Монтаж сплит-системы 18-24 BTU", slug: "montazh-18-24", price: 7000, category: "Монтаж", order: 2 },
    { name: "Чистка кондиционера", slug: "chistka", price: 1500, category: "Обслуживание", order: 3 },
    { name: "Дозаправка хладагентом", slug: "dozapravka", price: 2000, category: "Обслуживание", order: 4 },
  ]

  for (const s of services) {
    await prisma.service.upsert({ where: { slug: s.slug }, update: s, create: s })
  }

  console.log("Seed completed successfully!")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
