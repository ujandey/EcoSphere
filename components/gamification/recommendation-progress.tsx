"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface Recommendation {
  id: string
  title: string
  description: string
  impact: "high" | "medium" | "low"
  completed: boolean
  completedAt?: string
}

interface RecommendationProgressProps {
  recommendations: Recommendation[]
  onComplete: (id: string) => void
  onViewAll?: () => void
}

export function RecommendationProgress({ recommendations, onComplete, onViewAll }: RecommendationProgressProps) {
  const [completedCount, setCompletedCount] = useState(0)
  const [progressPercentage, setProgressPercentage] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)

  // Calculate progress whenever recommendations change
  useEffect(() => {
    const completed = recommendations.filter((rec) => rec.completed).length
    setCompletedCount(completed)
    setProgressPercentage((completed / recommendations.length) * 100)

    // Show celebration if all recommendations are completed
    if (completed === recommendations.length && completed > 0) {
      setShowCelebration(true)
      const timer = setTimeout(() => setShowCelebration(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [recommendations])

  // Get impact color
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-eco-bright-green"
      case "medium":
        return "text-yellow-400"
      case "low":
        return "text-blue-400"
      default:
        return "text-eco-light-gray"
    }
  }

  // Get impact label
  const getImpactLabel = (impact: string) => {
    switch (impact) {
      case "high":
        return "High Impact"
      case "medium":
        return "Medium Impact"
      case "low":
        return "Low Impact"
      default:
        return "Impact"
    }
  }

  // Get motivational message based on progress
  const getMotivationalMessage = () => {
    if (progressPercentage === 100) return "Amazing! You've completed all recommendations! 🌟"
    if (progressPercentage >= 75) return "Almost there! Just a few more to go! 🌱"
    if (progressPercentage >= 50) return "Halfway there! Keep up the good work! 🌿"
    if (progressPercentage >= 25) return "Great start! Keep going! 🌍"
    return "Start completing recommendations to see your progress! 🌱"
  }

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-eco-light-gray">Eco Actions Progress</span>
          <span className="font-medium">
            {completedCount}/{recommendations.length} ({Math.round(progressPercentage)}%)
          </span>
        </div>
        <div className="h-2 bg-eco-gray/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-eco-dark-green to-eco-bright-green"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <p className="text-sm text-center text-eco-light-gray mt-1">{getMotivationalMessage()}</p>
      </div>

      {/* Celebration animation */}
      {showCelebration && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="p-3 bg-eco-dark-green/20 border border-eco-bright-green rounded-lg text-center"
        >
          <h4 className="font-bold text-eco-bright-green">All Actions Completed! 🎉</h4>
          <p className="text-sm text-eco-light-gray">You've made a significant impact on your carbon footprint!</p>
        </motion.div>
      )}

      {/* Recommendations list */}
      <div className="space-y-3">
        <h3 className="font-medium">Recommended Actions</h3>
        <div className="space-y-2">
          {recommendations.slice(0, 3).map((recommendation) => (
            <div
              key={recommendation.id}
              className="p-3 bg-eco-gray/10 border border-eco-gray/30 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  className={`h-8 w-8 rounded-full ${
                    recommendation.completed
                      ? "bg-eco-dark-green text-eco-bright-green border-eco-bright-green"
                      : "bg-transparent text-eco-light-gray border-eco-gray/50"
                  }`}
                  onClick={() => onComplete(recommendation.id)}
                >
                  <Check className="h-4 w-4" />
                  <span className="sr-only">{recommendation.completed ? "Completed" : "Mark as completed"}</span>
                </Button>
                <div>
                  <h4 className={`font-medium ${recommendation.completed ? "text-eco-bright-green" : "text-white"}`}>
                    {recommendation.title}
                  </h4>
                  <p className={`text-xs ${getImpactColor(recommendation.impact)}`}>
                    {getImpactLabel(recommendation.impact)}
                  </p>
                </div>
              </div>
              {recommendation.completed && (
                <span className="text-xs text-eco-light-gray">
                  {recommendation.completedAt ? new Date(recommendation.completedAt).toLocaleDateString() : "Completed"}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* View all button */}
        {recommendations.length > 3 && (
          <Button
            variant="ghost"
            className="w-full text-eco-light-gray hover:text-eco-bright-green"
            onClick={onViewAll}
          >
            View All ({recommendations.length})
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
