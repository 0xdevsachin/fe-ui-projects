export interface User {
    id: string
    name: string
    avatar: string
    status: "online" | "offline" | "away"
    lastSeen?: string
  }
  
  export interface Message {
    id: string
    chatId: string
    senderId: string
    content: string
    timestamp: string
    read: boolean
    media?: {
      type: "image" | "video" | "file"
      url: string
      name?: string
      size?: number
    }[]
  }
  
  export interface Chat {
    id: string
    name: string
    isGroup: boolean
    participants: User[]
    lastMessage?: Message
    unreadCount: number
    avatar?: string
  }
  
  // Mock users
  export const users: User[] = [
    {
      id: "user-1",
      name: "You",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
    },
    {
      id: "user-2",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastSeen: new Date().toISOString(),
    },
    {
      id: "user-3",
      name: "Sam Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "away",
      lastSeen: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: "user-4",
      name: "Jordan Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
      lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
      id: "user-5",
      name: "Casey Morgan",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
    },
  ]
  
  // Mock messages
  export const messages: Message[] = [
    {
      id: "msg-1",
      chatId: "chat-1",
      senderId: "user-2",
      content: "Hey, how are you doing?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      read: true,
    },
    {
      id: "msg-2",
      chatId: "chat-1",
      senderId: "user-1",
      content: "I'm good! Just working on that project we discussed.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5).toISOString(),
      read: true,
    },
    {
      id: "msg-3",
      chatId: "chat-1",
      senderId: "user-2",
      content: "Great! Can you share some screenshots?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
      read: true,
    },
    {
      id: "msg-4",
      chatId: "chat-1",
      senderId: "user-1",
      content: "Sure, i will share in few minutes:",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      read: true,
    },
    {
      id: "msg-5",
      chatId: "chat-2",
      senderId: "user-3",
      content: "When is our next team meeting?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      read: true,
    },
    {
      id: "msg-6",
      chatId: "chat-2",
      senderId: "user-4",
      content: "I think it's tomorrow at 2 PM.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4.5).toISOString(),
      read: true,
    },
    {
      id: "msg-7",
      chatId: "chat-2",
      senderId: "user-5",
      content: "Yes, and I've shared the agenda in our shared folder.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      read: true,
      media: [
        {
          type: "file",
          url: "#",
          name: "meeting-agenda.pdf",
          size: 2500000,
        },
      ],
    },
    {
      id: "msg-8",
      chatId: "chat-2",
      senderId: "user-1",
      content: "Thanks! I'll review it before the meeting.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      read: true,
    },
    {
      id: "msg-9",
      chatId: "chat-3",
      senderId: "user-2",
      content: "Did you see the latest design updates?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
      read: false,
    },
  ]
  
  // Mock chats
  export const chats: Chat[] = [
    {
      id: "chat-1",
      name: "Alex Johnson",
      isGroup: false,
      participants: [users[0], users[1]],
      lastMessage: messages[3],
      unreadCount: 0,
      avatar: users[1].avatar,
    },
    {
      id: "chat-2",
      name: "Project Team",
      isGroup: true,
      participants: [users[0], users[2], users[3], users[4]],
      lastMessage: messages[7],
      unreadCount: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "chat-3",
      name: "Design Discussion",
      isGroup: false,
      participants: [users[0], users[1]],
      lastMessage: messages[8],
      unreadCount: 1,
      avatar: users[1].avatar,
    },
  ]
  
  // Mock API functions
  export const mockApi = {
    getChats: () => Promise.resolve(chats),
    getChat: (id: string) => Promise.resolve(chats.find((chat) => chat.id === id)),
    getMessages: (chatId: string) => Promise.resolve(messages.filter((message) => message.chatId === chatId)),
    sendMessage: (chatId: string, content: string, media?: any[]) => {
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        chatId,
        senderId: "user-1",
        content,
        timestamp: new Date().toISOString(),
        read: false,
        media,
      }
      return Promise.resolve(newMessage)
    },
    markAsRead: (chatId: string) => {
      const chat = chats.find((c) => c.id === chatId)
      if (chat) {
        chat.unreadCount = 0
      }
      return Promise.resolve()
    },
  }
  
  