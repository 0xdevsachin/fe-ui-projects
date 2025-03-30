"use client"

import { use, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { type LeaderboardEntry, mockApi } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, ArrowLeft, RotateCw, Share2 } from "lucide-react"
import confetti from "canvas-confetti"

export default function ResultsPage({ params }: { params: { categoryId: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { categoryId } = use<{ categoryId: string }>(params as unknown as any)

  const score = Number.parseInt(searchParams.get("score") || "0")
  const time = Number.parseFloat(searchParams.get("time") || "0")
  const playerName = searchParams.get("name") || "Player"

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [playerRank, setPlayerRank] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true)
        const data = await mockApi.getLeaderboard(categoryId)
        setLeaderboard(data)

        const rank = data.findIndex(
          (entry) => entry.playerName === playerName && entry.score === score && Math.abs(entry.timeSpent - time) < 1,
        )

        setPlayerRank(rank !== -1 ? rank + 1 : null)
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [categoryId, playerName, score, time])

  useEffect(() => {
    if (score > 700) {
      const duration = 3 * 1000
      const end = Date.now() + duration
      ;(function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        })

        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      })()
    }
  }, [score])

  const handleShareResult = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "My Quiz Result",
          text: `I scored ${score} points in the ${categoryId} quiz on QuizMaster!`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error))
    } else {
      navigator.clipboard
        .writeText(`I scored ${score} points in the ${categoryId} quiz on QuizMaster! ${window.location.href}`)
        .then(() => alert("Result copied to clipboard!"))
        .catch((error) => console.error("Failed to copy:", error))
    }
  }

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4 md:py-12">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Quiz Results</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Your Score</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-5xl font-bold mb-4">{score}</div>
            {/* <p className="text-muted-foreground mb-6">Time: {formatTime(time)}</p> */}

            {playerRank && playerRank <= 3 && (
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-4 py-2 rounded-full">
                  <Trophy className="h-5 w-5" />
                  <span className="font-medium">
                    {playerRank === 1 ? "1st" : playerRank === 2 ? "2nd" : "3rd"} Place!
                  </span>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3 justify-center">
              <Button onClick={() => router.push(`/quiz/${categoryId}`)} className="gap-2">
                <RotateCw className="h-4 w-4" />
                Play Again
              </Button>
              <Button onClick={handleShareResult} variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share Result
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">Loading leaderboard...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Rank</th>
                      <th className="text-left py-3 px-2">Player</th>
                      <th className="text-right py-3 px-2">Score</th>
                      {/* <th className="text-right py-3 px-2">Time</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.slice(0, 10).map((entry, index) => (
                      <tr
                        key={entry.id}
                        className={`border-b ${
                          entry.playerName === playerName &&
                          entry.score === score &&
                          Math.abs(entry.timeSpent - time) < 1
                            ? "bg-muted font-medium"
                            : ""
                        }`}
                      >
                        <td className="py-3 px-2">
                          {index === 0 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-amber-500 text-white rounded-full">
                              1
                            </span>
                          ) : index === 1 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-300 text-gray-800 rounded-full">
                              2
                            </span>
                          ) : index === 2 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-amber-700 text-white rounded-full">
                              3
                            </span>
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </td>
                        <td className="py-3 px-2">{entry.playerName}</td>
                        <td className="py-3 px-2 text-right">{entry.score}</td>
                        {/* <td className="py-3 px-2 text-right">{formatTime(entry.timeSpent)}</td> */}
                      </tr>
                    ))}

                    {leaderboard.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-6 text-center text-muted-foreground">
                          No scores yet. Be the first to set a record!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

