import { cn } from "@/lib/utils"

interface SectionTitleProps {
  tag?: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}

export function SectionTitle({ tag, title, description, align = "center", className }: SectionTitleProps) {
  return (
    <div className={cn("max-w-2xl mb-10 md:mb-14", align === "center" ? "mx-auto text-center" : "", className)}>
      {tag && <span className="inline-block px-3 py-1 text-xs font-semibold text-brand-500 bg-brand-50 rounded-full mb-3">{tag}</span>}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{title}</h2>
      {description && <p className="mt-4 text-base md:text-lg text-gray-500 leading-relaxed">{description}</p>}
    </div>
  )
}
