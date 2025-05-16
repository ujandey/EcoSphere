"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award, Zap, Droplet, Wind, Sun, Leaf } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export interface EcoBadge {
  id: string
  name: string
  description: string
  icon: keyof typeof badgeIcons
  earned: boolean
  earnedAt?: string
}

// Badge icons mapping
const badgeIcons = {
  energy: Zap,
  water: Droplet,
  transport: Wind,
  solar: Sun,
  food: Leaf,
  award: Award,
}

interface BadgeGalleryProps {
  badges: EcoBadge[]
  onBadgeClick?: (badge: EcoBadge) => void
  showProgress?: boolean
}

export function BadgeGallery({ badges, onBadgeClick, showProgress = true }: BadgeGalleryProps) {
  const [selectedBadge, setSelectedBadge] = useState<EcoBadge | null>(null)
  const [newlyEarned, setNewlyEarned] = useState<string | null>(null)

  // Calculate progress
  const earnedCount = badges.filter((badge) => badge.earned).length
  const progressPercentage = (earnedCount / badges.length) * 100

  // Check for newly earned badges
  useEffect(() => {
    const storedBadges = localStorage.getItem("earnedBadges")
    const previouslyEarned = storedBadges ? JSON.parse(storedBadges) : []

    const newBadge = badges.find((badge) => badge.earned && !previouslyEarned.includes(badge.id))

    if (newBadge) {
      setNewlyEarned(newBadge.id)
      const timer = setTimeout(() => setNewlyEarned(null), 3000)

      // Update localStorage
      localStorage.setItem("earnedBadges", JSON.stringify([...previouslyEarned, newBadge.id]))

      return () => clearTimeout(timer)
    }
  }, [badges])

  const handleBadgeClick = (badge: EcoBadge) => {
    setSelectedBadge(badge)
    if (onBadgeClick) {
      onBadgeClick(badge)
    }
  }

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      {showProgress && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-eco-light-gray">Badge Progress</span>
            <span className="font-medium">
              {earnedCount}/{badges.length} ({Math.round(progressPercentage)}%)
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
        </div>
      )}

      {/* Badge grid */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
        {badges.map((badge) => {
          const IconComponent = badgeIcons[badge.icon] || Award
          const isNew = newlyEarned === badge.id

          return (
            <motion.div
              key={badge.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleBadgeClick(badge)}
              className="relative cursor-pointer"
            >
              <div
                className={`relative flex flex-col items-center justify-center p-3 rounded-lg border ${
                  badge.earned
                    ? "bg-eco-dark-green/20 border-eco-bright-green"
                    : "bg-eco-gray/10 border-eco-gray/30 opacity-50"
                }`}
              >
                <div
                  className={`p-2 rounded-full ${
                    badge.earned ? "bg-eco-dark-green text-eco-bright-green" : "bg-eco-gray/20 text-eco-gray"
                  }`}
                >
                  <IconComponent className="h-6 w-6" />
                </div>
                <span className="mt-2 text-xs font-medium text-center line-clamp-1">{badge.name}</span>

                {/* New badge animation */}
                <AnimatePresence>
                  {isNew && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-2 -right-2"
                    >
                      <Badge className="bg-eco-bright-green text-eco-dark">New!</Badge>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Glow effect for newly earned badges */}
                <AnimatePresence>
                  {isNew && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.8, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                      className="absolute inset-0 rounded-lg bg-eco-bright-green"
                      style={{ zIndex: -1 }}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Badge detail modal */}
      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedBadge(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-eco-dark border border-eco-gray/30 rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`p-3 rounded-full ${
                    selectedBadge.earned ? "bg-eco-dark-green text-eco-bright-green" : "bg-eco-gray/20 text-eco-gray"
                  }`}
                >
                  {(() => {
                    const IconComponent = badgeIcons[selectedBadge.icon] || Award
                    return <IconComponent className="h-8 w-8" />
                  })()}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedBadge.name}</h3>
                  <p className="text-eco-light-gray text-sm">
                    {selectedBadge.earned ? "Earned" : "Not yet earned"}
                    {selectedBadge.earnedAt && ` on ${new Date(selectedBadge.earnedAt).toLocaleDateString()}`}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-eco-light-gray">{selectedBadge.description}</p>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedBadge(null)}
                  className="px-4 py-2 bg-eco-gray/30 hover:bg-eco-gray/50 rounded-md text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
