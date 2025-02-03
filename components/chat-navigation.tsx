import { cn } from "@/lib/utils"
import { users } from "@/lib/data"

interface ChatNavigationProps {
  activeChat: string
  setActiveChat: (chatId: string) => void
}

export function ChatNavigation({ activeChat, setActiveChat }: ChatNavigationProps) {
  return (
    <nav className="flex items-center gap-2 px-4 py-2">
      <button
        onClick={() => setActiveChat("group")}
        className={cn(
          "rounded-full px-4 py-1.5 text-sm font-medium",
          activeChat === "group" 
            ? "bg-gray-100 shadow-[inset_0px_0.5px_1.5px_0px_rgba(0,0,0,0.06),0px_0.5px_0px_0px_rgba(255,255,255,0.04)] hover:bg-[rgba(0,0,0,0.04)]" 
            : "hover:bg-[rgba(0,0,0,0.04)]",
        )}
        style={activeChat === "group" ? { background: "var(--Fill-Secondary, rgba(0, 0, 0, 0.06))" } : {}}
      >
        Meeting Room
      </button>
      {users.map((user) => (
        <button
          key={user.id}
          onClick={() => setActiveChat(user.id)}
          className={cn(
            "group relative flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-gray-500",
            activeChat === user.id ? "bg-gray-100 hover:bg-[rgba(0,0,0,0.04)]" : "hover:bg-[rgba(0,0,0,0.04)]",
          )}
          style={activeChat === user.id ? { background: "var(--Fill-Secondary, rgba(0, 0, 0, 0.06))" } : {}}
        >
          <span className="relative flex h-2 w-2">
            <span
              className={cn(
                "absolute inline-flex h-full w-full rounded-full opacity-75",
                user.isOnline ? "bg-green-500" : "bg-gray-400",
              )}
            />
            <span
              className={cn(
                "relative inline-flex h-2 w-2 rounded-full",
                user.isOnline ? "bg-green-500" : "bg-gray-400",
              )}
            />
          </span>
          {user.name}
        </button>
      ))}
    </nav>
  )
} 