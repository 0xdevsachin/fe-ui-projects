import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Clock, Brain, Zap } from "lucide-react"

export default function Home() {
  const categories = [
    {
      id: "general",
      title: "General Knowledge",
      description: "Test your knowledge on a variety of topics",
      icon: <Brain className="h-6 w-6" />,
      questions: 10,
      color: "bg-blue-500",
    },
    {
      id: "science",
      title: "Science & Technology",
      description: "Questions about scientific discoveries and technology",
      icon: <Zap className="h-6 w-6" />,
      questions: 10,
      color: "bg-purple-500",
    },
    {
      id: "history",
      title: "History",
      description: "Journey through historical events and figures",
      icon: <Clock className="h-6 w-6" />,
      questions: 10,
      color: "bg-amber-500",
    },
  ]

  return (
    <main className="container max-w-5xl mx-auto py-8 px-4 md:py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">QuizMaster</h1>
        <p className="text-lg text-muted-foreground max-w-[700px] mb-8">
          Test your knowledge with timed quizzes. Answer quickly to score higher!
        </p>
        <div className="flex gap-4 mb-8">
          <Link href="/leaderboard">
            <Button variant="outline" className="gap-2">
              <Trophy className="h-4 w-4" />
              Leaderboard
            </Button>
          </Link>
          <Link href="/how-to-play">
            <Button variant="outline" className="gap-2">
              <Clock className="h-4 w-4" />
              How to Play
            </Button>
          </Link>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Select a Category</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <div className={`${category.color} h-2`} />
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className={`${category.color} p-2 rounded-md text-white`}>{category.icon}</div>
                <CardTitle>{category.title}</CardTitle>
              </div>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{category.questions} questions • Time-based scoring</p>
            </CardContent>
            <CardFooter>
              <Link href={`/quiz/${category.id}`} className="w-full">
                <Button className="w-full">Start Quiz</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}

