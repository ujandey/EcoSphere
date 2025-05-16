"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface Milestone {
  id: string
  title: string
  description: string
  threshold: number
  type: "score" | "badges" | "actions" | "streak"
  achieved: boolean
  achievedAt?: string
}

interface MilestoneCelebrationProps {
  milestones: Milestone[]
  currentValues: {
    score: number
    badges: number
    actions: number
    streak: number
  }
}

export function MilestoneCelebration({ milestones, currentValues }: MilestoneCelebrationProps) {
  const [achievedMilestone, setAchievedMilestone] = useState<Milestone | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)

  // Check for newly achieved milestones
  useEffect(() => {
    const storedMilestones = localStorage.getItem("achievedMilestones")
    const previouslyAchieved = storedMilestones ? JSON.parse(storedMilestones) : []

    // Find milestones that should be achieved based on current values
    const newlyAchievedMilestones = milestones.filter((milestone) => {
      if (previouslyAchieved.includes(milestone.id)) return false

      const currentValue = currentValues[milestone.type]
      return currentValue >= milestone.threshold
    })

    if (newlyAchievedMilestones.length > 0) {
      // Take the first newly achieved milestone
      const milestone = newlyAchievedMilestones[0]
      setAchievedMilestone(milestone)
      setShowCelebration(true)

      // Update localStorage
      localStorage.setItem("achievedMilestones", JSON.stringify([...previouslyAchieved, milestone.id]))
    }
  }, [milestones, currentValues])

  // Close celebration modal
  const handleClose = () => {
    setShowCelebration(false)
  }

  return (
    <AnimatePresence>
      {showCelebration && achievedMilestone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            className="relative bg-eco-dark border border-eco-bright-green rounded-xl p-6 max-w-md w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-eco-light-gray hover:text-white"
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Confetti animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  initial={{
                    x: "50%",
                    y: "0%",
                    backgroundColor: ["#86C232", "#61892F", "#86C232", "#61892F", "#FFFFFF"][
                      Math.floor(Math.random() * 5)
                    ],
                  }}
                  animate={{
                    y: "100%",
                    x: `${Math.random() * 100}%`,
                  }}
                  transition={{
                    duration: Math.random() * 2 + 1,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: Math.random() * 3,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <div className="mb-4 flex justify-center">
              <motion.div
                initial={{ rotate: 0, scale: 1 }}
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
                className="p-4 bg-eco-dark-green rounded-full text-eco-bright-green"
              >
                <Award className="h-12 w-12" />
              </motion.div>
            </div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-eco-bright-green mb-2"
            >
              Milestone Achieved!
            </motion.h2>

            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl font-medium mb-4"
            >
              {achievedMilestone.title}
            </motion.h3>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-eco-light-gray mb-6"
            >
              {achievedMilestone.description}
            </motion.p>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
              <Button className="bg-eco-bright-green hover:bg-eco-dark-green text-eco-dark" onClick={handleClose}>
                Continue My Eco Journey
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
