"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { Chat, mockApi } from "@/lib/mock-chat-data"
import { formatDistanceToNow } from "date-fns"

export function ChatList() {
  const [chats, setChats] = useState<Chat[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data = await mockApi.getChats()
        setChats(data)
      } catch (error) {
        console.error("Failed to fetch chats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchChats()
  }, [])

  const handleChatClick = (chatId: string) => {
    router.push(`/chats/${chatId}`)
  }

  if (loading) {
    return <div className="p-4">Loading chats...</div>
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold">Messages</h2>
        <Button size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0">
          <PlusIcon className="h-5 w-5" />
          <span className="sr-only">New Chat</span>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center p-4 hover:bg-muted cursor-pointer border-b"
            onClick={() => handleChatClick(chat.id)}
          >
            <Avatar className="h-10 w-10 mr-4">
              <AvatarImage src={chat.avatar} alt={chat.name} />
              <AvatarFallback>{chat.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h3 className="font-medium truncate">{chat.name}</h3>
                {chat.lastMessage && (
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(chat.lastMessage.timestamp))}
                  </span>
                )}
              </div>

              {chat.lastMessage && (
                <p className="text-sm text-muted-foreground truncate">
                  {chat.lastMessage.media && chat.lastMessage.media.length > 0
                    ? `${chat.lastMessage.media.length} media ${
                        chat.lastMessage.media.length === 1 ? "file" : "files"
                      }${chat.lastMessage.content ? `: ${chat.lastMessage.content}` : ""}`
                    : chat.lastMessage.content}
                </p>
              )}
            </div>

            {chat.unreadCount > 0 && (
              <Badge variant="default" className="ml-2 rounded-full">
                {chat.unreadCount}
              </Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

