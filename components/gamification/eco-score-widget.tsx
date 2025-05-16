"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Leaf } from "lucide-react"

interface EcoScoreWidgetProps {
  score: number
  previousScore?: number
  size?: "sm" | "md" | "lg"
  showAnimation?: boolean
}

export function EcoScoreWidget({ score, previousScore, size = "md", showAnimation = true }: EcoScoreWidgetProps) {
  const [isImproved, setIsImproved] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  // Size classes for different widget sizes
  const sizeClasses = {
    sm: "w-24 h-24 text-xl",
    md: "w-32 h-32 text-3xl",
    lg: "w-40 h-40 text-4xl",
  }

  // Calculate the circumference of the circle
  const radius = size === "sm" ? 40 : size === "md" ? 56 : 72
  const circumference = 2 * Math.PI * radius

  // Calculate the stroke dash offset based on the score
  const strokeDashoffset = circumference - (score / 100) * circumference

  // Determine the score color based on the value
  const getScoreColor = (scoreValue: number) => {
    if (scoreValue >= 80) return "text-eco-bright-green"
    if (scoreValue >= 60) return "text-green-400"
    if (scoreValue >= 40) return "text-yellow-400"
    return "text-red-400"
  }

  // Get motivational message based on score
  const getMotivationalMessage = (scoreValue: number) => {
    if (scoreValue >= 90) return "Eco Champion! Amazing work! 🌟"
    if (scoreValue >= 80) return "Eco Star! Keep it up! ✨"
    if (scoreValue >= 70) return "Great progress! Almost there! 🌱"
    if (scoreValue >= 50) return "Good start! Room to improve! 🌿"
    return "Just beginning your eco journey! 🌍"
  }

  useEffect(() => {
    if (previousScore !== undefined && score > previousScore) {
      setIsImproved(true)
      if (showAnimation && (score >= 80 || score - previousScore >= 10)) {
        setShowCelebration(true)
        const timer = setTimeout(() => setShowCelebration(false), 3000)
        return () => clearTimeout(timer)
      }
    }
  }, [score, previousScore, showAnimation])

  return (
    <div className="relative flex flex-col items-center">
      {/* Celebration animation */}
      {showCelebration && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: "50%",
                  y: "50%",
                  scale: 0,
                  opacity: 1,
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: Math.random() * 0.8 + 0.2,
                  opacity: 0,
                }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  ease: "easeOut",
                }}
              >
                <Leaf
                  className="text-eco-bright-green"
                  size={Math.random() * 20 + 10}
                  style={{ transform: `rotate(${Math.random() * 360}deg)` }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Score circle */}
      <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
        <svg className="w-full h-full" viewBox="0 0 160 160">
          {/* Background circle */}
          <circle cx="80" cy="80" r={radius} fill="none" stroke="#2A2D2E" strokeWidth="8" className="opacity-20" />

          {/* Progress circle with gradient */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="url(#eco-score-gradient)"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 80 80)"
            className="transition-all duration-1000 ease-out"
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="eco-score-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#86C232" />
              <stop offset="100%" stopColor="#61892F" />
            </linearGradient>
          </defs>
        </svg>

        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            key={score}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`font-bold ${getScoreColor(score)}`}
          >
            {score}
          </motion.span>
          <span className="text-xs text-eco-light-gray">EcoScore</span>
        </div>
      </div>

      {/* Improvement indicator */}
      {isImproved && previousScore !== undefined && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-eco-bright-green flex items-center"
        >
          <span className="mr-1">+{(score - previousScore).toFixed(1)}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M12 7a1 1 0 01-1 1H9a1 1 0 01-1-1V6a1 1 0 011-1h2a1 1 0 011 1v1zm-1 4a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1v-1a1 1 0 00-1-1h-2z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M5 5a3 3 0 013-3h4a3 3 0 013 3v9a3 3 0 01-3 3H8a3 3 0 01-3-3V5zm3-1a1 1 0 00-1 1v9a1 1 0 001 1h4a1 1 0 001-1V5a1 1 0 00-1-1H8z"
              clipRule="evenodd"
            />
          </svg>
        </motion.div>
      )}

      {/* Motivational message */}
      <motion.p
        key={score}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-3 text-sm text-center text-eco-light-gray max-w-[200px]"
      >
        {getMotivationalMessage(score)}
      </motion.p>
    </div>
  )
}
