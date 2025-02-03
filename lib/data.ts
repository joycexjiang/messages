import type { User, Chat } from "./types"
import { generateId } from "./utils"

export const users: User[] = [
  {
    id: "1",
    name: "Sandra",
    isOnline: true,
    avatar: "/images/sandra-avatar.svg",
  },
  { 
    id: "2", 
    name: "Marcus", 
    isOnline: true,
    avatar: "/images/marcus-avatar.svg"
  },
  { id: "3", name: "Jordan", isOnline: true },
  { id: "4", name: "Lou", isOnline: true },
]

const currentUser: User = {
  id: "current",
  name: "Leo",
  isOnline: true,
  avatar: "/images/leo-avatar.svg",
}

// Initial messages
const sandraMessages = [
  {
    id: generateId(),
    senderId: "1",
    senderName: "Sandra",
    content: "Hey, do you have a minute?",
    timestamp: Date.now() - 1000 * 60 * 30,
  },
  {
    id: generateId(),
    senderId: "current",
    senderName: "Leo",
    content: "Sure, what's up?",
    timestamp: Date.now() - 1000 * 60 * 29,
  },
  {
    id: generateId(),
    senderId: "1",
    senderName: "Sandra",
    content: "What's the door code pin? My fingers seem to not remember it today 😅",
    timestamp: Date.now() - 1000 * 60 * 28,
  },
]

const marcusMessages = [
  {
    id: generateId(),
    senderId: "2",
    senderName: "Marcus",
    content: "Good morning! 👋",
    timestamp: Date.now() - 1000 * 60 * 45,
  },
  {
    id: generateId(),
    senderId: "current",
    senderName: "Leo",
    content: "Morning Marcus! How's the project coming along?",
    timestamp: Date.now() - 1000 * 60 * 44,
  },
]

const jordanMessages = [
  {
    id: generateId(),
    senderId: "3",
    senderName: "Jordan",
    content: "Did you get my email about the meeting?",
    timestamp: Date.now() - 1000 * 60 * 120,
  },
]

const groupMessages = [
  {
    id: generateId(),
    senderId: "2",
    senderName: "Marcus",
    content: "Good morning! 👋",
    timestamp: Date.now() - 1000 * 60 * 5,
  },
  {
    id: generateId(),
    senderId: "current",
    senderName: "Leo",
    content: "Morning everyone!",
    timestamp: Date.now() - 1000 * 60 * 4,
  },
  {
    id: generateId(),
    senderId: "1",
    senderName: "Sandra",
    content: "What's the door code pin? My fingers seem to not remember it today 😅",
    timestamp: Date.now() - 1000 * 60 * 1,
  },
]

// Create initial chats
export const initialChats: Chat[] = [
  // Group chat
  {
    id: "group",
    type: "group",
    name: "Meeting Room",
    participants: [...users, currentUser],
    messages: groupMessages,
  },
  // Direct message chats with initial messages
  {
    id: "1",
    type: "direct",
    name: "Sandra",
    participants: [users[0], currentUser],
    messages: sandraMessages,
  },
  {
    id: "2",
    type: "direct",
    name: "Marcus",
    participants: [users[1], currentUser],
    messages: marcusMessages,
  },
  {
    id: "3",
    type: "direct",
    name: "Jordan",
    participants: [users[2], currentUser],
    messages: jordanMessages,
  },
  {
    id: "4",
    type: "direct",
    name: "Lou",
    participants: [users[3], currentUser],
    messages: [],
  },
]

const groupResponses = [
  "Great discussion everyone!",
  "Let's circle back on this later.",
  "Can someone share the meeting notes?",
  "Thanks for bringing this up!",
  "I think we should discuss this in our next sync.",
]

const directResponses = [
  "Thanks for letting me know!",
  "I'll get back to you on that soon.",
  "Good point! Let me think about it.",
  "Sure, that works for me.",
  "Can you provide more details?",
]

export const responses = {
  group: groupResponses,
  direct: directResponses,
}

