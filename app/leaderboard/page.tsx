"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { type LeaderboardEntry, mockApi, quizData } from "@/lib/mock-data"
import { formatTime, formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Trophy } from "lucide-react"

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true)
        const categoryId = selectedCategory === "all" ? undefined : selectedCategory
        const data = await mockApi.getLeaderboard(categoryId)
        setLeaderboard(data)
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [selectedCategory])

  const getCategoryTitle = (categoryId: string) => {
    const category = quizData.find((c) => c.id === categoryId)
    return category ? category.title : categoryId
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 md:py-12">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          <span className="inline-flex items-center gap-2">
            <Trophy className="h-8 w-8 text-amber-500" />
            Leaderboard
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-[700px] mx-auto">
          See who's topping the charts in our quiz challenges
        </p>
      </div>

      <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="all">All Categories</TabsTrigger>
          {quizData.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.title}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedCategory === "all"
                  ? "Top Scores Across All Categories"
                  : `Top Scores: ${getCategoryTitle(selectedCategory)}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading leaderboard data...</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Rank</th>
                        <th className="text-left py-3 px-4">Player</th>
                        <th className="text-left py-3 px-4">Category</th>
                        <th className="text-right py-3 px-4">Score</th>
                        <th className="text-right py-3 px-4">Time</th>
                        <th className="text-right py-3 px-4">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.slice(0, 20).map((entry, index) => (
                        <tr key={entry.id} className="border-b">
                          <td className="py-3 px-4">
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
                          <td className="py-3 px-4 font-medium">{entry.playerName}</td>
                          <td className="py-3 px-4">{getCategoryTitle(entry.category)}</td>
                          <td className="py-3 px-4 text-right">{entry.score}</td>
                          <td className="py-3 px-4 text-right">{formatTime(entry.timeSpent)}</td>
                          <td className="py-3 px-4 text-right text-muted-foreground">{formatDate(entry.date)}</td>
                        </tr>
                      ))}

                      {leaderboard.length === 0 && (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-muted-foreground">
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
        </TabsContent>
      </Tabs>
    </div>
  )
}

