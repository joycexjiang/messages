import { ArrowUpIcon } from "lucide-react"

interface ChatInputProps {
  input: string
  setInput: (input: string) => void
  handleSubmit: (e: React.FormEvent) => void
}

export function ChatInput({ input, setInput, handleSubmit }: ChatInputProps) {
  return (
    <form onSubmit={handleSubmit} className="px-4 py-2">
      <div className="flex items-center w-full rounded-full bg-white pl-4 pr-2 py-2 my-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Chat"
          className="w-full bg-transparent text-sm focus:outline-none"
        />
        <button
          type="submit"
          className="ml-auto rounded-full p-1 text-black hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
          style={{ background: "var(--Fills-Tertiary, rgba(120, 120, 128, 0.12))" }}
          disabled={!input.trim()}
        >
          <ArrowUpIcon size={20} />
        </button>
      </div>
    </form>
  )
} 