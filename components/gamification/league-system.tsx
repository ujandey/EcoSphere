"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Trophy, Medal, Crown, Clock, TrendingUp, ChevronUp, ChevronDown, Minus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// League tiers with their thresholds and styling
const LEAGUE_TIERS = [
  {
    name: "Bronze",
    minScore: 0,
    maxScore: 60,
    color: "bg-amber-600",
    textColor: "text-amber-500",
    borderColor: "border-amber-600/30",
    icon: Medal,
  },
  {
    name: "Silver",
    minScore: 61,
    maxScore: 80,
    color: "bg-slate-400",
    textColor: "text-slate-300",
    borderColor: "border-slate-400/30",
    icon: Medal,
  },
  {
    name: "Gold",
    minScore: 81,
    maxScore: 100,
    color: "bg-yellow-500",
    textColor: "text-yellow-400",
    borderColor: "border-yellow-500/30",
    icon: Crown,
  },
]

// Mock players for the leaderboard
const MOCK_PLAYERS = [
  {
    id: "p1",
    name: "Emma",
    score: 88,
    badges: 4,
    avatar: "/placeholder.svg?height=40&width=40",
    trend: "up",
  },
  {
    id: "p2",
    name: "Michael",
    score: 76,
    badges: 3,
    avatar: "/placeholder.svg?height=40&width=40",
    trend: "same",
  },
  {
    id: "p3",
    name: "Sophia",
    score: 72,
    badges: 2,
    avatar: "/placeholder.svg?height=40&width=40",
    trend: "down",
  },
  {
    id: "p4",
    name: "James",
    score: 65,
    badges: 2,
    avatar: "/placeholder.svg?height=40&width=40",
    trend: "up",
  },
  {
    id: "p5",
    name: "Olivia",
    score: 58,
    badges: 1,
    avatar: "/placeholder.svg?height=40&width=40",
    trend: "same",
  },
]

interface LeagueSystemProps {
  userScore: number
  userBadges: number
  userName: string
  userAvatar?: string
}

export function LeagueSystem({ userScore, userBadges, userName, userAvatar }: LeagueSystemProps) {
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [userRank, setUserRank] = useState(0)
  const [userTier, setUserTier] = useState(LEAGUE_TIERS[0])
  const [nextTier, setNextTier] = useState<(typeof LEAGUE_TIERS)[0] | null>(null)
  const [pointsToNextTier, setPointsToNextTier] = useState(0)
  const [showRankUpAnimation, setShowRankUpAnimation] = useState(false)

  // Calculate days until weekly reset (mock)
  const daysUntilReset = 3
  const hoursUntilReset = 14

  // Calculate total score (score + badge bonus)
  const calculateTotalScore = (score: number, badges: number) => {
    return score + badges * 5 // Each badge gives 5 bonus points
  }

  // Determine user's tier based on score
  useEffect(() => {
    const tier =
      LEAGUE_TIERS.find((tier) => userScore >= tier.minScore && userScore <= tier.maxScore) || LEAGUE_TIERS[0]

    const tierIndex = LEAGUE_TIERS.findIndex((t) => t.name === tier.name)
    const nextTierObj = tierIndex < LEAGUE_TIERS.length - 1 ? LEAGUE_TIERS[tierIndex + 1] : null

    setUserTier(tier)
    setNextTier(nextTierObj)

    if (nextTierObj) {
      setPointsToNextTier(nextTierObj.minScore - userScore)
    }

    // Check for localStorage to see if user ranked up
    const previousTier = localStorage.getItem("userTier")
    if (previousTier && previousTier !== tier.name) {
      setShowRankUpAnimation(true)
      setTimeout(() => setShowRankUpAnimation(false), 5000)
    }
    localStorage.setItem("userTier", tier.name)
  }, [userScore])

  // Generate leaderboard with user and mock players
  useEffect(() => {
    const userTotalScore = calculateTotalScore(userScore, userBadges)

    // Create user object
    const user = {
      id: "user",
      name: userName,
      score: userScore,
      badges: userBadges,
      totalScore: userTotalScore,
      avatar: userAvatar || "/placeholder.svg?height=40&width=40",
      isUser: true,
      trend: "up",
    }

    // Calculate total scores for mock players
    const playersWithTotal = MOCK_PLAYERS.map((player) => ({
      ...player,
      totalScore: calculateTotalScore(player.score, player.badges),
      isUser: false,
    }))

    // Combine user with mock players and sort by total score
    const combined = [...playersWithTotal, user].sort((a, b) => b.totalScore - a.totalScore)

    // Find user's rank
    const rank = combined.findIndex((player) => player.id === "user") + 1

    setLeaderboard(combined)
    setUserRank(rank)
  }, [userScore, userBadges, userName, userAvatar])

  // Get tier badge component
  const TierBadge = ({ tier, size = "md" }: { tier: (typeof LEAGUE_TIERS)[0]; size?: "sm" | "md" | "lg" }) => {
    const IconComponent = tier.icon
    const sizeClasses = {
      sm: "text-xs py-0.5 px-2",
      md: "text-sm py-1 px-2",
      lg: "text-base py-1.5 px-3",
    }

    return (
      <Badge className={`${tier.color} ${sizeClasses[size]} flex items-center gap-1`}>
        <IconComponent className="h-3 w-3" />
        <span>{tier.name}</span>
      </Badge>
    )
  }

  // Get trend icon
  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === "up") return <ChevronUp className="h-4 w-4 text-green-500" />
    if (trend === "down") return <ChevronDown className="h-4 w-4 text-red-500" />
    return <Minus className="h-4 w-4 text-gray-500" />
  }

  return (
    <div className="space-y-6">
      {/* Rank up animation */}
      {showRankUpAnimation && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className={`p-4 ${userTier.borderColor} border rounded-lg text-center relative overflow-hidden`}
        >
          <div className="absolute inset-0 opacity-20" style={{ backgroundColor: userTier.color }} />
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-2"
            >
              <div className={`p-3 rounded-full ${userTier.color}`}>
                <Trophy className="h-6 w-6 text-white" />
              </div>
            </motion.div>
            <h3 className={`text-xl font-bold ${userTier.textColor}`}>You've reached {userTier.name} League!</h3>
            <p className="text-eco-light-gray mt-1">
              Congratulations on your progress! Keep improving your EcoScore to reach the next tier.
            </p>
          </div>
        </motion.div>
      )}

      {/* League status card */}
      <Card className="bg-eco-gray/10 border-eco-gray/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-medium">Your League Status</CardTitle>
              <CardDescription>Compete with others to climb the ranks</CardDescription>
            </div>
            <TierBadge tier={userTier} size="lg" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current rank info */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-eco-light-gray">Current Rank</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">#{userRank}</span>
                <span className="text-eco-light-gray">in {userTier.name} League</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-eco-light-gray">Total Score</p>
              <div className="text-2xl font-bold">{calculateTotalScore(userScore, userBadges)}</div>
            </div>
          </div>

          {/* Progress to next tier */}
          {nextTier && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-eco-light-gray">Progress to {nextTier.name} League</span>
                <span>
                  {userScore}/{nextTier.minScore} points
                </span>
              </div>
              <div className="h-2 bg-eco-gray/30 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${nextTier.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(userScore / nextTier.minScore) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <p className="text-sm text-eco-light-gray">
                {pointsToNextTier > 0
                  ? `Need ${pointsToNextTier} more points to reach ${nextTier.name} League`
                  : `You've qualified for ${nextTier.name} League!`}
              </p>
            </div>
          )}

          {/* Weekly reset timer */}
          <div className="flex items-center gap-2 text-sm text-eco-light-gray mt-2">
            <Clock className="h-4 w-4" />
            <span>
              League resets in {daysUntilReset}d {hoursUntilReset}h
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard card */}
      <Card className="bg-eco-gray/10 border-eco-gray/30">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Weekly Leaderboard</CardTitle>
          <CardDescription>Top performers in your league this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.map((player, index) => (
              <div
                key={player.id}
                className={`flex items-center p-3 rounded-lg ${
                  player.isUser ? "bg-eco-dark-green/20 border border-eco-bright-green" : "bg-eco-gray/20"
                }`}
              >
                <div className="w-8 text-center font-bold">{index + 1}</div>
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                  <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className={`font-medium ${player.isUser ? "text-eco-bright-green" : ""}`}>{player.name}</span>
                    {player.isUser && <span className="ml-2 text-xs text-eco-light-gray">(You)</span>}
                  </div>
                  <div className="flex items-center text-xs text-eco-light-gray">
                    <span>Score: {player.score}</span>
                    <span className="mx-1">•</span>
                    <span>Badges: {player.badges}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TierBadge
                    tier={
                      LEAGUE_TIERS.find((tier) => player.score >= tier.minScore && player.score <= tier.maxScore) ||
                      LEAGUE_TIERS[0]
                    }
                    size="sm"
                  />
                  <TrendIcon trend={player.trend} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-center">
            <Button
              variant="outline"
              className="bg-eco-gray/20 border-eco-gray/30 text-eco-light-gray hover:text-eco-bright-green hover:border-eco-bright-green"
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              View Full Rankings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
