"use client"

import { useState, useEffect, useRef, use } from "react"
import { useRouter } from "next/navigation"
import { type Question, mockApi } from "@/lib/mock-data"
import { calculateScore, formatTime } from "@/lib/utils"
import { QuizTimer } from "@/components/quiz-timer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle, XCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function QuizPage({ params }: { params: { categoryId: string } }) {
  const router = useRouter()
  const { categoryId } = use<any>(params as unknown as any)

  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [timePerQuestion, setTimePerQuestion] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quizStartTime, setQuizStartTime] = useState<Date | null>(null)
  const [questionStartTime, setQuestionStartTime] = useState<Date | null>(null)
  const [playerName, setPlayerName] = useState<string>("")
  const [showNameInput, setShowNameInput] = useState(false)

  const questionTimerDuration = 15
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true)
        const data = await mockApi.getQuizQuestions(categoryId)
        const shuffled = [...data].sort(() => 0.5 - Math.random()).slice(0, 10)
        setQuestions(shuffled)
        setQuizStartTime(new Date())
        setQuestionStartTime(new Date())
      } catch (error) {
        setError("Failed to load quiz questions. Please try again.")
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [categoryId])

  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return

    setSelectedOption(optionIndex)
    setIsAnswered(true)

    const currentQuestion = questions[currentQuestionIndex]
    const isCorrect = optionIndex === currentQuestion.correctAnswer

  
    const endTime = new Date()
    const timeTaken = questionStartTime
      ? (endTime.getTime() - questionStartTime.getTime()) / 1000
      : questionTimerDuration

    const newTimePerQuestion = [...timePerQuestion]
    newTimePerQuestion[currentQuestionIndex] = timeTaken
    setTimePerQuestion(newTimePerQuestion)

    const questionScore = calculateScore(isCorrect, timeTaken)
    setScore((prevScore) => prevScore + questionScore)

    timerRef.current = setTimeout(() => {
      handleNextQuestion()
    }, 2000)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
      setSelectedOption(null)
      setIsAnswered(false)
      setQuestionStartTime(new Date())
    } else {
      setShowNameInput(true)
    }
  }

  const handleTimeUp = () => {
    if (!isAnswered) {
      setIsAnswered(true)

      const newTimePerQuestion = [...timePerQuestion]
      newTimePerQuestion[currentQuestionIndex] = questionTimerDuration
      setTimePerQuestion(newTimePerQuestion)

      timerRef.current = setTimeout(() => {
        handleNextQuestion()
      }, 1500)
    }
  }

  const handleSubmitScore = async () => {
    if (!playerName.trim()) return

    const totalTime = timePerQuestion.reduce((sum, time) => sum + time, 0)

    try {
      await mockApi.submitScore({
        playerName,
        score,
        timeSpent: Math.round(totalTime),
        category: categoryId,
      })

      router.push(`/quiz/${categoryId}/results?score=${score}&name=${encodeURIComponent(playerName)}`)
    } catch (error) {
      console.error("Failed to submit score:", error)
      setError("Failed to submit score. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="container max-w-3xl py-12 px-4 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Loading Quiz...</h2>
          <Progress value={50} className="w-64 mx-auto" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container max-w-3xl py-12 px-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-6 text-center">
          <Button onClick={() => router.push("/")}>Return to Home</Button>
        </div>
      </div>
    )
  }

  if (showNameInput) {

    return (
      <div className="container max-w-3xl mx-auto py-12 px-4">
        <Card className="w-full max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center space-y-4 mb-6">
              <h2 className="text-2xl font-bold">Quiz Completed!</h2>
              <div className="text-4xl font-bold">{score} points</div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="playerName" className="text-sm font-medium">
                  Enter your name for the leaderboard:
                </label>
                <input
                  type="text"
                  id="playerName"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full px-3 py-2 border text-black rounded-md"
                  placeholder="Your name"
                  maxLength={20}
                />
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={() => router.push("/")} variant="outline">
                  Cancel
                </Button>
                <Button onClick={handleSubmitScore} disabled={!playerName.trim()}>
                  Submit Score
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4 md:py-12">
      <div className="mb-8 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h1>
            <p className="text-muted-foreground">Score: {score} points</p>
          </div>
          <Button variant="outline" onClick={() => router.push("/")}>
            Quit Quiz
          </Button>
        </div>

        <Progress value={progress} className="h-2" />

        <QuizTimer duration={questionTimerDuration} onTimeUp={handleTimeUp} isActive={!isAnswered} />
      </div>

      {currentQuestion && <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-xl font-medium mb-6">{currentQuestion?.text}</h2>

          <div className="space-y-3">
            {currentQuestion?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={isAnswered}
                className={`w-full p-4 text-left rounded-lg border transition-colors ${
                  isAnswered && index === currentQuestion.correctAnswer
                    ? "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-600"
                    : isAnswered && index === selectedOption
                      ? "bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-600"
                      : selectedOption === index
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-card hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center">
                  <div className="mr-3 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span>{option}</span>
                  {isAnswered && index === currentQuestion.correctAnswer && (
                    <CheckCircle className="ml-auto h-5 w-5 text-green-600" />
                  )}
                  {isAnswered && index === selectedOption && index !== currentQuestion.correctAnswer && (
                    <XCircle className="ml-auto h-5 w-5 text-red-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>}

      {isAnswered && currentQuestion?.explanation && (
        <Alert className="mb-6">
          <AlertTitle>Explanation</AlertTitle>
          <AlertDescription>{currentQuestion.explanation}</AlertDescription>
        </Alert>
      )}

      {isAnswered && (
        <div className="text-center">
          <Button onClick={handleNextQuestion}>
            {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
          </Button>
        </div>
      )}
    </div>
  )
}

