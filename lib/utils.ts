import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Calculate score based on time taken to answer
export function calculateScore(isCorrect: boolean, timeTaken: number): number {
  if (!isCorrect) return 0

  if (timeTaken <= 5) {
    return 100 // Answer within 0-5 seconds
  } else if (timeTaken <= 10) {
    return 75 // Answer within 6-10 seconds
  } else {
    return 50 // Answer within 11-15 seconds
  }
}

// Format time in seconds to MM:SS format
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
}

// Format date to readable format
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

