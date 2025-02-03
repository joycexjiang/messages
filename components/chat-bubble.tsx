import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface ChatBubbleProps {
  children: ReactNode
  isCurrentUser?: boolean
  className?: string
}

export function ChatBubble({ children, isCurrentUser, className }: ChatBubbleProps) {
  return (
    <div
      className={cn(
        "relative max-w-lg rounded-3xl px-4 py-2 text-sm min-h-[38px] min-w-[69px] flex align-middle items-center",
        isCurrentUser
          ? "bg-blue-500 text-white animate-slide-from-input"
          : "bg-[var(--Fill-Primary,rgba(0,0,0,0.08))] text-gray-900 animate-slide-from-bottom",
        className
      )}
    >
      {children}
    </div>
  )
} 