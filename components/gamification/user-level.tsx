"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Award, Star, Sparkles } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface UserLevelProps {
  userId: string
  initialPoints?: number
  initialLevel?: number
}

export function UserLevel({ userId, initialPoints = 0, initialLevel = 1 }: UserLevelProps) {
  const [points, setPoints] = useState(initialPoints)
  const [level, setLevel] = useState(initialLevel)
  const [nextLevelPoints, setNextLevelPoints] = useState(0)
  const [progress, setProgress] = useState(0)
  const supabase = createClient()

  // Calculate level and progress based on points
  useEffect(() => {
    // Simple level calculation: each level requires level * 100 points
    const calculateLevel = (pts: number) => {
      let currentLevel = 1
      let pointsRequired = 100
      let remainingPoints = pts

      while (remainingPoints >= pointsRequired) {
        remainingPoints -= pointsRequired
        currentLevel++
        pointsRequired = currentLevel * 100
      }

      const nextLevelTotal = currentLevel * 100
      const currentProgress = Math.round((remainingPoints / nextLevelTotal) * 100)

      return {
        level: currentLevel,
        nextLevelPoints: nextLevelTotal,
        progress: currentProgress,
        pointsToNextLevel: nextLevelTotal - remainingPoints,
      }
    }

    const levelData = calculateLevel(points)
    setLevel(levelData.level)
    setNextLevelPoints(levelData.nextLevelPoints)
    setProgress(levelData.progress)
  }, [points])

  // Mock achievements data - in a real app, this would come from the database
  const achievements = [
    {
      id: "1",
      name: "Carbon Reducer",
      description: "Reduced your carbon footprint by 10%",
      icon: Trophy,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100 dark:bg-yellow-900",
    },
    {
      id: "2",
      name: "Public Transit Pro",
      description: "Used public transportation 20 times",
      icon: Award,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      id: "3",
      name: "Energy Saver",
      description: "Reduced home energy usage by 15%",
      icon: Star,
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900",
    },
  ]

  // Get level title based on level number
  const getLevelTitle = (level: number) => {
    if (level <= 2) return "Eco Novice"
    if (level <= 5) return "Eco Enthusiast"
    if (level <= 10) return "Eco Warrior"
    if (level <= 15) return "Sustainability Champion"
    if (level <= 20) return "Climate Guardian"
    return "Earth Protector"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Level {level}</CardTitle>
              <CardDescription>{getLevelTitle(level)}</CardDescription>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <span className="text-xl font-bold text-green-700 dark:text-green-400">{level}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{points} points</span>
              <span>
                {points + (nextLevelPoints - Math.round(nextLevelPoints * (progress / 100)))} points to level{" "}
                {level + 1}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">Recent achievements</span>
          </div>

          <div className="mt-2 grid grid-cols-1 gap-2">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
                <div className={`p-1.5 rounded-full ${achievement.bgColor}`}>
                  <achievement.icon className={`h-4 w-4 ${achievement.color}`} />
                </div>
                <div>
                  <div className="font-medium text-sm">{achievement.name}</div>
                  <div className="text-xs text-muted-foreground">{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
