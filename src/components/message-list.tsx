"use client"

import { useEffect, useRef } from "react"
import type { Message, User } from "@/lib/mock-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn, formatDistanceToNow } from "@/lib/utils"
import { FileIcon, ImageIcon } from "lucide-react"

interface MessageListProps {
  messages: Message[]
  users: User[]
  currentUserId: string
}

export function MessageList({ messages, users, currentUserId }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const getUserById = (id: string) => {
    return users.find((user) => user.id === id)
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => {
        const isCurrentUser = message.senderId === currentUserId
        const sender = getUserById(message.senderId)

        return (
          <div key={message.id} className={cn("flex", isCurrentUser ? "justify-end" : "justify-start")}>
            <div className="flex max-w-[80%]">
              {!isCurrentUser && (
                <Avatar className="h-8 w-8 mr-2 mt-1">
                  <AvatarImage src={sender?.avatar} alt={sender?.name} />
                  <AvatarFallback>{sender?.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              )}

              <div>
                <div
                  className={cn("rounded-lg p-3", isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted")}
                >
                  {message.content}
                </div>

                {message.media && message.media.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {message.media.map((item, index) => (
                      <div key={index}>
                        {item.type === "image" ? (
                          <div className="relative rounded-lg overflow-hidden">
                            <img
                              src={item.url || "/placeholder.svg"}
                              alt={item.name || "Image"}
                              className="max-w-full h-auto rounded-lg"
                            />
                          </div>
                        ) : (
                          <div className="flex items-center p-2 rounded-lg bg-muted">
                            {item.type === "file" ? (
                              <FileIcon className="h-5 w-5 mr-2" />
                            ) : (
                              <ImageIcon className="h-5 w-5 mr-2" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{item.name}</p>
                              {item.size && (
                                <p className="text-xs text-muted-foreground">
                                  {(item.size / 1024 / 1024).toFixed(1)} MB
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className={cn("text-xs text-muted-foreground mt-1", isCurrentUser ? "text-right" : "text-left")}>
                  {formatDistanceToNow(new Date(message.timestamp))}
                </div>
              </div>
            </div>
          </div>
        )
      })}
      <div ref={messagesEndRef} />
    </div>
  )
}

