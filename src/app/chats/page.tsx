import { ChatList } from "@/components/chat-list"
import { MessageCircleIcon } from "lucide-react"

export default function ChatsPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="w-full max-w-md h-full border-r">
        <ChatList />
      </div>
      <div className="hidden md:flex flex-1 items-center justify-center">
        <div className="text-center">
          <MessageCircleIcon className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">Select a conversation</h3>
          <p className="mt-2 text-sm text-muted-foreground">Choose a chat from the list or start a new conversation</p>
        </div>
      </div>
    </div>
  )
}

