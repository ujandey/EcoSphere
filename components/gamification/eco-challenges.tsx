"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Clock, Users, CheckCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "@/components/ui/use-toast"

interface Challenge {
  id: string
  title: string
  description: string
  category: string
  difficulty: "Easy" | "Medium" | "Hard"
  points: number
  duration: string
  participants: number
  progress: number
  status: "active" | "completed" | "available"
  tasks: {
    id: string
    description: string
    completed: boolean
  }[]
}

interface EcoChallengesProps {
  userId: string
  userLevel: number
}

export function EcoChallenges({ userId, userLevel }: EcoChallengesProps) {
  const [activeTab, setActiveTab] = useState("active")
  const supabase = createClient()

  // Mock challenges data - in a real app, this would come from the database
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "1",
      title: "Zero Waste Week",
      description: "Reduce your waste production to almost zero for one week",
      category: "Waste",
      difficulty: "Medium",
      points: 150,
      duration: "7 days",
      participants: 342,
      progress: 57,
      status: "active",
      tasks: [
        { id: "1-1", description: "Use reusable shopping bags", completed: true },
        { id: "1-2", description: "Avoid single-use plastics", completed: true },
        { id: "1-3", description: "Compost food scraps", completed: false },
        { id: "1-4", description: "Buy package-free products", completed: false },
      ],
    },
    {
      id: "2",
      title: "Plant-Based Days",
      description: "Eat plant-based meals for 5 days",
      category: "Food",
      difficulty: "Easy",
      points: 100,
      duration: "5 days",
      participants: 528,
      progress: 40,
      status: "active",
      tasks: [
        { id: "2-1", description: "Try a new plant-based recipe", completed: true },
        { id: "2-2", description: "Replace dairy with plant alternatives", completed: true },
        { id: "2-3", description: "Eat a plant-based breakfast daily", completed: false },
        { id: "2-4", description: "Share a plant-based meal with friends", completed: false },
      ],
    },
    {
      id: "3",
      title: "Energy Saver",
      description: "Reduce your home energy consumption by 20%",
      category: "Energy",
      difficulty: "Medium",
      points: 200,
      duration: "14 days",
      participants: 256,
      progress: 0,
      status: "available",
      tasks: [
        { id: "3-1", description: "Turn off lights when not in use", completed: false },
        { id: "3-2", description: "Unplug electronics when not in use", completed: false },
        { id: "3-3", description: "Use energy-efficient settings on appliances", completed: false },
        { id: "3-4", description: "Reduce heating/cooling by 2 degrees", completed: false },
      ],
    },
    {
      id: "4",
      title: "Car-Free Days",
      description: "Go without using a car for 3 days",
      category: "Transportation",
      difficulty: "Hard",
      points: 250,
      duration: "3 days",
      participants: 189,
      progress: 0,
      status: "available",
      tasks: [
        { id: "4-1", description: "Walk for trips under 1 mile", completed: false },
        { id: "4-2", description: "Use public transportation", completed: false },
        { id: "4-3", description: "Try biking to a destination", completed: false },
        { id: "4-4", description: "Carpool or use rideshare", completed: false },
      ],
    },
    {
      id: "5",
      title: "Water Conserver",
      description: "Reduce your water usage by 30%",
      category: "Water",
      difficulty: "Medium",
      points: 175,
      duration: "7 days",
      participants: 312,
      progress: 100,
      status: "completed",
      tasks: [
        { id: "5-1", description: "Take shorter showers", completed: true },
        { id: "5-2", description: "Fix any leaking faucets", completed: true },
        { id: "5-3", description: "Use water-saving settings on appliances", completed: true },
        { id: "5-4", description: "Collect and reuse water when possible", completed: true },
      ],
    },
  ])

  const activeChallenges = challenges.filter((challenge) => challenge.status === "active")
  const availableChallenges = challenges.filter((challenge) => challenge.status === "available")
  const completedChallenges = challenges.filter((challenge) => challenge.status === "completed")

  const joinChallenge = (challengeId: string) => {
    setChallenges(
      challenges.map((challenge) =>
        challenge.id === challengeId ? { ...challenge, status: "active", progress: 0 } : challenge,
      ),
    )

    toast({
      title: "Challenge joined!",
      description: "You've successfully joined a new challenge.",
    })

    // In a real app, you would save this to the database
    // const { error } = await supabase.from("user_challenges").insert({
    //   user_id: userId,
    //   challenge_id: challengeId,
    //   status: "active",
    //   progress: 0,
    //   joined_at: new Date().toISOString(),
    // })
  }

  const toggleTaskCompletion = (challengeId: string, taskId: string) => {
    setChallenges(
      challenges.map((challenge) => {
        if (challenge.id === challengeId) {
          const updatedTasks = challenge.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task,
          )

          const completedTasksCount = updatedTasks.filter((task) => task.completed).length
          const progress = Math.round((completedTasksCount / updatedTasks.length) * 100)

          // Check if all tasks are completed
          const allCompleted = updatedTasks.every((task) => task.completed)
          const status = allCompleted ? "completed" : "active"

          return { ...challenge, tasks: updatedTasks, progress, status }
        }
        return challenge
      }),
    )

    // In a real app, you would save this to the database
    // const { error } = await supabase.from("user_challenge_tasks").update({
    //   completed: !task.completed,
    // }).eq("user_id", userId).eq("challenge_id", challengeId).eq("task_id", taskId)

    // Check if task was completed (not uncompleted)
    const challenge = challenges.find((c) => c.id === challengeId)
    const task = challenge?.tasks.find((t) => t.id === taskId)

    if (task && !task.completed) {
      toast({
        title: "Task completed!",
        description: "You're making great progress on your challenge.",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Eco Challenges</h2>
          <p className="text-muted-foreground">Complete challenges to earn points and level up</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active ({activeChallenges.length})</TabsTrigger>
          <TabsTrigger value="available">Available ({availableChallenges.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedChallenges.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6 mt-6">
          {activeChallenges.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p>You don't have any active challenges. Join a challenge to get started!</p>
                <Button className="mt-4 bg-green-600 hover:bg-green-700" onClick={() => setActiveTab("available")}>
                  Browse Challenges
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {activeChallenges.map((challenge) => (
                <Card key={challenge.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{challenge.title}</CardTitle>
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      >
                        {challenge.category}
                      </Badge>
                    </div>
                    <CardDescription>{challenge.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{challenge.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">{challenge.points} points</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Tasks:</h4>
                      <ul className="space-y-1">
                        {challenge.tasks.map((task) => (
                          <li key={task.id} className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => toggleTaskCompletion(challenge.id, task.id)}
                            >
                              {task.completed ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              ) : (
                                <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                              )}
                            </Button>
                            <span className={task.completed ? "line-through text-muted-foreground" : ""}>
                              {task.description}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="available" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {availableChallenges.map((challenge) => (
              <Card key={challenge.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{challenge.title}</CardTitle>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    >
                      {challenge.category}
                    </Badge>
                  </div>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{challenge.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{challenge.points} points</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{challenge.participants} participants</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{challenge.difficulty} difficulty</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => joinChallenge(challenge.id)}
                  >
                    Join Challenge
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6 mt-6">
          {completedChallenges.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p>You haven't completed any challenges yet. Keep going!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {completedChallenges.map((challenge) => (
                <Card key={challenge.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{challenge.title}</CardTitle>
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      >
                        {challenge.category}
                      </Badge>
                    </div>
                    <CardDescription>{challenge.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Completed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">{challenge.points} points earned</span>
                      </div>
                    </div>
                    <Progress value={100} className="h-2 bg-green-200" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
