import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Award, BrainCircuit, ArrowLeft } from "lucide-react"

export default function HowToPlay() {
  return (
    <main className="container max-w-3xl mx-auto py-8 px-4 md:py-12">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">How to Play</h1>
        <p className="text-lg text-muted-foreground">Learn how to play and maximize your score</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <BrainCircuit className="h-6 w-6 text-primary" />
              <CardTitle>Quiz Basics</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Each quiz consists of 10 multiple-choice questions from your chosen category.</p>
            <p>Select the answer you believe is correct. Once selected, you cannot change your answer.</p>
            <p>After answering all questions, you'll see your final score and how you rank on the leaderboard.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-amber-500" />
              <CardTitle>Time-Based Scoring</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>You have 15 seconds to answer each question.</p>
            <p>The faster you answer correctly, the more points you earn:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Answer within 0-5 seconds: 100 points</li>
              <li>Answer within 6-10 seconds: 75 points</li>
              <li>Answer within 11-15 seconds: 50 points</li>
              <li>Incorrect answers: 0 points</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Award className="h-6 w-6 text-purple-500" />
              <CardTitle>Leaderboard</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              After completing a quiz, your score will be added to the leaderboard if it ranks among the top scores.
            </p>
            <p>
              The leaderboard displays the top 10 scores for each category, showing the player name, score, and
              completion time.
            </p>
            <p>Challenge yourself to climb the ranks and become the QuizMaster!</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Link href="/">
          <Button size="lg">Ready to Play!</Button>
        </Link>
      </div>
    </main>
  )
}

