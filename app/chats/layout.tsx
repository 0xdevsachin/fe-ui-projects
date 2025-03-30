import type React from "react"
import { ModeToggle } from "@/components/mode-toggle"

export default function ChatsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <div className="absolute top-4 right-4 z-10">
        <ModeToggle />
      </div>
      {children}
    </div>
  )
}

