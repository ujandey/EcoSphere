"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Share2, Twitter, Facebook, Linkedin, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface SocialShareProps {
  ecoScore: number
  badgeCount: number
  shareText?: string
  shareUrl?: string
}

export function SocialShare({
  ecoScore,
  badgeCount,
  shareText = "I'm reducing my carbon footprint with EcoScore!",
  shareUrl = "https://ecoscore.app",
}: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  // Generate share message
  const generateShareMessage = () => {
    return `${shareText} My EcoScore is ${ecoScore}/100 and I've earned ${badgeCount} sustainability badges! Join me in making a difference! ${shareUrl} #EcoScore #Sustainability`
  }

  // Handle social media sharing
  const handleShare = (platform: string) => {
    const message = generateShareMessage()
    let url = ""

    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`
        break
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl,
        )}&quote=${encodeURIComponent(message)}`
        break
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          shareUrl,
        )}&summary=${encodeURIComponent(message)}`
        break
      default:
        break
    }

    // For demo purposes, we'll just show a toast instead of opening a new window
    toast({
      title: `Shared to ${platform}!`,
      description: "Your EcoScore has been shared successfully.",
    })

    // In a real app, you would open the URL in a new window
    // window.open(url, "_blank")

    setIsOpen(false)
  }

  // Handle copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(generateShareMessage())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)

    toast({
      title: "Copied to clipboard!",
      description: "Your EcoScore message has been copied to clipboard.",
    })
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="bg-eco-gray/20 border-eco-gray/30 text-eco-light-gray hover:text-eco-bright-green hover:border-eco-bright-green"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Share2 className="mr-2 h-4 w-4" />
        Share Your Progress
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 bottom-full mb-2 z-50 w-64 p-4 rounded-lg border border-eco-gray/30 bg-eco-dark shadow-lg"
            >
              <h3 className="font-medium mb-3">Share your EcoScore</h3>
              <div className="space-y-2">
                <div className="p-3 bg-eco-gray/10 rounded-lg text-sm">
                  <p>{generateShareMessage()}</p>
                </div>
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-[#1DA1F2]/10 border-[#1DA1F2]/30 text-[#1DA1F2] hover:bg-[#1DA1F2]/20"
                    onClick={() => handleShare("twitter")}
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-[#4267B2]/10 border-[#4267B2]/30 text-[#4267B2] hover:bg-[#4267B2]/20"
                    onClick={() => handleShare("facebook")}
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-[#0077B5]/10 border-[#0077B5]/30 text-[#0077B5] hover:bg-[#0077B5]/20"
                    onClick={() => handleShare("linkedin")}
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-eco-gray/10 border-eco-gray/30 text-eco-light-gray hover:bg-eco-gray/20"
                    onClick={handleCopy}
                  >
                    {copied ? <Check className="h-4 w-4 text-eco-bright-green" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
