import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MessageCircleMore,
  BrainIcon,
} from "lucide-react";

export default function Home() {
  const categories = [
    {
      id: "chat-app",
      title: "Chat App",
      icon: <MessageCircleMore className="h-6 w-6" />,
      color: "bg-blue-500",
      href: "/chats",
    },
    {
      id: "quiz-app",
      title: "Quiz App",
      icon: <BrainIcon className="h-6 w-6" />,
      color: "bg-amber-500",
      href: "/quiz-app",
    },
  ];

  return (
    <main className="container max-w-5xl mx-auto py-8 px-4 md:py-12">
      <h2 className="text-2xl font-bold mb-6">Select Project</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <div className={`${category.color} h-2`} />
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className={`${category.color} p-2 rounded-md text-white`}>
                  {category.icon}
                </div>
                <CardTitle>{category.title}</CardTitle>
              </div>
            </CardHeader>
            <CardFooter>
              <Link href={`${category.href}`} className="w-full">
                <Button className="w-full">Visit Project</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
