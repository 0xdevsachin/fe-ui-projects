"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface QuizTimerProps {
  duration: number
  onTimeUp: () => void
  isActive: boolean
}

export function QuizTimer({ duration, onTimeUp, isActive }: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [isPaused, setIsPaused] = useState(!isActive)

  useEffect(() => {
    setIsPaused(!isActive)
  }, [isActive])

  useEffect(() => {
    if (isPaused) return

    if (timeLeft <= 0) {
      onTimeUp()
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 0.1)
    }, 100)

    return () => clearTimeout(timer)
  }, [timeLeft, isPaused, onTimeUp])

  useEffect(() => {
    setTimeLeft(duration)
  }, [duration])

  const progress = (timeLeft / duration) * 100

  const getColorClass = () => {
    if (progress > 60) return "bg-green-500"
    if (progress > 30) return "bg-amber-500"
    return "bg-red-500"
  }

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm">
        <span>Time Remaining</span>
        <span
          className={cn(
            progress <= 30 && "text-red-500 font-medium",
            progress > 30 && progress <= 60 && "text-amber-500",
            progress > 60 && "text-green-500",
          )}
        >
          {Math.ceil(timeLeft)}s
        </span>
      </div>
      <Progress value={progress} className="h-2 w-full" indicatorClassName={cn(getColorClass(), "transition-all")} />
    </div>
  )
}

