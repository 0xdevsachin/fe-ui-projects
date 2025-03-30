export interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

export interface QuizCategory {
  id: string
  title: string
  description: string
  questions: Question[]
}

export interface LeaderboardEntry {
  id: string
  playerName: string
  score: number
  timeSpent: number // in seconds
  category: string
  date: string
}

// Mock questions for different categories
export const quizData: QuizCategory[] = [
  {
    id: "general",
    title: "General Knowledge",
    description: "Test your knowledge on a variety of topics",
    questions: [
      {
        id: "g1",
        text: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
        explanation: "Paris is the capital and most populous city of France.",
      },
      {
        id: "g2",
        text: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
        explanation: "Mars is often called the Red Planet due to its reddish appearance.",
      },
      {
        id: "g3",
        text: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2,
        explanation: "The Mona Lisa was painted by Leonardo da Vinci in the early 16th century.",
      },
      {
        id: "g4",
        text: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: 3,
        explanation: "The Pacific Ocean is the largest and deepest ocean on Earth.",
      },
      {
        id: "g5",
        text: "Which country is home to the kangaroo?",
        options: ["New Zealand", "South Africa", "Australia", "Brazil"],
        correctAnswer: 2,
        explanation: "Kangaroos are native to Australia.",
      },
      {
        id: "g6",
        text: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2,
        explanation: "The chemical symbol for gold is Au, from the Latin word 'aurum'.",
      },
      {
        id: "g7",
        text: "Which of these is not a primary color?",
        options: ["Red", "Blue", "Green", "Yellow"],
        correctAnswer: 3,
        explanation: "Yellow is not a primary color in the RGB color model used for digital displays.",
      },
      {
        id: "g8",
        text: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: 1,
        explanation: "Romeo and Juliet was written by William Shakespeare around 1595.",
      },
      {
        id: "g9",
        text: "What is the tallest mountain in the world?",
        options: ["K2", "Mount Everest", "Kangchenjunga", "Makalu"],
        correctAnswer: 1,
        explanation: "Mount Everest is the tallest mountain above sea level at 8,848.86 meters.",
      },
      {
        id: "g10",
        text: "Which element has the chemical symbol 'O'?",
        options: ["Osmium", "Oxygen", "Oganesson", "Olivine"],
        correctAnswer: 1,
        explanation: "O is the chemical symbol for Oxygen.",
      },
    ],
  },
  {
    id: "science",
    title: "Science & Technology",
    description: "Questions about scientific discoveries and technology",
    questions: [
      {
        id: "s1",
        text: "What is the hardest natural substance on Earth?",
        options: ["Platinum", "Diamond", "Quartz", "Titanium"],
        correctAnswer: 1,
        explanation: "Diamond is the hardest known natural material on Earth.",
      },
      {
        id: "s2",
        text: "Which of these is not a programming language?",
        options: ["Python", "Java", "Cobra", "Leopard"],
        correctAnswer: 3,
        explanation: "Leopard is not a programming language. Python, Java, and Cobra are all programming languages.",
      },
      {
        id: "s3",
        text: "What is the smallest unit of life?",
        options: ["Atom", "Cell", "Molecule", "Tissue"],
        correctAnswer: 1,
        explanation: "The cell is the smallest unit of life.",
      },
      {
        id: "s4",
        text: "What does CPU stand for?",
        options: [
          "Central Processing Unit",
          "Computer Personal Unit",
          "Central Processor Utility",
          "Central Program Unit",
        ],
        correctAnswer: 0,
        explanation:
          "CPU stands for Central Processing Unit, the primary component of a computer that performs most of the processing.",
      },
      {
        id: "s5",
        text: "Which scientist proposed the theory of relativity?",
        options: ["Isaac Newton", "Galileo Galilei", "Albert Einstein", "Stephen Hawking"],
        correctAnswer: 2,
        explanation: "Albert Einstein proposed the theory of relativity in the early 20th century.",
      },
      {
        id: "s6",
        text: "What is the chemical symbol for water?",
        options: ["WO", "H2O", "W", "HO2"],
        correctAnswer: 1,
        explanation: "H2O is the chemical formula for water, consisting of two hydrogen atoms and one oxygen atom.",
      },
      {
        id: "s7",
        text: "Which planet has the most moons?",
        options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
        correctAnswer: 1,
        explanation: "Saturn has the most confirmed moons, with 83 confirmed moons as of 2023.",
      },
      {
        id: "s8",
        text: "What is the main function of DNA?",
        options: ["Energy storage", "Protein synthesis", "Genetic information storage", "Cell structure"],
        correctAnswer: 2,
        explanation:
          "DNA's main function is to store genetic information that is used for the development and functioning of all living organisms.",
      },
      {
        id: "s9",
        text: "What does HTTP stand for?",
        options: [
          "HyperText Transfer Protocol",
          "High Tech Transfer Protocol",
          "HyperText Transmission Process",
          "High Tech Transmission Process",
        ],
        correctAnswer: 0,
        explanation:
          "HTTP stands for HyperText Transfer Protocol, the foundation of data communication on the World Wide Web.",
      },
      {
        id: "s10",
        text: "Which of these is not a type of renewable energy?",
        options: ["Solar", "Wind", "Nuclear", "Hydroelectric"],
        correctAnswer: 2,
        explanation: "Nuclear energy is not considered renewable as it uses uranium, which is a finite resource.",
      },
    ],
  },
  {
    id: "history",
    title: "History",
    description: "Journey through historical events and figures",
    questions: [
      {
        id: "h1",
        text: "In which year did World War II end?",
        options: ["1943", "1945", "1947", "1950"],
        correctAnswer: 1,
        explanation: "World War II ended in 1945 with the surrender of Germany in May and Japan in September.",
      },
      {
        id: "h2",
        text: "Who was the first President of the United States?",
        options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
        correctAnswer: 2,
        explanation: "George Washington was the first President of the United States, serving from 1789 to 1797.",
      },
      {
        id: "h3",
        text: "The ancient city of Rome was built on how many hills?",
        options: ["Five", "Six", "Seven", "Eight"],
        correctAnswer: 2,
        explanation:
          "Rome was built on seven hills: Aventine, Caelian, Capitoline, Esquiline, Palatine, Quirinal, and Viminal.",
      },
      {
        id: "h4",
        text: "Which empire was ruled by Genghis Khan?",
        options: ["Ottoman Empire", "Mongol Empire", "Roman Empire", "Byzantine Empire"],
        correctAnswer: 1,
        explanation:
          "Genghis Khan founded and ruled the Mongol Empire, which became the largest contiguous land empire in history.",
      },
      {
        id: "h5",
        text: "The Renaissance period began in which country?",
        options: ["France", "England", "Italy", "Spain"],
        correctAnswer: 2,
        explanation: "The Renaissance began in Italy in the 14th century before spreading to the rest of Europe.",
      },
      {
        id: "h6",
        text: "Who wrote the Declaration of Independence?",
        options: ["George Washington", "Benjamin Franklin", "Thomas Jefferson", "John Adams"],
        correctAnswer: 2,
        explanation: "Thomas Jefferson was the principal author of the Declaration of Independence.",
      },
      {
        id: "h7",
        text: "Which of these ancient wonders still exists today?",
        options: [
          "Colossus of Rhodes",
          "Hanging Gardens of Babylon",
          "Great Pyramid of Giza",
          "Lighthouse of Alexandria",
        ],
        correctAnswer: 2,
        explanation: "The Great Pyramid of Giza is the only ancient wonder that still exists today.",
      },
      {
        id: "h8",
        text: "The Industrial Revolution began in which country?",
        options: ["United States", "France", "Germany", "Great Britain"],
        correctAnswer: 3,
        explanation: "The Industrial Revolution began in Great Britain in the late 18th century.",
      },
      {
        id: "h9",
        text: "Who was the first woman to win a Nobel Prize?",
        options: ["Marie Curie", "Rosalind Franklin", "Dorothy Hodgkin", "Irène Joliot-Curie"],
        correctAnswer: 0,
        explanation:
          "Marie Curie was the first woman to win a Nobel Prize, winning the Physics Prize in 1903 and the Chemistry Prize in 1911.",
      },
      {
        id: "h10",
        text: "The Cold War was primarily a conflict between which two countries?",
        options: [
          "United States and China",
          "United States and Soviet Union",
          "Great Britain and Germany",
          "France and Soviet Union",
        ],
        correctAnswer: 1,
        explanation:
          "The Cold War was primarily a geopolitical tension between the United States and the Soviet Union and their respective allies.",
      },
    ],
  },
]

// Mock leaderboard data
export const leaderboardData: LeaderboardEntry[] = [
  {
    id: "l1",
    playerName: "QuizWizard",
    score: 950,
    timeSpent: 87,
    category: "general",
    date: "2023-11-15T14:30:00Z",
  },
  {
    id: "l2",
    playerName: "BrainiacMaster",
    score: 925,
    timeSpent: 92,
    category: "general",
    date: "2023-11-14T10:15:00Z",
  },
  {
    id: "l3",
    playerName: "KnowledgeSeeker",
    score: 875,
    timeSpent: 103,
    category: "general",
    date: "2023-11-13T16:45:00Z",
  },
  {
    id: "l4",
    playerName: "TechGenius",
    score: 980,
    timeSpent: 82,
    category: "science",
    date: "2023-11-15T09:20:00Z",
  },
  {
    id: "l5",
    playerName: "CodeMaster",
    score: 940,
    timeSpent: 88,
    category: "science",
    date: "2023-11-14T11:30:00Z",
  },
  {
    id: "l6",
    playerName: "ScienceWhiz",
    score: 900,
    timeSpent: 95,
    category: "science",
    date: "2023-11-13T14:10:00Z",
  },
  {
    id: "l7",
    playerName: "HistoryBuff",
    score: 960,
    timeSpent: 85,
    category: "history",
    date: "2023-11-15T13:45:00Z",
  },
  {
    id: "l8",
    playerName: "TimeTraveler",
    score: 930,
    timeSpent: 90,
    category: "history",
    date: "2023-11-14T15:20:00Z",
  },
  {
    id: "l9",
    playerName: "PastExplorer",
    score: 890,
    timeSpent: 98,
    category: "history",
    date: "2023-11-13T10:50:00Z",
  },
]

export const mockApi = {
  getCategories: () => {
    return Promise.resolve(
      quizData.map((category) => ({
        id: category.id,
        title: category.title,
        description: category.description,
      })),
    )
  },

  getQuizQuestions: (categoryId: string) => {
    const category = quizData.find((c) => c.id === categoryId)
    if (!category) {
      return Promise.reject(new Error("Category not found"))
    }
    return Promise.resolve([...category.questions])
  },

  getLeaderboard: (categoryId?: string) => {
    let entries = [...leaderboardData]
    if (categoryId) {
      entries = entries.filter((entry) => entry.category === categoryId)
    }
    return Promise.resolve(entries.sort((a, b) => b.score - a.score))
  },

  submitScore: (data: Omit<LeaderboardEntry, "id" | "date">) => {
    const newEntry: LeaderboardEntry = {
      ...data,
      id: `l${leaderboardData.length + 1}`,
      date: new Date().toISOString(),
    }
    leaderboardData.push(newEntry)
    return Promise.resolve(newEntry)
  },
}

