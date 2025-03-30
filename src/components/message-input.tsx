"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { PaperclipIcon, SendIcon, XIcon } from "lucide-react"
import { FileIcon } from "lucide-react" // Import FileIcon

interface MessageInputProps {
  onSendMessage: (content: string, media?: any[]) => void
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState("")
  const [media, setMedia] = useState<{ type: string; file: File; preview: string }[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (message.trim() || media.length > 0) {
      const mediaItems = media.map((item) => ({
        type: item.type.startsWith("image/") ? "image" : "file",
        url: item.preview,
        name: item.file.name,
        size: item.file.size,
      }))

      onSendMessage(message, mediaItems.length > 0 ? mediaItems : undefined)
      setMessage("")
      setMedia([])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file) => {
        const type = file.type
        const preview = type.startsWith("image/") ? URL.createObjectURL(file) : ""

        return { type, file, preview }
      })

      setMedia([...media, ...newFiles])
    }
  }

  const removeMedia = (index: number) => {
    const newMedia = [...media]
    if (newMedia[index].preview) {
      URL.revokeObjectURL(newMedia[index].preview)
    }
    newMedia.splice(index, 1)
    setMedia(newMedia)
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      {media.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {media.map((item, index) => (
            <div key={index} className="relative">
              {item.type.startsWith("image/") ? (
                <div className="relative h-20 w-20 rounded-md overflow-hidden">
                  <img
                    src={item.preview || "/placeholder.svg"}
                    alt={item.file.name}
                    className="h-full w-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-0 right-0 h-5 w-5 rounded-full"
                    onClick={() => removeMedia(index)}
                  >
                    <XIcon className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center p-2 bg-muted rounded-md">
                  <FileIcon className="h-4 w-4 mr-2" />
                  <span className="text-xs truncate max-w-[100px]">{item.file.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 ml-1"
                    onClick={() => removeMedia(index)}
                  >
                    <XIcon className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex items-end gap-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="min-h-[60px] max-h-[120px] resize-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSubmit(e)
            }
          }}
        />

        <div className="flex flex-col gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => fileInputRef.current?.click()}
          >
            <PaperclipIcon className="h-5 w-5" />
            <span className="sr-only">Attach file</span>
          </Button>

          <Button type="submit" size="icon" className="rounded-full">
            <SendIcon className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>

        <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleFileChange} />
      </div>
    </form>
  )
}

