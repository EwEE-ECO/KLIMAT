import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/Button"

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-8xl md:text-9xl font-bold text-brand-500 leading-none">404</h1>
        <p className="text-xl md:text-2xl font-semibold text-gray-900 mt-4">Страница не найдена</p>
        <p className="text-gray-500 mt-2 mb-8">Возможно, страница была удалена или вы ошиблись в адресе</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/"><Button variant="primary" size="lg">На главную</Button></Link>
          <Link href="/catalog"><Button variant="outline" size="lg">Перейти в каталог</Button></Link>
        </div>
      </div>
    </div>
  )
}
