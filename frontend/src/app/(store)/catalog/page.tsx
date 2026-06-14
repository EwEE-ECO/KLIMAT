import type { Metadata } from "next"
import { CatalogContent } from "./CatalogContent"

export const metadata: Metadata = {
  title: "Каталог кондиционеров",
  description: "Каталог климатической техники в Краснодаре. Кондиционеры, сплит-системы, мульти-сплиты. Более 40 брендов.",
}

export default function CatalogPage() {
  return <CatalogContent />
}
