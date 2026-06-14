import { forwardRef, type ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "primary", size = "md", children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        {
          "bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-400 shadow-sm hover:shadow-md": variant === "primary",
          "bg-brand-400 text-white hover:bg-brand-500 focus:ring-brand-300 shadow-sm hover:shadow-md": variant === "secondary",
          "border-2 border-brand-500 text-brand-500 hover:bg-brand-50 focus:ring-brand-400": variant === "outline",
          "text-gray-600 hover:text-brand-500 hover:bg-brand-50 focus:ring-brand-400": variant === "ghost",
        },
        {
          "px-3 py-1.5 text-sm": size === "sm",
          "px-5 py-2.5 text-sm": size === "md",
          "px-8 py-3.5 text-base": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})
Button.displayName = "Button"
