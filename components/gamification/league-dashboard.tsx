"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeagueSystem } from "./league-system"
import { GamificationDashboard } from "./gamification-dashboard"

interface LeagueDashboardProps {
  userId: string
  userName: string
  userAvatar?: string
  initialEcoScore?: number
  onRetakeQuiz?: () => void
}

export function LeagueDashboard({
  userId,
  userName,
  userAvatar,
  initialEcoScore = 65,
  onRetakeQuiz,
}: LeagueDashboardProps) {
  const [activeTab, setActiveTab] = useState("progress")

  // Mock data for badges count
  const userBadges = 2

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="progress">My Progress</TabsTrigger>
          <TabsTrigger value="leagues">Leagues & Rankings</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="mt-6">
          <GamificationDashboard userId={userId} initialEcoScore={initialEcoScore} onRetakeQuiz={onRetakeQuiz} />
        </TabsContent>

        <TabsContent value="leagues" className="mt-6">
          <LeagueSystem
            userScore={initialEcoScore}
            userBadges={userBadges}
            userName={userName}
            userAvatar={userAvatar}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
