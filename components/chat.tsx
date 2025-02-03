"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import type { Message, Chat } from "@/lib/types"
import { users, initialChats, responses } from "@/lib/data"
import Image from "next/image"
import { ChatNavigation } from "./chat-navigation"
import { ChatMessages } from "./chat-messages"
import { ChatInput } from "./chat-input"
import { generateId } from "@/lib/utils"

// Main Chat Component
export function Chat() {
  const [chats, setChats] = useState<Chat[]>(initialChats)
  const [activeChat, setActiveChat] = useState<string>("group")
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [typingUser, setTypingUser] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const currentChat = chats.find((chat) => chat.id === activeChat)

  // Scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chats, isTyping, input])

  // Handle message submission
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
    simulateTypingResponse(currentChat)
  }

  // Simulate typing indicator and response
  const simulateTypingResponse = (currentChat: Chat) => {
    // For group chats, randomly select a user (excluding current user)
    const availableUsers = currentChat.participants.filter(p => p.id !== "current")
    const randomUser = availableUsers[Math.floor(Math.random() * availableUsers.length)]
    
    const responderId = currentChat.type === "group" ? randomUser.id : currentChat.id
    const responderName = currentChat.type === "group" ? randomUser.name : currentChat.name

    setIsTyping(true)
    setTypingUser(responderName)

    const delay = Math.floor(Math.random() * (3000 - 1000) + 1000)

    setTimeout(() => {
      setIsTyping(false)
      setTypingUser(null)

      const botMessage: Message = {
        id: generateId(),
        senderId: responderId,
        senderName: responderName,
        content: currentChat.type === "group" ? responses.group[Math.floor(Math.random() * responses.group.length)] : responses.direct[Math.floor(Math.random() * responses.direct.length)],
        timestamp: Date.now(),
      }

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === activeChat ? { ...chat, messages: [...chat.messages, botMessage] } : chat,
        ),
      )
    }, delay)
  }

  // Get avatar content for a message
  const getAvatarContent = (message: Message) => {
    if (message.senderId === "current") {
      return (
        <Image
          src="/images/leo-avatar.svg"
          alt="Leo"
          className="h-full w-full rounded-full object-cover"
          width={32}
          height={32}
        />
      )
    }

    const user = users.find((u) => u.id === message.senderId)
    if (user?.avatar) {
      return (
        <Image
          src={user.avatar}
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
    <main className="flex h-svh w-full flex-col bg-[#F2F2F2] overflow-hidden">
      <ChatNavigation activeChat={activeChat} setActiveChat={setActiveChat} />
      <div className="flex-1 min-h-0">
        <ChatMessages
          currentChat={currentChat ?? initialChats[0]}
          isTyping={isTyping}
          typingUser={typingUser}
          messagesEndRef={messagesEndRef}
          getAvatarContent={getAvatarContent}
        />
      </div>
      <ChatInput input={input} setInput={setInput} handleSubmit={handleSubmit} />
    </main>
  )
}

