import type { Message, Chat } from "@/lib/types"
import { ChatBubble } from "./chat-bubble"
import { TypingIndicator } from "./typing-indicator"

interface ChatMessagesProps {
  currentChat: Chat
  isTyping: boolean
  typingUser: string | null
  messagesEndRef: React.RefObject<HTMLDivElement>
  getAvatarContent: (message: Message) => React.ReactNode
}

// Internal helper component for rendering individual chat messages
function ChatMessage({ message, currentChat, getAvatarContent }: { message: Message, currentChat: Chat, getAvatarContent: (message: Message) => React.ReactNode }) {
  return (
    <div className="flex flex-row items-end text-left gap-2 px-4">
      <div className="relative flex h-8 w-8 shrink-0 select-none overflow-hidden rounded-full bg-gray-100 text-center justify-center border items-start">
        {getAvatarContent(message)}
      </div>
      <div className="flex flex-col items-start">
        {(currentChat.type === "group" || message.senderId === "current") && (
          <div className="mb-0.5 ml-3 text-xs text-gray-400">
            {message.senderName}
          </div>
        )}
        <ChatBubble isCurrentUser={message.senderId === "current"}>
          {message.content}
        </ChatBubble>
      </div>
    </div>
  )
}

export function ChatMessages({ currentChat, isTyping, typingUser, messagesEndRef, getAvatarContent }: ChatMessagesProps) {
  return (
    <div className="h-full overflow-y-auto flex flex-col">
      <div className="flex flex-col gap-2 pt-4 mt-auto">
        {currentChat?.messages.length === 0 ? (
          <div className="flex h-full items-center justify-center p-4">
            <p className="text-center text-sm text-gray-500">No messages yet. Start a conversation!</p>
          </div>
        ) : (
          <>
            {currentChat?.messages.map((message) => (
              <ChatMessage key={message.id} message={message} currentChat={currentChat} getAvatarContent={getAvatarContent} />
            ))}
            {isTyping && typingUser && (
              <div className="flex items-end gap-2 px-4">
                <div className="relative flex h-8 w-8 shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-gray-100 text-center">
                  {typingUser[0]}
                </div>
                <div className="flex flex-col items-start">
                  <div className="mb-0.5 ml-3 text-xs text-gray-400">
                    {typingUser}
                  </div>
                  <ChatBubble>
                    <TypingIndicator />
                  </ChatBubble>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
    </div>
  )
} 