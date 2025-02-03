export interface User {
  id: string
  name: string
  isOnline: boolean
  avatar?: string
}

export interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: number
}

export interface Chat {
  id: string
  type: "group" | "direct"
  name: string
  participants: User[]
  messages: Message[]
}

