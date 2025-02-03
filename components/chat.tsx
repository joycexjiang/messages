"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { cn, generateId } from "@/lib/utils"
import type { Message, Chat } from "@/lib/types"
import { ArrowUpIcon } from "lucide-react"
import { users, initialChats, responses } from "@/lib/data"
import { TypingIndicator } from "./typing-indicator"
import Image from "next/image"

export function Chat() {
  const [chats, setChats] = useState<Chat[]>(initialChats)
  const [activeChat, setActiveChat] = useState<string>("group")
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [typingUser, setTypingUser] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const currentChat = chats.find((chat) => chat.id === activeChat)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chats, isTyping, input]) // Added input to dependencies

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !currentChat) return

    const newMessage: Message = {
      id: generateId(),
      senderId: "current",
      senderName: "Leo",
      content: input.trim(),
      timestamp: Date.now(),
    }

    setChats((prevChats) =>
      prevChats.map((chat) => (chat.id === activeChat ? { ...chat, messages: [...chat.messages, newMessage] } : chat)),
    )

    setInput("")

    // Simulate typing indicator
    const currentResponses = currentChat.type === "group" ? responses.group : responses.direct
    const responderId =
      currentChat.type === "group"
        ? (currentChat.participants.find((p) => p.id !== "current")?.id ?? "1")
        : currentChat.id

    const responderName =
      currentChat.type === "group" ? users[Math.floor(Math.random() * users.length)].name : currentChat.name

    setIsTyping(true)
    setTypingUser(responderName)

    // Random delay between 4-7 seconds
    const delay = Math.floor(Math.random() * (7000 - 4000) + 4000)

    setTimeout(() => {
      setIsTyping(false)
      setTypingUser(null)

      const botMessage: Message = {
        id: generateId(),
        senderId: responderId,
        senderName: responderName,
        content: currentResponses[Math.floor(Math.random() * currentResponses.length)],
        timestamp: Date.now(),
      }

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === activeChat ? { ...chat, messages: [...chat.messages, botMessage] } : chat,
        ),
      )
    }, delay)
  }

  const getAvatarContent = (message: Message) => {
    if (message.senderId === "current") {
      return message.senderName[0]
    }

    const user = users.find((u) => u.id === message.senderId)
    if (user?.avatar) {
      return (
        <Image
          src={user.avatar || "/placeholder.svg"}
          alt={user.name}
          className="h-full w-full rounded-full object-cover"
          width={32}
          height={32}
        />
      )
    }
    return message.senderName[0]
  }

  return (
    <main className="flex h-svh w-full flex-col bg-white">
      <nav className="flex items-center gap-2 border-b bg-gray-50/50 px-4 py-2">
        <button
          onClick={() => setActiveChat("group")}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium",
            activeChat === "group" ? "bg-gray-100" : "hover:bg-gray-100",
          )}
        >
          Meeting Room
        </button>
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => setActiveChat(user.id)}
            className={cn(
              "group relative flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-gray-500 hover:bg-gray-100",
              activeChat === user.id && "bg-gray-100",
            )}
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
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4 py-4">
          {currentChat?.messages.length === 0 ? (
            <div className="flex h-full items-center justify-center p-4">
              <p className="text-center text-sm text-gray-500">No messages yet. Start a conversation!</p>
            </div>
          ) : (
            <>
              {currentChat?.messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start gap-3 px-4",
                    message.senderId === "current" ? "flex-row-reverse" : "flex-row",
                  )}
                >
                  <div className="relative flex h-8 w-8 shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-gray-100 text-center">
                    {getAvatarContent(message)}
                  </div>
                  <div
                    className={cn(
                      "relative max-w-md rounded-2xl px-4 py-2 text-sm",
                      message.senderId === "current"
                        ? "bg-blue-500 text-white animate-slide-from-input"
                        : "bg-gray-100 text-gray-900 animate-slide-from-bottom",
                    )}
                  >
                    {currentChat.type === "group" && message.senderId !== "current" && (
                      <div className="mb-1 text-xs font-medium text-gray-500">{message.senderName}</div>
                    )}
                    {message.content}
                  </div>
                </div>
              ))}
              {isTyping && typingUser && (
                <div className="flex items-start gap-3 px-4">
                  <div className="relative flex h-8 w-8 shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-gray-100 text-center">
                    {typingUser[0]}
                  </div>
                  <div className="relative max-w-md rounded-2xl px-4 py-2 text-sm bg-gray-100">
                    <TypingIndicator />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="border-t bg-white px-4 py-4">
        <div className="relative flex items-center rounded-lg border bg-white px-4 py-2 shadow-sm">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="min-h-[20px] w-full resize-none bg-transparent text-sm focus:outline-none"
          />
          <button
            type="submit"
            className="h-8 w-8 shrink-0 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
            disabled={!input.trim()}
          >
            <ArrowUpIcon size={16} className="m-auto" />
          </button>
        </div>
      </form>
    </main>
  )
}

