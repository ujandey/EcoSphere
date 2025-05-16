"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { EcoScoreWidget } from "./eco-score-widget"
import { BadgeGallery, type EcoBadge } from "./badge-gallery"
import { RecommendationProgress, type Recommendation } from "./recommendation-progress"
import { SocialShare } from "./social-share"
import { MilestoneCelebration, type Milestone } from "./milestone-celebration"
import { ArrowRight } from "lucide-react"

interface GamificationDashboardProps {
  userId: string
  initialEcoScore?: number
  onRetakeQuiz?: () => void
}

export function GamificationDashboard({ userId, initialEcoScore = 65, onRetakeQuiz }: GamificationDashboardProps) {
  const [ecoScore, setEcoScore] = useState(initialEcoScore)
  const [previousScore, setPreviousScore] = useState<number | undefined>(undefined)
  const [activeTab, setActiveTab] = useState("overview")

  // Sample badges data
  const [badges, setBadges] = useState<EcoBadge[]>([
    {
      id: "energy-saver",
      name: "Energy Saver",
      description: "Reduced your home energy consumption by 10%",
      icon: "energy",
      earned: true,
      earnedAt: new Date().toISOString(),
    },
    {
      id: "water-conserver",
      name: "Water Conserver",
      description: "Implemented water-saving practices in your home",
      icon: "water",
      earned: true,
      earnedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "green-commuter",
      name: "Green Commuter",
      description: "Used eco-friendly transportation for a week",
      icon: "transport",
      earned: false,
    },
    {
      id: "solar-supporter",
      name: "Solar Supporter",
      description: "Switched to renewable energy sources",
      icon: "solar",
      earned: false,
    },
    {
      id: "plant-based",
      name: "Plant-Based Pioneer",
      description: "Reduced meat consumption for two weeks",
      icon: "food",
      earned: false,
    },
  ])

  // Sample recommendations data
  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: "led-bulbs",
      title: "Switch to LED Bulbs",
      description: "Replace all incandescent bulbs with energy-efficient LED bulbs",
      impact: "medium",
      completed: true,
      completedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "thermostat",
      title: "Adjust Thermostat",
      description: "Lower your thermostat by 2 degrees in winter and raise it by 2 degrees in summer",
      impact: "high",
      completed: true,
      completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "water-usage",
      title: "Reduce Water Usage",
      description: "Install low-flow showerheads and faucet aerators",
      impact: "medium",
      completed: false,
    },
    {
      id: "public-transport",
      title: "Use Public Transportation",
      description: "Use public transportation, bike, or walk for your daily commute",
      impact: "high",
      completed: false,
    },
    {
      id: "meatless-monday",
      title: "Meatless Monday",
      description: "Go meat-free one day a week to reduce your carbon footprint",
      impact: "medium",
      completed: false,
    },
  ])

  // Sample milestones data
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: "first-badge",
      title: "First Badge Earned",
      description: "You've earned your first sustainability badge!",
      threshold: 1,
      type: "badges",
      achieved: badges.filter((b) => b.earned).length >= 1,
    },
    {
      id: "eco-starter",
      title: "Eco Starter",
      description: "Your EcoScore has reached 50 points!",
      threshold: 50,
      type: "score",
      achieved: ecoScore >= 50,
    },
    {
      id: "eco-enthusiast",
      title: "Eco Enthusiast",
      description: "Your EcoScore has reached 75 points!",
      threshold: 75,
      type: "score",
      achieved: ecoScore >= 75,
    },
    {
      id: "action-taker",
      title: "Action Taker",
      description: "You've completed 3 recommended actions!",
      threshold: 3,
      type: "actions",
      achieved: recommendations.filter((r) => r.completed).length >= 3,
    },
    {
      id: "badge-collector",
      title: "Badge Collector",
      description: "You've earned 3 sustainability badges!",
      threshold: 3,
      type: "badges",
      achieved: badges.filter((b) => b.earned).length >= 3,
    },
  ])

  // Handle completing a recommendation
  const handleCompleteRecommendation = (id: string) => {
    setRecommendations(
      recommendations.map((rec) =>
        rec.id === id
          ? {
              ...rec,
              completed: !rec.completed,
              completedAt: !rec.completed ? new Date().toISOString() : undefined,
            }
          : rec,
      ),
    )

    // If marking as completed, increase eco score
    const recommendation = recommendations.find((r) => r.id === id)
    if (recommendation && !recommendation.completed) {
      const impactPoints = recommendation.impact === "high" ? 5 : recommendation.impact === "medium" ? 3 : 1
      setPreviousScore(ecoScore)
      setEcoScore(Math.min(100, ecoScore + impactPoints))

      // Check if this completion unlocks a badge
      if (id === "led-bulbs" && !badges.find((b) => b.id === "energy-saver")?.earned) {
        setBadges(
          badges.map((badge) =>
            badge.id === "energy-saver" ? { ...badge, earned: true, earnedAt: new Date().toISOString() } : badge,
          ),
        )
      } else if (id === "water-usage" && !badges.find((b) => b.id === "water-conserver")?.earned) {
        setBadges(
          badges.map((badge) =>
            badge.id === "water-conserver" ? { ...badge, earned: true, earnedAt: new Date().toISOString() } : badge,
          ),
        )
      } else if (id === "public-transport" && !badges.find((b) => b.id === "green-commuter")?.earned) {
        setBadges(
          badges.map((badge) =>
            badge.id === "green-commuter" ? { ...badge, earned: true, earnedAt: new Date().toISOString() } : badge,
          ),
        )
      } else if (id === "meatless-monday" && !badges.find((b) => b.id === "plant-based")?.earned) {
        setBadges(
          badges.map((badge) =>
            badge.id === "plant-based" ? { ...badge, earned: true, earnedAt: new Date().toISOString() } : badge,
          ),
        )
      }
    }
  }

  // Current values for milestone tracking
  const currentValues = {
    score: ecoScore,
    badges: badges.filter((b) => b.earned).length,
    actions: recommendations.filter((r) => r.completed).length,
    streak: 7, // Mock value for consecutive days of app usage
  }

  return (
    <div className="space-y-6">
      {/* Milestone celebration component */}
      <MilestoneCelebration milestones={milestones} currentValues={currentValues} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* EcoScore Card */}
        <Card className="bg-eco-gray/10 border-eco-gray/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Your EcoScore</CardTitle>
            <CardDescription>Track your environmental impact</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center pt-4">
            <EcoScoreWidget score={ecoScore} previousScore={previousScore} size="lg" />

            <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full">
              <Button
                variant="outline"
                className="bg-eco-gray/20 border-eco-gray/30 text-eco-light-gray hover:text-eco-bright-green hover:border-eco-bright-green"
                onClick={onRetakeQuiz}
              >
                Improve Your Score
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <SocialShare ecoScore={ecoScore} badgeCount={badges.filter((b) => b.earned).length} />
            </div>
          </CardContent>
        </Card>

        {/* Badges Card */}
        <Card className="bg-eco-gray/10 border-eco-gray/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Sustainability Badges</CardTitle>
            <CardDescription>Earn badges for eco-friendly actions</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <BadgeGallery badges={badges} />
          </CardContent>
        </Card>

        {/* Recommendations Card */}
        <Card className="bg-eco-gray/10 border-eco-gray/30 md:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Recommended Actions</CardTitle>
            <CardDescription>Complete actions to improve your score</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <RecommendationProgress
              recommendations={recommendations}
              onComplete={handleCompleteRecommendation}
              onViewAll={() => setActiveTab("actions")}
            />
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Card className="bg-eco-gray/10 border-eco-gray/30">
        <CardHeader className="pb-2">
          <CardTitle>Your Sustainability Journey</CardTitle>
          <CardDescription>Track your progress and achievements</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="badges">All Badges</TabsTrigger>
              <TabsTrigger value="actions">All Actions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="pt-4">
              <div className="space-y-4">
                <p className="text-eco-light-gray">
                  Your sustainability journey is off to a great start! Continue completing recommended actions to
                  improve your EcoScore and earn more badges.
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 bg-eco-gray/20 rounded-lg">
                    <h3 className="font-medium mb-2">Progress Summary</h3>
                    <ul className="space-y-2 text-sm text-eco-light-gray">
                      <li className="flex justify-between">
                        <span>Current EcoScore:</span>
                        <span className="font-medium text-eco-bright-green">{ecoScore}/100</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Badges Earned:</span>
                        <span className="font-medium">
                          {badges.filter((b) => b.earned).length}/{badges.length}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Actions Completed:</span>
                        <span className="font-medium">
                          {recommendations.filter((r) => r.completed).length}/{recommendations.length}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Milestones Achieved:</span>
                        <span className="font-medium">
                          {milestones.filter((m) => m.achieved).length}/{milestones.length}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-eco-gray/20 rounded-lg">
                    <h3 className="font-medium mb-2">Next Steps</h3>
                    <ul className="space-y-2 text-sm text-eco-light-gray">
                      {!recommendations.every((r) => r.completed) && (
                        <li>
                          • Complete{" "}
                          <span className="text-eco-bright-green">
                            {recommendations.filter((r) => !r.completed)[0]?.title}
                          </span>{" "}
                          to improve your score
                        </li>
                      )}
                      {badges.filter((b) => !b.earned).length > 0 && (
                        <li>
                          • Earn the{" "}
                          <span className="text-eco-bright-green">{badges.filter((b) => !b.earned)[0]?.name}</span>{" "}
                          badge
                        </li>
                      )}
                      {ecoScore < 75 && <li>• Reach an EcoScore of 75 to achieve the Eco Enthusiast milestone</li>}
                      <li>• Share your progress with friends to spread awareness</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="badges" className="pt-4">
              <div className="space-y-6">
                <p className="text-eco-light-gray">
                  Earn badges by completing eco-friendly actions and improving your sustainability habits.
                </p>
                <BadgeGallery badges={badges} showProgress={false} />

                <div className="p-4 bg-eco-gray/20 rounded-lg">
                  <h3 className="font-medium mb-2">How to Earn More Badges</h3>
                  <ul className="space-y-2 text-sm text-eco-light-gray">
                    {badges
                      .filter((b) => !b.earned)
                      .map((badge) => (
                        <li key={badge.id} className="flex items-start gap-2">
                          <span>•</span>
                          <div>
                            <span className="font-medium text-white">{badge.name}:</span> {badge.description}
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="actions" className="pt-4">
              <div className="space-y-6">
                <p className="text-eco-light-gray">
                  Complete these recommended actions to reduce your carbon footprint and improve your EcoScore.
                </p>

                <div className="space-y-3">
                  {recommendations.map((recommendation) => (
                    <div key={recommendation.id} className="p-4 bg-eco-gray/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{recommendation.title}</h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            recommendation.impact === "high"
                              ? "bg-eco-bright-green/20 text-eco-bright-green"
                              : recommendation.impact === "medium"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {recommendation.impact === "high"
                            ? "High Impact"
                            : recommendation.impact === "medium"
                              ? "Medium Impact"
                              : "Low Impact"}
                        </span>
                      </div>
                      <p className="text-sm text-eco-light-gray mb-3">{recommendation.description}</p>
                      <div className="flex justify-between items-center">
                        <Button
                          variant={recommendation.completed ? "default" : "outline"}
                          size="sm"
                          className={
                            recommendation.completed
                              ? "bg-eco-dark-green hover:bg-eco-dark-green text-eco-bright-green"
                              : "border-eco-gray/50 text-eco-light-gray hover:text-eco-bright-green hover:border-eco-bright-green"
                          }
                          onClick={() => handleCompleteRecommendation(recommendation.id)}
                        >
                          {recommendation.completed ? "Completed ✓" : "Mark as Completed"}
                        </Button>
                        {recommendation.completed && recommendation.completedAt && (
                          <span className="text-xs text-eco-light-gray">
                            Completed on {new Date(recommendation.completedAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
