"use client"

import { motion } from "framer-motion"

interface QuizProgressProps {
  currentStep: number
  totalSteps: number
}

export function QuizProgress({ currentStep, totalSteps }: QuizProgressProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-eco-light-gray">
          Question {currentStep} of {totalSteps}
        </span>
        <span className="font-medium">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 bg-eco-gray/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-eco-dark-green to-eco-bright-green"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
