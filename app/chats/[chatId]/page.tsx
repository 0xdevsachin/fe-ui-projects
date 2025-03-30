"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { MessageList } from "@/components/message-list"
import { MessageInput } from "@/components/message-input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, MoreHorizontalIcon, PhoneIcon, VideoIcon } from "lucide-react"
import { Chat, Message, mockApi, User } from "@/lib/mock-chat-data"

export default function ChatPage() {
  const params = useParams()
  const router = useRouter()
  const chatId = params.chatId as string

  const [chat, setChat] = useState<Chat | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        setLoading(true)
        const chatData = await mockApi.getChat(chatId)
        const messagesData = await mockApi.getMessages(chatId)

        if (chatData) {
          setChat(chatData)
          setUsers(chatData.participants)
          setMessages(messagesData)

          if (chatData.unreadCount > 0) {
            await mockApi.markAsRead(chatId)
          }
        }
      } catch (error) {
        console.error("Failed to fetch chat data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (chatId) {
      fetchChatData()
    }
  }, [chatId])

  const handleSendMessage = async (content: string, media?: any[]) => {
    if (!chatId) return

    try {
      const newMessage = await mockApi.sendMessage(chatId, content, media)
      setMessages((prev) => [...prev, newMessage])
    } catch (error) {
      console.error("Failed to send message:", error)
    }
  }

  const handleBack = () => {
    router.push("/chats")
  }

  if (loading) {
    return <div className="p-4">Loading chat...</div>
  }

  if (!chat) {
    return <div className="p-4">Chat not found</div>
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" className="mr-2 md:hidden" onClick={handleBack}>
          <ArrowLeftIcon className="h-5 w-5" />
        </Button>

        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={chat.avatar} alt={chat.name} />
          <AvatarFallback>{chat.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h2 className="font-medium">{chat.name}</h2>
          {chat.isGroup ? (
            <p className="text-xs text-muted-foreground">{chat.participants.length} members</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              {chat.participants.find((p) => p.id !== "user-1")?.status || "offline"}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="rounded-full">
            <PhoneIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <VideoIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreHorizontalIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <MessageList messages={messages} users={users} currentUserId="user-1" />

      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  )
}

