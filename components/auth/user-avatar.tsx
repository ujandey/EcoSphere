"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { User } from "@supabase/supabase-js"

interface UserAvatarProps {
  user: User
  className?: string
}

export function UserAvatar({ user, className }: UserAvatarProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [initials, setInitials] = useState("")
  const supabase = createClient()

  useEffect(() => {
    async function getProfile() {
      try {
        // First check if user has avatar from OAuth provider
        if (user.user_metadata?.avatar_url) {
          setAvatarUrl(user.user_metadata.avatar_url)
        }

        // Use maybeSingle() instead of single() to handle the case when no profile exists
        const { data, error } = await supabase
          .from("user_profiles")
          .select("avatar_url, full_name")
          .eq("id", user.id)
          .maybeSingle()

        if (error) throw error

        if (data) {
          // Only set avatar URL from database if not already set from OAuth
          if (!avatarUrl && data.avatar_url) {
            setAvatarUrl(data.avatar_url)
          }

          // Generate initials from full name, user metadata, or email
          let nameToUse = data.full_name

          if (!nameToUse && user.user_metadata?.full_name) {
            nameToUse = user.user_metadata.full_name
          } else if (!nameToUse && user.user_metadata?.name) {
            nameToUse = user.user_metadata.name
          }

          if (nameToUse) {
            const names = nameToUse.split(" ")
            const initials = names.map((name) => name.charAt(0).toUpperCase()).join("")
            setInitials(initials.substring(0, 2))
          } else {
            setInitials(user.email?.substring(0, 2).toUpperCase() || "")
          }
        } else {
          // No profile found, use email or name from user metadata
          const nameToUse = user.user_metadata?.full_name || user.user_metadata?.name

          if (nameToUse) {
            const names = nameToUse.split(" ")
            const initials = names.map((name) => name.charAt(0).toUpperCase()).join("")
            setInitials(initials.substring(0, 2))
          } else {
            setInitials(user.email?.substring(0, 2).toUpperCase() || "")
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error)

        // Fallback to email initials if there's an error
        setInitials(user.email?.substring(0, 2).toUpperCase() || "")
      }
    }

    getProfile()
  }, [user, supabase, avatarUrl])

  return (
    <Avatar className={className}>
      <AvatarImage src={avatarUrl || undefined} alt="User avatar" />
      <AvatarFallback className="bg-green-100 text-green-800">{initials}</AvatarFallback>
    </Avatar>
  )
}
